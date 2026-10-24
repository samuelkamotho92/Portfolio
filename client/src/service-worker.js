/* eslint-disable no-restricted-globals, no-underscore-dangle */
import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';

const documents = [
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/Samuel-Kamotho-CV.pdf',
  '/documents/samuel-kamotho-cv.pdf',
  '/documents/professional-reference.pdf',
  '/documents/academic-reference.pdf',
  '/documents/bachelors-degree.pdf',
  '/documents/transcripts.pdf',
  '/documents/leadership-volunteering.pdf',
];

clientsClaim();

precacheAndRoute([
  ...self.__WB_MANIFEST,
  ...documents.map((url) => ({ url, revision: 'samkamdev-1' })),
]);

const fileExtensionRegexp = /\/[^/?]+\.[^/]+$/;

registerRoute(
  ({ request, url }) => {
    if (request.mode !== 'navigate') return false;
    if (url.pathname.startsWith('/_')) return false;
    if (url.pathname.match(fileExtensionRegexp)) return false;
    return true;
  },
  createHandlerBoundToURL(`${process.env.PUBLIC_URL}/index.html`),
);

registerRoute(
  ({ url }) => url.hostname.endsWith('sanity.io'),
  new StaleWhileRevalidate({
    cacheName: 'sanity',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 80,
        maxAgeSeconds: 60 * 60 * 24 * 30,
      }),
    ],
  }),
);

registerRoute(
  ({ url }) => url.origin === 'https://fonts.googleapis.com'
    || url.origin === 'https://fonts.gstatic.com',
  new StaleWhileRevalidate({
    cacheName: 'fonts',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 20,
        maxAgeSeconds: 60 * 60 * 24 * 365,
      }),
    ],
  }),
);

registerRoute(
  ({ request, url }) => url.origin === self.location.origin
    && (request.destination === 'image' || url.pathname.endsWith('.pdf')),
  new CacheFirst({
    cacheName: 'local-files',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 40,
        maxAgeSeconds: 60 * 60 * 24 * 30,
      }),
    ],
  }),
);

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('install', () => {
  self.skipWaiting();
});
