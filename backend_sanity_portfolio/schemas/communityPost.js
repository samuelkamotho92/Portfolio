export default {
  name: 'communityPost',
  title: 'Community Post',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    {
      name: 'lane',
      title: 'Lane',
      type: 'string',
      options: {
        list: [
          { title: 'Technical', value: 'technical' },
          { title: 'Life', value: 'life' },
        ],
      },
    },
    { name: 'excerpt', title: 'Excerpt', type: 'text' },
    { name: 'body', title: 'Body', type: 'text' },
    { name: 'appreciations', title: 'Appreciations', type: 'number' },
  ],
};
