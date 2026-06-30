# Element

[**Custom Elements**](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements) are a native web platform feature that lets you define your own HTML tags and their behavior, using JavaScript.

Webuum builds on top of Custom Elements by offering a minimal, modern base class — `WebuumElement`.

This unlocks access to everything Webuum provides — including:

- Built-in support for custom [command](/docs/command) actions.
- Automatic [parts](/docs/parts) mapping
- Easy [props](/docs/props) from data attributes

Here’s how a typical component looks:

::: code-group
```js [HelloWorld.js]
import { WebuumElement } from 'webuum'

customElements.define('x-hello-world', class extends WebuumElement {
  static props = {
    $label: null,
  }

  connectedCallback() {
    console.log('Mounted')
  }

  disconnectedCallback() {
    console.log('Unmounted')
  }
  
  clickMe() {
      alert(this.$label)
  }
})
```
```html
<x-hello-world data-label="Hello world" id="helloWorldComponent">
    <button command="--click-me" commandfor="helloWorldComponent">Command Button</button>
</x-hello-world>
```
:::

The `connectedCallback()` runs when the element is added to the page — and `disconnectedCallback()` runs when it’s removed.

You can also use the other [lifecycle methods](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#custom_element_lifecycle_callbacks) provided by Custom Elements, like `attributeChangedCallback()` if needed.

## Cleanup with `$signal`

`WebuumElement` exposes a lifecycle-bound `$signal` — an [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) you can pass to any abortable API, such as `addEventListener` or `fetch`. When the element is disconnected, Webuum aborts the signal for you, so those listeners are removed automatically — no manual teardown needed.

This is especially handy for listeners on global targets like `window` or `document`, which would otherwise leak if they aren't removed on disconnect.

```js
import { WebuumElement } from 'webuum'

customElements.define('x-scroll-spy', class extends WebuumElement {
  connectedCallback() {
    // Automatically removed when the element disconnects
    window.addEventListener('scroll', () => {
      console.log('scrolling', window.scrollY)
    }, { signal: this.$signal })
  }
})
```

Under the hood, `$signal` is backed by a lazily-created `$controller` ([`AbortController`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)), which is aborted in `disconnectedCallback`. If the element is reconnected and you read `$signal` again, a fresh signal is created — so the same component keeps working after being moved in the DOM.

::: warning
If you override `disconnectedCallback`, call `super.disconnectedCallback()` to keep the automatic cleanup — otherwise the controller won't be aborted.

```js
disconnectedCallback() {
  super.disconnectedCallback()
  // your own cleanup
}
```
:::

When using [Customized Built-in Elements](#customized-built-in-elements) or the [Composition Definition](#composition-definition) approach, call `defineSignal()` to enable `$signal` and abort `this.$controller` yourself in `disconnectedCallback`.

## Customized Built-in Elements

The Web Components spec allows you not only to define new elements — but also to extend **built-in HTML elements** like `<dialog>`, `<button>`, or `<form>`.

This is called **Customized Built-in Elements**, and it’s useful when you want to add logic to an existing HTML tag, instead of creating something entirely new.

Unlike standard custom elements that extend `WebuumElement`, when extending built-in elements you must **manually initialize Webuum** inside the `constructor`.

::: code-group
```js
import { defineElement } from 'webuum'

customElements.define('x-dialog', class extends HTMLDialogElement {
  constructor() {
    super()
    defineElement(this)
  }
    
  connectedCallback() {
    this.addEventListener('close', () => {
      console.log('Dialog closed!')
    }, { signal: this.$signal })
  }

  disconnectedCallback() {
    // Built-in elements don't extend `WebuumElement`, so abort the
    // lifecycle controller yourself to clean up `$signal` listeners.
    this.$controller?.abort()
  }
}, { extends: 'dialog' })
```
```html
<dialog is="x-dialog" id="customDialog">
  Hello!
  <button command="close" commandfor="customDialog">Close dialog</button>
</dialog>
```
:::

This lets you keep native behaviors like the built-in modal behavior — while still customizing it.

> Note: Safari does not support this feature and doesn’t plan to. You can use a lightweight polyfill though, learn more on [Polyfills](/docs/polyfills) page.

### Why this matters
By enhancing native elements instead of replacing them:
- You retain accessibility and behavior by default.
- You can use browser features like `showModal()`, or native form controls.
- You avoid reimplementing things that the browser already does well.

## Composition Definition

If you don't want to extend `WebuumElement`, you can manually enable just the features you need — like commands, parts, or props — on any element.

This gives you **fine-grained control** and lets you **minimize runtime size** even further.

Use this approach when:

- You only need **one or two features** from Webuum.
- You want to **extend a built-in element** without using `WebuumElement`.
- You prefer full control over how and when things are initialized.

### Example

::: code-group
```ts
import {
  defineCommand,
  defineParts,
  defineObserver,
  defineProps,
  defineSignal
} from 'webuum'

customElements.define('x-hello-world', class extends HTMLDivElement {
  // Optional: declared fields for editor autocomplete
  declare $foo: HTMLElement | null
  declare $fuu: HTMLElement | null
  declare $buu: string

  declare $parts: object
  declare $shadowParts: object

  constructor() {
    super()

    // Enable command attribute support
    defineCommand(this)

    // Map parts from light DOM
    this.$parts = defineParts(this, {
      $foo: null,
    })

    // Map parts from shadow DOM
    this.$shadowParts = defineParts(this.shadowRoot, {
      $fuu: null,
    })

    // Declare props bound to data attributes
    defineProps(this, {
      $buu: null,
    })

    // Observe commands and parts dynamically (light + shadow DOM)
    defineObserver(this, this.$parts)
    defineObserver(this.shadowRoot, this.$shadowParts)

    // Optional: enable the lifecycle-bound `$signal`
    defineSignal(this)
  }

  disconnectedCallback() {
    this.$controller?.abort()
  }
}, { extends: 'div' })
```
```html
<div is="x-hello-world" data-buu="Hello there!">
  <span data-x-hello-world-part="foo">Light DOM part</span>
  <template shadowrootmode="open">
    <span part="fuu">Shadow DOM part</span>
  </template>
</div>
```
:::

This gives you the same feature set as `WebuumElement` — but only what you actually use.
You can even skip parts you don’t need: for example, use `defineProps()` only if that’s all you care about.