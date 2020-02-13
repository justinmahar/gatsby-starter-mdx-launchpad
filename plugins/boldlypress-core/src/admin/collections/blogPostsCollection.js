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
    {
      label: 'Featured Image',
      name: 'featuredImage',
      widget: 'object',
      fields: [
        {
          label: 'Use Featured Image',
          name: 'featuredImageEnabled',
          widget: 'boolean',
          hint:
            'When disabled, the featured image will not be shown for the post. Using a featured image is HIGHLY recommended.',
          default: false,
        },
        {
          label: 'Featured Image',
          name: 'featuredImageUrl',
          widget: 'image',
          hint:
            'Recommended size is 1200x630 (1.91:1), and under 5MB. You can use Canva to edit, and can grab a free image here: https://www.pexels.com/',
          default: '/media/no-image.png',
        },
        {
          label: 'Featured Image Alt',
          name: 'featuredImageAlt',
          widget: 'string',
          hint:
            "A description of what's happening in the custom image. This is used for accessibility, so visually impaired readers can know what's up. Supports template tags. Set to none to disable.",
          default: 'none',
        },
      ],
    },
    {
      label: 'Post Options',
      name: 'options',
      widget: 'object',
      fields: [
        {
          label: 'Show Sidebar',
          name: 'showSidebar',
          widget: 'boolean',
          hint: "You can show the sidebar for specific posts if you'd like.",
          default: true,
        },
        {
          label: 'Hide Post',
          name: 'hidden',
          widget: 'boolean',
          hint: "If you hide a post, it won't be visible to users on the site.",
          default: false,
        },
        {
          label: 'Layout',
          name: 'layout',
          widget: 'select',
          hint: 'Select the layout type.',
          default: 'post',
          options: [
            {
              label: 'Standard Page',
              value: 'page',
            },
            {
              label: 'Standard Post',
              value: 'post',
            },
            {
              label: 'Index (Homepage)',
              value: 'index',
            },
            {
              label: 'Category Post Listing Page',
              value: 'category-post-listing',
            },
          ],
        },
        {
          label: 'Show Date',
          name: 'dateEnabled',
          widget: 'boolean',
          hint: 'When disabled, the date will not be shown for the post.',
          default: true,
        },
        {
          label: 'Enable Discussion',
          name: 'discussionEnabled',
          widget: 'boolean',
          hint: 'When disabled, the comments section will not be shown.',
          default: true,
        },
      ],
    },
    {
      label: 'Sharing',
      name: 'sharing',
      widget: 'object',
      fields: [
        {
          label: 'Enable Sharing',
          name: 'sharingEnabled',
          widget: 'boolean',
          hint: 'When disabled, the social media sharing buttons will not be shown.',
          default: true,
        },
        {
          label: 'Facebook Quote',
          name: 'facebookQuote',
          widget: 'string',
          hint: 'Quote to use when sharing via the Facebook button. Supports template tags.',
          default: '{contentOgTitle}',
        },
        {
          label: 'Facebook Hashtag',
          name: 'facebookHashtag',
          widget: 'string',
          hint:
            "You can use a Facebook hashtag if you'd like. Be sure to include the # character. Set to none for no hashtag.",
          default: 'none',
        },
        {
          label: 'Twitter Title',
          name: 'twitterTitle',
          widget: 'string',
          hint: 'Title shown when sharing via the Twitter button. Supports template tags.',
          default: '{contentTwitterCardTitle}',
        },
        {
          label: 'Twitter Via',
          name: 'twitterVia',
          widget: 'string',
          hint: 'The attribution for the shared content on Twitter. Supports template tags.',
          default: '{contentTwitterSiteUsername}',
        },
        {
          label: 'Twitter Hashtags',
          name: 'twitterHashtags',
          widget: 'string',
          hint: 'Hashtags for the content. Set to none for no hashtags.',
          default: 'none',
        },
      ],
    },
    {
      label: 'SEO Settings',
      name: 'seoSettings',
      widget: 'object',
      fields: [
        {
          label: 'SEO Configuration',
          name: 'seoConfiguration',
          widget: 'relation',
          collection: 'settings',
          searchFields: ['siteSeoSettings.seoConfigurations.seoConfigurationName'],
          valueField: 'siteSeoSettings.seoConfigurations.seoConfigurationId',
          displayFields: ['siteSeoSettings.seoConfigurations.seoConfigurationName'],
          hint: 'Select the SEO configuration to use (defined in Site SEO Settings).',
          default: 'default',
        },
        {
          label: 'SEO Title',
          name: 'seoTitle',
          widget: 'string',
          hint:
            'The title shown in the browser tab and in Google search results. Use an attention-grabbing title and keep this to 50-60 characters or shorter for best results. Supports template tags. Template tag for this setting: {contentSeoTitle}',
          default: '{siteWidePostSeoTitle}',
        },
        {
          label: 'SEO Description',
          name: 'seoDescription',
          widget: 'string',
          hint:
            'A description of the content. Can also be an excerpt, if you want. At least two sentences long is recommended, and it should entice users to click. Use {computedPostSeoDescription} for the site-wide title computed from Site-Wide Post SEO Settings. Supports template tags. Template tag for this setting: {contentSeoDescription}',
          default: '{siteWidePostSeoDescription}',
        },
        {
          label: 'SEO Image',
          name: 'seoImage',
          widget: 'object',
          hint:
            '↑ Select the image used when sharing. Unless customized below, this will be used as the Open Graph and Twitter Card image when sharing the page.',
          fields: [
            {
              label: 'SEO Image Used',
              name: 'seoImageSelection',
              widget: 'select',
              hint:
                'Specify which image should be used for SEO. ⮞ Site Image: The site image defined in Site Settings will be used for SEO. ⮞ Featured Image (If Enabled): The featured image will be used for SEO. If "Featured Image » Use Featured Image" is disabled, it will fall back to the Site Image specifed in Site Settings. ⮞ Custom Image: The image specified below will be used for SEO. Choose this option if you want a different SEO image from the featured or fallback site-wide one.',
              default: 'featured-image-if-enabled',
              options: [
                {
                  label: 'Site Image',
                  value: 'site-image',
                },
                {
                  label: 'Featured Image (If Enabled)',
                  value: 'featured-image-if-enabled',
                },
                {
                  label: 'Custom Image',
                  value: 'custom-image',
                },
              ],
            },
            {
              label: 'Custom SEO Image',
              name: 'customSeoImage',
              widget: 'image',
              hint:
                "To use a custom SEO image, you must select Use Custom Image above. Select an image that's bigger than 1200×630 and looks good when cropped into a square. Facebook recommends a 1200×630 (1.91:1) and will crop the top and bottom of larger images. Reddit will crop and resize images to 70×70. Twitter Cards can use either square or wide images depending on the card type being used, but the default is a square. Use a different URL for new images or the image won't be updated by Facebook.",
              default: '/media/no-image.png',
            },
            {
              label: 'Custom SEO Image Alt',
              name: 'customSeoImageAlt',
              widget: 'string',
              hint:
                "A description of what's happening in the custom image. This is used for accessibility, so visually impaired readers can know what's up. Supports template tags.",
              default: 'none',
            },
          ],
        },
      ],
    },
    {
      label: 'Group',
      name: 'group',
      widget: 'hidden',
      default: 'posts',
    },
  ],
};

export default blogPosts;
