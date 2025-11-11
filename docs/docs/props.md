# Props

Props in Webuum are a simple way to define basic reactive properties on your custom elements.
They let you pass data from the DOM into your component using `data-attributes`, with automatic type conversion.

## Defining Props

Props are declared in the `static props` map of your component. Each key is prefixed with a `$` for unambiguous reference in your component, you can also use a custom prefix if you like.
The key is the property name, and the value is its default value.

```js
static props = {
  $buu: 'test',   // default value
}
```

This automatically creates a property `this.$buu` inside your component.

::: code-group
```html
<x-hello-world data-buu="Hello there"></x-hello-world>
```
```js
this.$buu // → 'Hello there'
```
:::

## Using Props in DOM

Props are passed using `data-[prop]` attributes. For example, in a `<x-hello-world>` element:

```js
<x-hello-world data-buu="hello"></x-hello-world>
```

The value is automatically parsed and assigned to `this.$buu`.

## Props types

The value passed via `data-[prop]` is automatically typecast into the appropriate JavaScript type. Webuum uses smart parsing based on the value’s format:

| Input                    | JavaScript value       |
|--------------------------|------------------------|
| `data-buu="true"`        | `true` (boolean)       |
| `data-buu="false"`       | `false` (boolean)      |
| `data-buu="123"`         | `123` (number)         |
| `data-buu="Infinity"`    | `Infinity` (number)    |
| `data-buu="Hello world"` | `Hello world` (string) |
| `data-buu="[1, 2]"`      | `[1, 2]` (array)       |
| `data-buu='{ "a": 1 }'`  | `{ a: 1 }` (object)    |

This makes passing structured data easy and predictable.

#### Notes
- Arrays and Objects must be valid JSON

### Example

::: code-group
```js
import { WebuumElement, initializeController } from 'webuum'

customElements.define('x-hello-world', class extends WebuumElement {
    static props = {
      $buu: 'default',
    }

    connectedCallback() {
      console.log(this.$buu)
    }
  }
)
```
```html
<x-hello-world data-buu="42"></x-hello-world>
```
:::

→ Console output: **42**


## Listening to changes

If you want to **listen to changes of a specific prop**, you can rely on [attributeChangedCallback](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#custom_element_lifecycle_callbacks) method, because every prop is backed by a `data-*` attribute.

To make it work, you need to define a static observedAttributes array that lists the attributes you want to observe.
For Webuum props, that means the corresponding `data-` attribute.

### Example

```js
import { WebuumElement } from 'webuum'

customElements.define('x-hello-world', class extends WebuumElement {
    static props = {
      $buu: 'default',
    }

    static observedAttributes = ["data-buu"];

    connectedCallback() {
        this.$buu = 'changed value';
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'data-buu') {
        console.log(`$buu changed from ${oldValue} → ${newValue}`)
      }
    }
  }
)
```