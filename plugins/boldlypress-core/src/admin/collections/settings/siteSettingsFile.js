import languageOptions from './languageOptions';

const siteSettingsFile = {
  label: 'Site Settings',
  name: 'siteMetadataSettings',
  file: 'settings/site-metadata/site-metadata-settings.yml',
  fields: [
    {
      label: 'Site Name',
      name: 'siteName',
      widget: 'string',
      hint: 'The name of your site',
    },
    {
      label: 'Site Description',
      name: 'siteDescription',
      widget: 'string',
      hint: 'A description of your site.',
    },
    {
      label: 'Site Image',
      name: 'siteImage',
      widget: 'image',
      hint:
        "An image for your site. This is used by default when sharing pages of your site. Select an image that's bigger than 1200×630 and looks good when cropped into a square. Facebook recommends a 1200×630 (1.91:1) and will crop the top and bottom of larger images. Reddit will crop and resize images to 70×70. Twitter Cards can use either square or wide images depending on the card type being used, but the default is a square. Use a different URL for new images or the image won't be updated by Facebook.",
    },
    {
      label: 'Site Image Alt',
      name: 'siteImageAlt',
      widget: 'string',
      hint:
        "Alt text for the site image. Describes what's happening in the image for the visually impaired. Set to none to disable.",
    },
    {
      label: 'Site Icon',
      name: 'siteIcon',
      widget: 'image',
      hint:
        'An icon for your site. This is used by default in the navbar and for offline support (progressive web app). Must be square, at least 512x512, and either: JPEG, PNG, WebP, TIFF, GIF or SVG.',
    },
    {
      label: 'Site Icon Alt',
      name: 'siteIconAlt',
      widget: 'string',
      hint:
        "Alt text for the site icon. Describes what's happening in the icon for the visually impaired. Set to none to disable.",
    },
    {
      label: 'Site Language',
      name: 'siteLanguage',
      widget: 'select',
      options: languageOptions,
      hint: 'The site language.',
    },
    {
      label: 'Site URL',
      name: 'siteUrl',
      widget: 'string',
      hint: 'The URL to this site. This is used in the sitemap.',
    },
  ],
};

export default siteSettingsFile;
