const SeoSettingsObject = options => {
  const seoConfigurationIdDefault =
    options && options.seoConfigurationIdDefault ? options.seoConfigurationIdDefault : 'default';

  return {
    label: 'SEO Settings',
    name: 'seoSettings',
    widget: 'object',
    fields: [
      {
        label: 'SEO Configuration ID',
        name: 'seoConfigurationId',
        widget: 'string',
        hint: 'Set to the ID of the SEO configuration to use (defined in Site SEO Settings).',
        default: seoConfigurationIdDefault,
      },
      {
        label: 'SEO Title',
        name: 'seoTitle',
        widget: 'string',
        hint:
          'The title shown in the browser tab and in Google search results. Use an attention-grabbing title and keep this to 50-60 characters or shorter for best results. Supports template tags. Template tag for this setting: {contentSeoTitle}',
        default: '{configSeoTitle}',
      },
      {
        label: 'SEO Description',
        name: 'seoDescription',
        widget: 'string',
        hint:
          'A description of the content. Can also be an excerpt, if you want. At least two sentences long is recommended, and it should entice users to click. Use {computedPostSeoDescription} for the site-wide title computed from Site-Wide Post SEO Settings. Supports template tags. Template tag for this setting: {contentSeoDescription}',
        default: '{configSeoDescription}',
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
  };
};

export default SeoSettingsObject;
