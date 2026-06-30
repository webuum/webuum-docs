# Observers

Webuum ships a small set of observer helpers that connect native browser observers to your element's lifecycle. They live in a separate entry point, so you only pay for them when you actually use them:

```js
import { defineIntersectionObserver } from 'webuum/observers'
```

## `defineIntersectionObserver`

`defineIntersectionObserver(host, options?)` observes the `host` element with an [`IntersectionObserver`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver) and forwards each change to an `intersect(entry)` method on the host. Branch on `entry.isIntersecting` to react to the element entering or leaving the viewport.

It accepts the standard [`IntersectionObserverInit`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver#options) options (`root`, `rootMargin`, `threshold`) and returns the created `IntersectionObserver`, so you can `disconnect()` it yourself when you're done.

The observer is also wired to the element's lifecycle: when [`$signal`](/docs/element#cleanup-with-signal) aborts on disconnect, it disconnects automatically — no manual teardown needed.

```js
import { WebuumElement } from 'webuum'
import { defineIntersectionObserver } from 'webuum/observers'

customElements.define('x-reveal', class extends WebuumElement {
  connectedCallback() {
    defineIntersectionObserver(this, { threshold: 0.1 })
  }

  intersect(entry) {
    if (entry.isIntersecting) {
      this.classList.add('is-visible')
    }
  }
})
```

### Example: lazy load an element

A common use case is to defer the initialization of a heavier element until it scrolls into view. Keep a reference to the returned observer so you can `disconnect()` it once it has done its job, then run the original lifecycle:

```js
import { Form } from 'winduum-elements/components/form/index.js'
import { defineIntersectionObserver } from 'webuum/observers'

customElements.define('x-form', class Element extends Form {
  static props = {
    $lazy: false,
  }

  connectedCallback() {
    if (!this.$lazy) return super.connectedCallback()
    this.$observer = defineIntersectionObserver(this, { threshold: 0.1 })
  }

  intersect(entry) {
    if (entry.isIntersecting) {
      this.$observer.disconnect()
      super.connectedCallback()
    }
  }
}, { extends: 'form' })
```

With `data-lazy` set, `connectedCallback()` skips its normal setup and instead starts observing. As soon as the element intersects the viewport, the observer is disconnected and `super.connectedCallback()` runs the real initialization.

::: tip
When extending a [Customized Built-in Element](/docs/element#customized-built-in-elements) like the `<form>` above, make sure `$signal` is available (via `WebuumElement`, `defineElement()`, or `defineSignal()`) if you want the observer to disconnect automatically on element removal.
:::
