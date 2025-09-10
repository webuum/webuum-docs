import { defineConfig } from 'vitepress'

const ogDescription = 'When the platform is 95% of what you need. Made for websites — not web apps.'
const ogImage = 'https://webuum.dev/og-image.png'
const ogTitle = 'Webumm'
const ogUrl = 'https://webuum.dev'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Webuum",
  description: ogDescription,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: ogTitle }],
    ['meta', { property: 'og:image', content: ogImage }],
    ['meta', { property: 'og:url', content: ogUrl }],
    ['meta', { property: 'og:description', content: ogDescription }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@winduum_dev' }],
    ['meta', { name: 'theme-color', content: '#f14a29' }],
    ['script', { defer: '', 'data-domain': 'webuum.dev', src: 'https://plausible.newlogic.cz/js/script.outbound-links.js'}]
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: 'local', // algolia
      // appId: '',
      // apiKey: '',
      // indexName: 'webuum'
    },

    nav: [
      { text: 'Docs', link: '/docs' },
      {
        text: 'Resources',
        items: [
          {
            items: [
              {
                text: 'Changelog',
                link: 'https://github.com/webuum/webuum/blob/main/CHANGELOG.md'
              }
            ]
          },
          {
            items: [
              {
                text: 'Winduum',
                link: 'https://winduum.dev'
              },
              {
                text: 'Vituum',
                link: 'https://vituum.dev'
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
              text: 'Installation',
              link: '/docs/'
            },
            {
              text: 'About',
              link: '/docs/about'
            },
            {
              text: 'Polyfills',
              link: '/docs/polyfills'
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
            },
            // {
            //   text: 'Dispatch',
            //   link: '/docs/dispatch'
            // }
          ]
        },
        // {
        //   text: 'Tutorials',
        //   items: [
        //     {
        //       text: 'Managing events',
        //       link: '/docs/managing-events'
        //     },
        //     {
        //       text: 'Managing state',
        //       link: '/docs/managing-state'
        //     },
        //     {
        //       text: 'Extending with Lit',
        //       link: '/docs/extending-with-lit'
        //     }
        //   ]
        // },
      ]
    },

    editLink: {
      pattern: 'https://github.com/webuum/webuum-docs/edit/main/docs/:path',
      text: 'Suggest changes to this page'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/webuum/webuum' },
      { icon: 'twitter', link: 'https://x.com/webuum_dev' }
    ],

    footer: {
      message: `Released under the MIT License.`,
      copyright: 'Copyright © 2025-present lubomirblazek.cz'
    },
  }
})
