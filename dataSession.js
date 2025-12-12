import { generateSession } from './generateSession';

/** @type {any[]} */
export const dataSession = [
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
  {
    label: 'JS Network',
    collapsed: true,
    items: generateSession(10).map((value) => `js-network/sesi${value}`),
  },
];
