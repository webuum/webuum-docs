---
title: Building Astro Websites with Almost No JavaScript - Introducing Webuum v0.x
author:
  - name: Lubomír Blažek
sidebar: false
date: 2026-06-09
head:
  - - meta
    - property: og:type
      content: website
  - - meta
    - property: og:title
      content: Building Astro Websites with Almost No JavaScript - Introducing Webuum v0.x
  - - meta
    - property: og:url
      content: https://webuum.dev/blog/webuum-0.x.html
  - - meta
    - property: og:description
      content: Webuum is a small, native-first JavaScript layer for adding interactivity to Astro and server-rendered websites without turning them into applications.
---

# Building Astro Websites with Almost No JavaScript - Introducing Webuum v0.x

![Introducing Webuum v0.x](/og-image.png)

For the past few years, we've been building websites with Astro and other server-rendered stacks.

Astro solved one of the biggest problems of modern frontend development: shipping too much JavaScript to the browser. Instead of hydrating entire pages, Astro lets us keep most of a website as HTML and only add JavaScript where it is actually needed.

That is the right foundation for a modern website.

But even mostly static websites still need interaction: dialogs, popovers, accordions, menus, forms, and small component behavior.

That is the layer Webuum focuses on.

## Most Websites Are Not Web Applications

A typical website doesn't need client-side routing, global state management, or a large runtime.

Most websites need:

- dialogs
- dropdowns
- accordions
- tabs
- forms
- navigation menus
- small interactive widgets

The challenge is not building these features.

The challenge is building them without turning a website into an application.

## The Search for a Smaller Runtime

Over the years we've tried many different approaches to progressive enhancement.

Some were useful for specific projects. Some made the code smaller, but introduced their own conventions. Some solved interactivity well, but still felt like a layer on top of the website instead of an extension of the HTML we already had.

The thing we kept looking for was not another way to organize JavaScript.

It was a way to rely more directly on the browser.

So we kept asking the same questions:

- Can we rely more on native browser APIs?
- Can we use Custom Elements directly?
- Can we use the browser's own semantics for common UI?
- Can we reduce abstraction instead of moving it around?
- Can we make components feel closer to HTML?

Most importantly:

> Can we make interactivity feel like a natural extension of the platform instead of another framework on top of it?

## The Platform Is Already Powerful

The modern web platform has changed a lot.

Today we have:

- Invoker Commands API
- Popover API
- Dialog API with `<dialog>` and `::backdrop`
- `<details>` and `<summary>`
- Custom Elements
- Declarative Shadow DOM
- HTML Templates
- CSS `::part`
- `inert`
- Form-associated custom elements
- ES Modules

And newer pieces like CSS Anchor Positioning and View Transitions are making more UI behavior possible directly in the browser, depending on the browser support you target.

That list matters because these are not just low-level APIs.

They cover real website behavior: modal dialogs, light-dismiss popovers, disclosure widgets, focus boundaries, declarative button actions, scoped styling, native forms, and reusable components.

Many of the problems that required large JavaScript abstractions ten years ago can now be solved directly in the browser.

We started wondering:

> What would a small framework look like if it embraced the platform instead of abstracting it away?

## Meet Webuum

Today we're releasing the first public alpha of Webuum v0.x.

Webuum is a lightweight JavaScript framework built for websites, not web applications. It embraces native browser APIs, focuses on progressive enhancement, and keeps the runtime intentionally small.

It is:

- Native
- Only 1 kB gzipped
- Fast on server-rendered websites
- Declarative
- Frameworkless
- Extensible
- Built around Custom Elements

That size is not just a marketing number.

Webuum has no virtual DOM, no hydration layer, no routing system, and no runtime magic. It gives you a small base for Custom Elements, typed `data-*` props, DOM parts, and declarative command behavior.

You can use it with a bundler, but you do not need one. You can use it with Astro, PHP, Laravel, Rails, or any stack that already renders HTML. And when a component grows beyond the basics, you can still plug in Signals, LitHtml, or your own custom logic exactly where it helps.

It is not:

- A React replacement
- A SPA framework
- A state management solution
- A meta-framework

Webuum exists to solve a much smaller problem:

> Add interactivity to server-rendered websites with as little JavaScript as possible.

That makes it a good fit for Astro, but it is not limited to Astro. The same idea applies anywhere HTML is already your main output: static sites, CMS-driven sites, Laravel, Rails, or any stack where JavaScript should enhance the page rather than own it.

## A Different Approach to Components

Webuum is built around Custom Elements.

Instead of introducing a virtual DOM or a custom rendering engine, components are simply web components.

```html
<dialog is="x-dialog" id="awesomeDialog">
  <button command="close" commandfor="awesomeDialog">
    Close
  </button>
</dialog>
```

This is still a real `<dialog>`.

The close behavior still comes from the browser.

Webuum is there only to enhance the native behavior: add the small hooks your component needs, keep the API pleasant, and preserve the dialog behavior the browser already provides.

The same idea applies to popovers.

```html
<button
  interestfor="hoverPopover"
  aria-describedby="hoverPopover"
>
  Show Tooltip
</button>

<x-popover
  id="hoverPopover"
  popover="hint"
  data-auto-update
  data-placement="top"
>
  Tooltip
</x-popover>
```

