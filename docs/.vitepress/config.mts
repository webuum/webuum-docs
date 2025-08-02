import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Webuum",
  description: "Minimalistic Web Components Framework",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Docs', link: '/docs' },
      {
        text: 'Resources',
        items: [
          {
            items: [
              {
                text: 'Changelog',
                link: 'https://github.com/winduum/winduum/blob/main/CHANGELOG.md'
              }
            ]
          }
        ]
      }
    ],

    sidebar: {
      '/docs':[
        {
          text: 'Get started',
          items: [
            {
              text: 'Install',
              link: '/docs/'
            },
            {
              text: 'About',
              link: '/docs/about'
            },
            {
              text: 'Polyfills',
              link: '/docs/polyfills'
            },
            {
              text: 'Components',
              link: '/docs/components'
            }
          ]
        },
        {
          text: 'Essentials',
          items: [
            {
              text: 'Element',
              link: '/docs/element'
            },
            {
              text: 'Command',
              link: '/docs/command'
            },
            {
              text: 'Parts',
              link: '/docs/parts'
            },
            {
              text: 'Props',
              link: '/docs/props'
            }
          ]
        },
        {
          text: 'Tutorials',
          items: [
            {
              text: 'Managing events',
              link: '/docs/managing-events'
            },
            {
              text: 'Managing state',
              link: '/docs/managing-state'
            },
            {
              text: 'Extending with Lit',
              link: '/docs/extending-with-lit'
            }
          ]
        },
      ]
    },

    editLink: {
      pattern: 'https://github.com/webuum/webuum-docs/edit/main/docs/:path',
      text: 'Suggest changes to this page'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/webuum/webuum' }
    ],

    footer: {
      message: `Released under the MIT License.`,
      copyright: 'Copyright © 2022-present lubomirblazek.cz'
    },
  }
})
