import ContentOptionsObject from './mdx/ContentOptionsObject';
import FeaturedImageObject from './mdx/FeaturedImageObject';
import SeoSettingsObject from './mdx/SeoSettingsObject';
import SharingObject from './mdx/SharingObject';

const pages = {
  label: 'Pages',
  label_singular: 'Page',
  description:
    "Pages contain content separate from your blog posts and are not listed on the home page, category pages, or recent posts widget. Examples: About page, contact page, legal pages. If you're a technical person, they use MDX format and support JSX components.",
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
      label: 'Publish Date',
      name: 'date',
      widget: 'date',
      format: 'YYYY-MM-DD',
      hint:
        'This is the publish date for the page, for your own reference. Page dates are hidden by default. You can show the date using the option below.',
    },
    {
      label: 'Category',
      name: 'category',
      widget: 'hidden',
      default: 'none',
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
    FeaturedImageObject({
      showCardImageDefault: false,
      showTitleSectionDefault: false,
    }),
    ContentOptionsObject({
      showDateDefault: false,
      enableDiscussionDefault: false,
    }),
    SharingObject(),
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