This is still a native popover. In browsers that understand the platform features, the markup can work before Webuum adds anything. Webuum then enhances the behavior: placement, auto updates, component lifecycle, and compatibility paths for browsers that still need help.

## Invoker Commands Instead of Event Boilerplate

This is one important distinction:

Commands are not a proprietary Webuum event system.

The foundation is the native Invoker Commands API.

Browsers are gaining a declarative way for buttons to invoke actions on other elements:

```html
<button commandfor="menu" command="toggle-popover">
  Menu
</button>

<nav id="menu" popover>
  ...
</nav>
```

The browser can own the basic behavior: opening a popover, closing a dialog, showing a modal, and keeping the interaction connected to real HTML.

Webuum builds on top of that idea.

For native commands like `toggle-popover`, `show-modal`, or `close`, Webuum stays out of the way. For custom commands, Webuum adds a small layer that maps declarative button actions to methods on your component:

```html
<x-newsletter id="newsletter">
  <button commandfor="newsletter" command="--submit">
    Subscribe
  </button>
</x-newsletter>
```

```js
class NewsletterForm extends WebuumElement {
  submit(event) {
    // Custom component behavior.
  }
}
```

The goal is simple:

- use the platform where the platform already has an answer
- add small conventions only where plain JavaScript is still repetitive
- keep interactivity visible in the HTML

## Parts Instead of Query Selectors

Working with DOM references often means repeatedly calling `querySelector()` or manually managing selectors.

That gets tedious inside components, especially when markup changes over time.

Webuum introduces Parts, a lightweight mechanism for mapping DOM elements to named references inside components.

It keeps the HTML explicit while making component code easier to maintain.

You still work with real DOM nodes.

You just do not have to repeatedly rediscover them.

```html
<x-hello-world>
  <span data-x-hello-world-part="label">
    Hello!
  </span>
</x-hello-world>
```

```js
class HelloWorld extends WebuumElement {
  static parts = {
    $label: null,
  }

  connectedCallback() {
    this.$label.textContent = 'Hello from a real DOM node'
  }
}
```

## Props Without Framework Syntax

Webuum also provides a simple prop system based on `data-*` attributes.

Values are automatically converted into JavaScript types, allowing components to receive booleans, numbers, arrays, or objects directly from the DOM.

```html
<x-counter
  data-count="42"
  data-enabled="true"
></x-counter>
```

```js
class CounterElement extends WebuumElement {
  static props = {
    $count: 0,
    $enabled: false,
  }

  connectedCallback() {
    console.log(this.$count, this.$enabled)
  }
}
```

No custom template language.

No compiler macros.

Just HTML attributes, parsed into useful JavaScript values.

## Why It Works Best With Astro

Because Astro already shares many of the same goals.

Astro encourages shipping less JavaScript.

Webuum encourages writing less JavaScript.

Together they create a workflow where most of the website remains static, while interactive parts stay small, isolated, and easy to understand.

Astro gives you the page architecture.

Webuum gives you a small native-first layer for the interactive pieces inside that architecture.

You can try that combination in the [Astro extended example on StackBlitz](https://stackblitz.com/github/webuum/webuum/tree/main/examples/astro-extended).

## Alpha Means Alpha

Webuum v0.x is an alpha release.

The API will evolve.

Some concepts may change.

Documentation will improve.

New features will arrive.

We're publishing it early because Webuum should not be designed in isolation.

We want feedback from people building real websites:

- Where does native HTML already feel great?
- Where is the browser still too verbose?
- Which component patterns should stay tiny?
- Which APIs should Webuum avoid owning?

That feedback is the point of this alpha.

## What's Next

Webuum is still a small hobby project.

But I think it has real potential, because it is built around a direction the platform itself is already taking.

I'm publishing it early because feedback from real websites is more useful than trying to design the perfect API alone.

We are also planning Winduum 3.0 at [winduum.dev](https://winduum.dev/), together with `webuum-elements`.

The goal is for Winduum's Tailwind CSS components to be built on top of Webuum and the native platform. Components like popover, dialog, details, drawer, and similar UI primitives should be simple to use, easy to style, and progressive by default.

Winduum should also make platform-native CSS easier to use in real components:

- [Scroll-driven animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations/Timelines) with [`animation-timeline`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline), [`view-timeline`](https://developer.mozilla.org/en-US/docs/Web/CSS/view-timeline), [`animation-range`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-range), and [`timeline-scope`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/timeline-scope)
- Future [CSS animation triggers](https://developer.mozilla.org/docs/Web/CSS/CSS_Animations), including `animation-trigger`
- [CSS Anchor Positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Anchor_positioning) for popovers and tooltips
- [Container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_container_queries) and [scroll-state queries](https://developer.mozilla.org/docs/Web/CSS/Guides/Conditional_rules/Container_scroll-state_queries) for component-aware layouts
- [`@starting-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style) and [`transition-behavior: allow-discrete`](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-behavior) for native state transitions
- [`content-visibility`](https://developer.mozilla.org/en-US/docs/Web/CSS/content-visibility) for rendering performance
- [View Transitions](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API) where they fit progressive enhancement

Most of them should even keep working without JavaScript, because the platform already gives us useful behavior before Webuum adds anything.

Our goal isn't to build another JavaScript framework.

Our goal is to help people build better websites with the platform they already have.

If you're building Astro projects, working with Web Components, or interested in progressive enhancement, we'd love to hear your feedback.
