# Command

## Introduction to Invokers Commands API

Webuum integrates the [Invoker Commands API](https://developer.mozilla.org/en-US/docs/Web/API/Invoker_Commands_API), a new browser standard for declaratively wiring UI actions directly in HTML via `<button>`, without relying on `addEventListener`.

This API is currently supported in Chrome, with support coming to other browsers soon. See the [polyfills](/docs/polyfills) page for more info.

## Mapping custom events to methods

Custom events triggered via the `command` attribute are mapped to methods on the element referenced by `commandfor`. These event names must be prefixed with `--` to indicate that they are custom-defined (unlike native commands like `close`, `show-modal`, etc.).

> 📘 See [MDN’s button element command reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button#command) for more on native commands

### Example

::: code-group
```html
<x-login-form id="myLoginForm">
  <button command="--submitForm" commandfor="myLoginForm">Login</button>
</x-login-form>
```
```js
class LoginForm extends WebuumElement {
    submitForm(event) {
        console.log('Logging in…')
        constole.log(event.source) // original event target - <button>
    }
}
```
:::

#### In this example:
- The button triggers a custom command `--submitForm`
- This is dispatched as a `submitForm` method call on the `x-login-form` element via `command` event
- The event passed into the method is the original click event from the button
- `event.source` is the `<button>` element from which the command was triggered

#### Notes
- Only methods with names matching the command without the `--` prefix are called.
- The event must be a click on a `<button>` element – other elements are ignored.
- Commands are resolved only if the method exists on the target element; otherwise nothing happens.
- All events are prevent defaulted by default

> Native command names like `close` or `show-modal` do not use the `--` prefix, and do not require a matching method – they trigger native behavior (e.g., closing a `<dialog>`).

## Extending native methods
You can extend native methods such as togglePopover() in your custom element by defining a method with the same name and calling super.methodName() to preserve the native behavior.

This is useful when you want to enhance or hook into built-in functionality while still keeping native behavior intact.

### Example

::: code-group
```html
<button command="toggle-popover" commandfor="hintPopover">Hint</button>

<x-popover id="hintPopover" popover>
  You forgot something!
</x-popover>
```
```js
customElements.define('x-hint-popover', class extends HTMLElement {
    togglePopover(event) {
        // Custom logic before showing
        console.log('Popover is about to be shown')
    
        // Native behavior
        super.togglePopover()
    
        // Custom logic after showing
        this.setAttribute('data-open', '')
    }
})
```
:::

#### Notes
The method name must match the native command (`showPopover`, `close`, `show`, etc.).
- You must call `super.method()` to retain the native behavior, otherwise only your custom logic will run.
- Native methods work only on elements that support them – e.g. `showPopover()` on elements with the popover attribute, `close()` on `<dialog>`, etc.
- If your element does not inherit from the native element (e.g. not `<dialog>` or not using `popover`), the native method call will have no effect.
- In these cases, no -- prefix is needed, since you’re extending a native command.

> Native commands do not require JavaScript at all – they work purely declaratively using HTML. So extend then only when needed.

## Passing values with value attribute

Commands can accept values directly from the triggering element using the `value=""` attribute. These values are passed to the handler method in your custom element.

### Example

::: code-group
```html
<x-counter id="counter"></x-counter>

<button command="increment" commandfor="counter" value="5">
  Add 5
</button>
```
```js
customElements.define('x-counter', class extends HTMLElement {
    $value = 0
    
    connectedCallback() {
        this.textContent = this.$value
    }
    
    increment({ source }) {
        this.$value += source.value
        this.textContent = this.$value
    }
})
```
:::

### Value types

The value passed via `value=""` is automatically typecast into the appropriate JavaScript type. Webuum uses smart parsing based on the value’s format:

| Input         | JavaScript value       |
|---------------|------------------------|
| `true`        | `true` (boolean)       |
| `false`       | `false` (boolean)      |
| `123`         | `123` (number)         |
| `Infinity`    | `Infinity` (number)    |
| `Hello world` | `Hello world` (string) |
| `[1, 2]`      | `[1, 2]` (array)       |
| `{ "a": 1 }`  | `{ a: 1 }` (object)    |

This makes passing structured data easy and predictable.

#### Notes
- The value is passed under `event.source.value`
- Arrays and Objects must be valid JSON
- You can still access the triggering element via `event.source`

> For working with additional values or element state, consider using the [Props](/docs/props) feature.

## When to use addEventListener instead of command
The command attribute only works on native `<button>` elements and only for the `command` (click) event.
If you want to handle other event types (such as `input`, `change`, `keydown`, etc.), you must use `addEventListener`.

This also applies when you want to listen to events on other elements like `<input>`, `<select>`, or custom internal parts of your component.

### Example

::: code-group
```js
customElements.define('x-custom-popover', class extends WebuumElement {
    $open = false
    
    static parts = {
        $input: null
    }

    connectedCallback() {
        this.addEventListener('toggle', (event) => {
            this.$open = event.newState === 'open'
        })
        
        window.addEventListener('resize', super.hidePopover)
    }
    
    disconnected() {
        window.removeEventListener('resize', super.hidePopover)
    }
    
    $inputConnectedCallback(element) {
        element.addEventListener('change', super.hidePopover)
    }
})
```
```html
<button command="toggle-popover" commandfor="hintPopover">Hint</button>

<x-popover id="hintPopover" popover>
  <input data-x-popover-part="input" value="Popover will hide on change">
</x-popover>
```
:::

#### Notes
- Use command for simple action buttons and `addEventListener` for everything else.
- Event listeners on or inside a host element don't need to be removed on disconnect, these on outside (eg. window) should be though
- Event listeners on child elements should be defined on [Part](/docs/parts) elements and their connected callbacks, so they work even on disconnecting inside the custom element (eg. ajax reload)
