export default {
  name: 'communityComment',
  title: 'Community Comment',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'message', title: 'Message', type: 'text' },
    {
      name: 'post',
      title: 'Post',
      type: 'reference',
      to: [{ type: 'communityPost' }],
    },
  ],
};
