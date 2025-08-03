# About Webuum

**Webuum** is a lightweight JavaScript framework built for real websites — not complex web applications.

It embraces **native browser APIs**, keeps things **simple and small**, and avoids the bloat of modern SPA frameworks where it's unnecessary.


## Philosophy

Most JS frameworks today are built with applications in mind. But many websites don’t need reactive state management, hydration strategies, or massive client runtimes.

Webuum was designed from a different angle:

- ✅ **Native first** – Uses custom elements and web standards.
- ✅ **Small footprint** – Less than 0.5kB gzipped.
- ✅ **Enhances server-rendered HTML** — JavaScript adds interactivity without overhead.
- ✅ **No build step required** – But plays well with bundlers.
- ✅ **Minimal API surface** – You only need what the platform doesn’t already do well.
 
## Why not use React, Vue, or similar?

Frameworks like React or Vue are excellent — but they're primarily optimized for building **stateful applications**. When you just want a fast, maintainable, interactive **website**, these tools can become overkill.

Even modern meta-frameworks like Astro or Qwik try to address the issue — but the cost of hydration and runtime complexity still adds up.

Webuum is for cases where:

- HTML is already rendered on the server.
- You only need small enhancements or isolated interactivity.
- You care about **PageSpeed**, **performance**, and **control**.

## The Platform is Enough (Almost)

Modern web APIs are powerful. Webuum just fills in the small gaps.

Some things are still verbose or cumbersome in plain JS — like working with attributes, events, or DOM refs. Webuum introduces a minimal layer:

- `props` – typed attributes via `data-*`.
- `parts` – scoped DOM references for light & shadow DOM.
- `command` – declarative event bindings via native Command API.
- `dispatch` – simplified event handling and communication.
- `WebuumElement` – an extended base class for Custom Elements.

And that's (mostly) it.

## The Power of the Web Platform

Modern browsers already provide native components like `<dialog>`, `<details>`, popovers, and more. These often require no additional JavaScript to work, giving you powerful building blocks right out of the box.

Webuum builds on this foundation — adding just the minimal layer needed to enhance interactivity without reinventing the wheel.

## What if I need more?

Webuum doesn’t compete with bigger tools — it complements them.

When you outgrow the basics, you can gradually layer in:

- [**Signals API**](https://github.com/tc39/proposal-signals), a TC39 proposal, which can be polyfilled today.
- [**Lit**](https://lit.dev/) or other libraries — if your components get more complex.
- Your own small utilities, exactly where you need them.

## When to use Webuum

Use Webuum if your answer to most of these is “yes”:

- Do you server-render HTML?
- Do you want native components, but hate boilerplate?
- Do you prefer **progressive enhancement** over full hydration?
- Do you want to keep JS minimal and optional?
- Do you care about **performance** and **maintainability**?

If you’re building a full SPA, Webuum isn’t for you. But if you’re building fast websites, marketing pages, or hybrid stacks — it might be exactly what you need.


## Why I built Webuum

After years of building websites, I realized something:

Most frameworks are built for apps — not websites.

They assume you're rendering everything on the client, hydrating entire pages, or managing complex state. But in many real-world projects — especially marketing sites, landing pages, hybrid stacks — this just adds unnecessary complexity.

I wanted something different:

- Native Web Components, without boilerplate
- Simple attribute-based APIs for props and DOM targeting
- No build step required — but works great with bundlers too
- Tiny, fast, transparent — **closer to the platform**

Webuum came out of this need.

It’s not revolutionary. It’s not trying to replace React or Vue.  
It’s trying to do one thing well: make writing interactive **websites** better, simpler, and lighter.

If that resonates with you — welcome aboard.