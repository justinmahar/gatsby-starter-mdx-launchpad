import ContentOptionsObject from './mdx/ContentOptionsObject';
import SeoSettingsObject from './mdx/SeoSettingsObject';

const pages = {
  label: 'Pages',
  label_singular: 'Page',
  description: 'Pages contain content.',
  name: 'pages',
  folder: 'src/pages-mdx',
  delete: true,
  extension: 'mdx',
  format: 'frontmatter',
  create: true,
  fields: [
    {
      label: 'Title',
      name: 'title',
      widget: 'string',
      hint:
        'The title of the page. Keep this to 50-60 characters or shorter for best results. Supports template tags. Reference using: {contentTitle}',
    },
    {
      label: 'Slug',
      name: 'rawSlug',
      widget: 'string',
      hint:
        'Used in the URL of the page. For instance, if the slug is "about-me", the page would be viewable at https://mysite.com/about-me. Must be unique. Only use lowercase letters, dashes, and underscores.',
    },
    {
      label: 'Body',
      name: 'body',
      widget: 'markdown',
    },
    {
      label: 'Custom Excerpt',
      name: 'customExcerpt',
      widget: 'string',
      hint:
        'Specify a custom excerpt here, or set to none to automatically use the first few sentences of the page. Supports template tags. Reference using: {contentExcerpt}',
      default: 'none',
    },
    ContentOptionsObject({
      showDateDefault: false,
      enableDiscussionDefault: false,
    }),
    SeoSettingsObject({
      seoConfigurationIdDefault: 'default-page-seo-configuration',
    }),
    {
      label: 'Group',
      name: 'group',
      widget: 'hidden',
      default: 'pages',
    },
  ],
};

export default pages;
