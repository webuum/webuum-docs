# Getting Started

You can use Webuum with or without a bundler — it's designed to be as native and lightweight as possible.

## Installation

### Via npm

```bash
npm install webuum
```

Then import it in your JavaScript:

```js
import { WebuumElement } from 'webuum'
```

### Via CDN

```js
import { WebuumElement } from 'https://cdn.jsdelivr.net/npm/webuum/+esm'
```

## Hello World Example

A minimal custom element using Webuum.

::: code-group
```js
import { WebuumElement } from 'webuum'

customElements.define('x-hello-world', class extends WebuumElement {
  static parts = {
    $foo: 'custom-name', // maps to data-x-hello-world-part="custom-name"
  }

  static props = {
    $buu: null, // maps to data-buu="Hello world"
  }

  connectedCallback() {
    this.$foo.textContent = this.$buu
  }
})
```
```ts
import { WebuumElement } from 'webuum'

customElements.define('x-hello-world', class extends WebuumElement {
  declare $foo: HTMLElement | nul
  declare $buu: string | null
    
  static parts = {
    $foo: 'custom-name', // maps to data-x-hello-world-part="custom-name"
  }

  static props = {
    $buu: null, // maps to data-buu="Hello world"
  }

  connectedCallback() {
    this.$foo.textContent = this.$buu
  }
})
```
```html
<x-hello-world data-buu="Hello world">
    <span data-x-hello-world-part="custom-name"></span>
</x-hello-world>
```
:::

You’ve just created your first Webuum component — built on native APIs, ready for production, and weighing less than a kilobyte.