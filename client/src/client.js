import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const token = process.env.REACT_APP_SANITY_TOKEN;

export const client = sanityClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID || 'egilm9gd',
  dataset: process.env.REACT_APP_SANITY_DATASET || 'production',
  apiVersion: '2022-02-01',
  useCdn: false,
  ...(token ? { token } : {}),
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
