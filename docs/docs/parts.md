# Parts

Working with DOM nodes inside a custom element can get messy — especially when you need to repeatedly query selectors with `querySelector` or `getElementById`. Webuum introduces a Parts system that makes this much simpler and more maintainable.

Parts are essentially named references to DOM elements inside your component. They work similarly to `ref` in Vue, but are based entirely on web standards.

## Defining Parts

Parts are declared in the `static parts` map of your component. Each key is prefixed with a `$` for unambiguous reference in your component, you can also use a custom prefix if you like.
By default, the key (e.g., `$foo`) is used as the part name in the DOM. But you can also map it to a custom name.

```js
static parts = {
  $foo: null,      // expects part="foo" (shadow DOM) or data-x-hello-world-part="foo" (light DOM)
  $bar: 'hello',   // maps $bar to part="hello" / data-x-hello-world-part="hello"
}
```

This makes it possible to keep JavaScript variable names short and consistent while still using semantic names in your HTML.

::: code-group
```html [Light DOM]
<div data-x-hello-world-part="foo"></div>
<div data-x-hello-world-part="hello"></div>
```
```html [Shadow DOM]
<div part="foo"></div>
<div part="hello"></div>
```
:::
```js
this.$foo // → HTMLElement
this.$bar // → HTMLElement
```

### Multiple matches
If there are multiple elements with the same part name, Webuum will return an array of elements instead of a single reference.

::: code-group
```html [Light DOM]
<div data-x-hello-world-part="foo"></div>
<div data-x-hello-world-part="foo"></div>
```
```html [Shadow DOM]
<div part="foo"></div>
<div part="foo"></div>
```
:::
```js
this.$foo // → [HTMLElement, HTMLElement]
```

### Multiple names
A single element can expose multiple part names:

::: code-group
```html [Light DOM]
<div data-x-hello-world-part="foo bar baz"></div>
```
```html [Shadow DOM]
<div part="foo bar baz"></div>
```
:::

In this case, the element will be available under each matching key in your component.

## Light DOM

In the light DOM (outside shadow roots), parts are defined using a `data-[element-name]-part` attribute.
The prefix ensures that parts are scoped to the right custom element and avoids collisions with other components.

For example, for a custom element `<x-hello-world>`, you can declare a part like this:

```html
<x-hello-world>
  <div data-x-hello-world-part="foo">Hello!</div>
</x-hello-world>
```

In your component, you declare the part in the static parts map:

::: code-group
```js
import { WebuumElement } from 'webuum'

customElements.define('x-hello-world', class extends WebuumElement {
    static parts = {
      $foo: null,
    }

    connectedCallback() {
      console.log(this.$foo) // <div data-x-hello-world-part="foo">
    }
  }
)
```
```ts
import { WebuumElement } from 'webuum'

customElements.define('x-hello-world', class extends WebuumElement {
    declare $foo: HTMLElement | null
    
    static parts = {
      $foo: null,
    }

    connectedCallback() {
      console.log(this.$foo) // <div data-x-hello-world-part="foo">
    }
  }
)
```
:::

This way, `$foo` is automatically bound to the `<div>` without writing any query selectors manually.

## Shadow DOM
In the shadow DOM, parts are declared using the standard `part` attribute — without the element-name prefix, since the shadow root is already scoped to your component.

```html
<template shadowrootmode="open">
  <div part="foo">Hello from shadow DOM!</div>
</template>
```

The `static parts` map covers the light DOM of the host element. To bind parts inside a shadow root, call `defineParts` (and `defineObserver` if you want the part callbacks) on the shadow root:

```js
import { WebuumElement, defineParts, defineObserver } from 'webuum'

customElements.define('x-hello-world', class extends WebuumElement {
    constructor() {
      super()

      const shadowParts = defineParts(this.shadowRoot, {
        $foo: null,
      })

      defineObserver(this.shadowRoot, shadowParts)
    }
  }
)
```

## Part Callbacks
Sometimes you need to run logic when a part becomes available (inserted into the DOM) or when it gets removed.
Webuum provides `partConnectedCallback` and `partDisconnectedCallback` for that.

Both callbacks receive the part name as the first argument — the key from the `static parts` map, including the `$` prefix — and the element reference as the second argument.

::: code-group
```js
import { WebuumElement } from 'webuum'

customElements.define('x-hello-world', class extends WebuumElement {
    static parts = {
      $foo: null,
    }

    partConnectedCallback(name, element) {
      if (name === '$foo') {
        console.log('foo connected', element)
      }
    }

    partDisconnectedCallback(name, element) {
      if (name === '$foo') {
        console.log('foo disconnected', element)
      }
    }
  }
)
```
```ts
import { WebuumElement } from 'webuum'

customElements.define('x-hello-world', class extends WebuumElement {
    declare $foo: HTMLElement | null
    
    static parts = {
      $foo: null,
    }

    partConnectedCallback(name: string, element: HTMLElement) {
      if (name === '$foo') {
        console.log('foo connected', element)
      }
    }

    partDisconnectedCallback(name: string, element: HTMLElement) {
      if (name === '$foo') {
        console.log('foo disconnected', element)
      }
    }
  }
)
```
:::

When `<div data-x-hello-world-part="foo">` is added, `partConnectedCallback` fires — and when it is removed, `partDisconnectedCallback` fires. `partConnectedCallback` also fires for parts that are already present in the DOM when the component initializes.
