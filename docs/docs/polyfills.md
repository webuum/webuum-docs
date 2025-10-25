# Polyfills

Webuum builds on modern web APIs — some of which are still experimental or not universally supported.  

To keep the runtime small, **polyfills are opt-in and can be lazy-loaded** based on feature detection.

## Command API

Webuum supports the [Invoker Commands API](https://developer.mozilla.org/en-US/docs/Web/API/Invoker_Commands_API) which introduces a native way to declaratively bind element actions (including custom actions) using a command attribute — without custom event listeners or JavaScript wiring.

```js
<button commandfor="mydialog" command="show-modal">Show modal dialog</button>
<dialog id="mydialog">
  <button commandfor="mydialog" command="close">Close</button>
  Dialog Content
</dialog>
```

This is already supported in **Chrome**, **Firefox** and **Safari Technology Preview** — full support is near.

To support all browsers today, you can use [`invokers-polyfill`](https://www.npmjs.com/package/invokers-polyfill).

```shell
npm install invokers-polyfill
```

Then lazy-load it when needed using Webuum’s built-in feature detection:

```js
import { supportsCommand } from 'webuum/supports'

if (!supportsCommand) {
    const { apply } = await import('invokers-polyfill/fn')
    apply()
}
```

For a deeper explanation of how the Commands API works and how to use it in Webuum, see the [Command](/docs/command) page.

## Customized Built-in Elements

Customized built-ins allow you to extend native HTML elements like `<dialog>`, `<form>` or `<button>` using JavaScript — for example, to add behavior without wrapping them in extra markup.

```js
customElements.define('x-dialog', class extends HTMLDialogElement {
    connectedCallback() {
        this.addEventListener('close', () => console.log('Closed'))
    }
}, { extends: 'dialog' })
```

This lets you enhance native features without breaking semantics or accessibility. It’s ideal when you want to extend something like `<dialog>` instead of recreating it from scratch.

Unfortunately, **Safari** does not support this feature and has explicitly [declined to implement&nbsp;it](https://github.com/WebKit/standards-positions/issues/97#issuecomment-1674083477).

To ensure compatibility, you can use [@webreflection/custom-elements-builtin](https://www.npmjs.com/package/@webreflection/custom-elements-builtin).

```shell
npm install invokers-polyfill
```

Then lazy-load it when needed using Webuum’s built-in feature detection:

```js
import { supportsIs } from 'webuum/supports'

if (!supportsIs()) {
    await import('@webreflection/custom-elements-builtin')
}
```

This loads a lightweight polyfill only when needed — so you can safely use customized built-ins and still ship minimal JavaScript.

For a deeper dive into how customized built-ins work and when to use them, check out the [Element](/docs/element) page.