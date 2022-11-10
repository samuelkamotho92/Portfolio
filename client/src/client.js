import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
  projectId: 'egilm9gd',
  dataset: 'production',
  apiVersion: '2022-02-01',
  useCdn: true,
  token: 'skTvMMEpkQLu8J1g1z0PI3UoDTpVOasiH2RBBtbgGgqXWnQO4ynHZLVd3bSJAosKZkkNfQQCxqdC0kAGdRpUeqiy1FntdBhDDKXBS1FKc2WbDt1v2sJgOwLQOWppxIvFoRZ8FDFAm2wE6i3hI3dxddK2OIQzMh6t9xHCkz3mSSXPaZjF7pK7',
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
