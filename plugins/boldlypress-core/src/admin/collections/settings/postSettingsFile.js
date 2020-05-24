const postSettingsFile = {
  label: 'Post Settings',
  name: 'postSettings',
  file: 'settings/post/post-settings.yml',
  fields: [
    {
      label: 'Blog Enabled',
      name: 'blogEnabled',
      widget: 'boolean',
      hint: 'Switch off to hide all blog posts and category post list pages.',
    },
    {
      label: 'Post Category List Post Count',
      name: 'postCategoryListPostCount',
      widget: 'number',
      hint: 'The number of posts to show on the All Posts page and category pages that lists posts.',
    },
    {
      label: 'All Posts List URL Slug',
      name: 'allPostsListSlug',
      widget: 'string',
      hint: 'The slug used to access the All Posts page. Example: /posts',
    },
    {
      label: 'Post Category List URL Slug',
      name: 'postCategoryListSlug',
      widget: 'string',
      hint:
        'The slug prefix used to access post lists for categories. For example, if you set this to "/posts/category" and your category is "adventure", then the full path to access the category post list would become "/posts/category/adventure"',
    },
  ],
};

export default postSettingsFile;
