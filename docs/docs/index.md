# Getting Started

You can use Webuum with or without a bundler — it's designed to be as native and lightweight as possible.

## Installation

### Via package manager

::: code-group
```bash
npm install webuum
```
```bash
yarn add webuum
```
```bash
pnpm add webuum
```
```bash
deno install npm:webuum
```
```bash
bun install webuum
```
:::

Then import it in your JavaScript:

```js
import { WebuumElement } from 'webuum'
```

### Via CDN

```js
import { WebuumElement } from 'https://cdn.jsdelivr.net/npm/webuum/dist/index.js'
```

### Via CDN with importmap
::: code-group
```js
import { WebuumElement } from 'webuum'
```
```html
<script type="importmap">
  {
    "imports": {
      "webuum": "https://cdn.jsdelivr.net/npm/webuum/dist/index.js"
    }
  }
</script>
```
:::

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

## Trying Webuum Online

On [StackBlitz](https://stackblitz.com/) or [GitHub](https://github.com/webuum/webuum/tree/main/examples) with basic examples how to use it with [Vite](https://vitejs.dev/) or other frameworks.

<style>
    #trying-winduum-online a {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    #trying-winduum-online a svg {
        width: 0.875rem;
        height: 0.875rem;
    }

    .dark #trying-winduum-online a svg {
        fill: #fff;
    }

    @media all and (max-width: 720px) {
        #trying-winduum-online {
            display: block !important;
            gap: 3rem !important;
        }
    }
</style>

<div id="trying-winduum-online" style="display: flex; gap: 6rem; font-size: 1.125rem;">
<div>

* <a href="https://stackblitz.com/github/webuum/webuum/tree/main/examples/vanilla" target="_blank" rel="noreferrer">vanilla <svg><use href="#icon-sb" /></svg></a>
* <a href="https://stackblitz.com/github/webuum/webuum/tree/main/examples/vite" target="_blank" rel="noreferrer">vite <svg><use href="#icon-sb" /></svg></a>
* <a href="https://stackblitz.com/github/webuum/webuum/tree/main/examples/astro" target="_blank" rel="noreferrer">astro<svg><use href="#icon-sb" /></svg></a>

</div>
</div>