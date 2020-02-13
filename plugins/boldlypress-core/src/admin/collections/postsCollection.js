import FeaturedImageObject from './mdx/FeaturedImageObject';
import ContentOptionsObject from './mdx/ContentOptionsObject';
import SharingObject from './mdx/SharingObject';
import SeoSettingsObject from './mdx/SeoSettingsObject';

const blogPosts = {
  label: 'Blog Posts',
  label_singular: 'Blog Post',
  description:
    "Blog posts are the content that makes up your site. If you're a technical person, they use MDX format and support JSX components.",
  name: 'posts',
  folder: 'src/posts-mdx',
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
        'Use an attention-grabbing title and keep this to 50-60 characters or shorter for best results (examples here: https://tinyurl.com/post-title-ideas). Template tag for this setting: {contentTitle}',
    },
    {
      label: 'Slug',
      name: 'rawSlug',
      widget: 'string',
      hint:
        'Used in the URL of the post. For instance, if the slug is "hello-world", the post would be viewable at https://mysite.com/hello-world. Must be unique. Only use lowercase letters, dashes, and underscores.',
    },
    {
      label: 'Publish Date',
      name: 'date',
      widget: 'date',
      format: 'YYYY-MM-DD',
      hint:
        'This is the date shown for the post, and is used to sort posts chronologically. You can hide the date using the option below. Setting a date in the future will cause that post to be hidden until then.',
    },
    {
      label: 'Category',
      name: 'category',
      widget: 'string',
      hint:
        "If you don't want the post to be categorized, set this to none. Otherwise, set this to anything. Other posts with the same category will be grouped together. Template tag for this setting: {contentCategory}",
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
        'Specify a custom excerpt here, or set to none to automatically use the first few sentences of the post. Template tag for this setting: {contentExcerpt}',
      default: 'none',
    },
    FeaturedImageObject(),
    ContentOptionsObject({
      layoutDefault: 'post',
      showSidebarDefault: true,
      showDateDefault: true,
      enableDiscussionDefault: true,
    }),
    SharingObject(),
    SeoSettingsObject({
      seoConfigurationIdDefault: 'default-post-seo-configuration',
    }),
    {
      label: 'Group',
      name: 'group',
      widget: 'hidden',
      default: 'posts',
    },
  ],
};

export default blogPosts;
