// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import remarkMath from 'remark-math';
import rehypeMathJax from 'rehype-mathjax';

import { generateSession } from './generateSession';

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeMathJax],
  },

  integrations: [
    starlight({
      title: 'JS Course',
      customCss: ['./src/mathjax.css'],
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/withastro/starlight',
        },
      ],
      sidebar: [
        {
          label: 'JS Dasar',
          collapsed: true,
          autogenerate: { directory: 'js-dasar' },
        },
        {
          label: 'JS OOP',
          collapsed: true,
          items: generateSession(14).map((value) => `js-oop/sesi${value}`),
        },
        {
          label: 'JS Build-in Library',
          collapsed: true,
          items: [
            {
              label: 'Number',
              collapsed: true,
              items: generateSession(6).map((value) => `js-buildin-library/number/sesi${value}`),
            },
            {
              label: 'String',
              collapsed: true,
              items: generateSession(5).map((value) => `js-buildin-library/string/sesi${value}`),
            },
          ],
        },
        {
          label: 'JS Module',
          collapsed: true,
          autogenerate: { directory: 'js-module' },
        },
        {
          label: 'JS DOM',
          collapsed: true,
          items: generateSession(12).map((value) => `js-dom/sesi${value}`),
        },
        {
          label: 'JS Async',
          collapsed: true,
          items: generateSession(7).map((value) => `js-async/sesi${value}`),
        },
      ],
    }),
  ],
});
