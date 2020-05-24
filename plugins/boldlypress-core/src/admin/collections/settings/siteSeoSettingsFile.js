const siteSeoSettingsFile = {
  label: 'Site SEO Settings',
  name: 'siteSeoSettings',
  file: 'settings/seo/site-seo-settings.yml',
  fields: [
    {
      label: 'SEO Title Separator',
      name: 'seoTitleSeparator',
      widget: 'string',
      hint:
        'Separator for titles. For instance, use " | " or " - ", without quotes. This will be used to separate the page name from the site name. Be sure to include spaces before and after the separator if desired. Reference using: {seoTitleSeparator}',
    },
    {
      label: 'SEO Configurations',
      name: 'seoConfigurations',
      widget: 'list',
      hint:
        '↑ SEO (Search Engine Optimization) configurations can be used to quickly change SEO and sharing settings for all posts and pages that reference them.',
      fields: [
        {
          label: 'Configuration Name',
          name: 'seoConfigurationName',
          widget: 'string',
          hint: 'A name for this SEO configuration. This will only be visible in this admin portal.',
        },
        {
          label: 'Configuration ID',
          name: 'seoConfigurationId',
          widget: 'string',
          hint:
            'A unique ID used to reference this SEO configuration. This will only be visible in this admin portal.',
        },
        {
          label: 'SEO Title',
          name: 'seoTitle',
          widget: 'string',
          hint:
            'The title shown in the browser tab and in Google search results. Use an attention-grabbing title and keep this to 50-60 characters or shorter for best results. Supports template tags. Reference using: {configSeoTitle}',
        },
        {
          label: 'SEO Description',
          name: 'seoDescription',
          widget: 'string',
          hint:
            'A description of the content. Can also be an excerpt, if you want. At least two sentences long is recommended, and it should entice users to click. Supports template tags. Reference using: {configSeoDescription}',
        },
      ],
    },
  ],
};

export default siteSeoSettingsFile;
