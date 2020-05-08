const reportingSettingsFile = {
  label: 'Reporting Settings',
  name: 'reportingSettings',
  file: 'settings/reporting/reporting-settings.yml',
  fields: [
    {
      label: 'Google Analytics',
      name: 'googleAnalytics',
      widget: 'object',
      hint: '↑ Google Analytics settings',
      fields: [
        {
          label: 'Google Analytics Enabled',
          name: 'analyticsEnabled',
          widget: 'boolean',
          hint: 'Switch on to enable Google Analytics',
        },
        {
          label: 'Google Analytics Tracking ID',
          name: 'trackingId',
          widget: 'string',
          hint: 'Enter your Google Analytics Tracking ID here. Get one here: https://analytics.google.com/',
        },
        {
          label: 'anonymize',
          name: 'anonymize',
          widget: 'boolean',
          hint:
            "Switch this on to anonymize the visitor's IP. Some countries (such as Germany) require you to use the _anonymizeIP function for Google Analytics, otherwise you are not allowed to use the service.",
        },
        {
          label: 'Respect “Do Not Track” Settings',
          name: 'respectDNT',
          widget: 'boolean',
          hint:
            'If you enable this option, Google Analytics will not be loaded at all for visitors that have “Do Not Track” enabled. While using Google Analytics does not necessarily constitute Tracking, you might still want to do this to cater to more privacy oriented users.',
        },
        {
          label: 'Place Tracking Script In Head',
          name: 'scriptInHead',
          widget: 'boolean',
          hint:
            "Defines where to place the tracking script. Switch on to place in the head, switch off to place in the body. Google recommends placing the tracking script in the head, but you might toggle this if you're concerned about performance.",
        },
      ],
    },
    {
      label: 'Google OAuth Client ID',
      name: 'googleOAuthClientId',
      widget: 'string',
      hint:
        'OAuth Client ID for the Google Analytics API. Used for analytics charts shown on admin dashboard. See: https://devboldly.github.io/react-analytics-charts/google-oauth-client-id',
    },
    {
      label: 'Build Status Badge',
      name: 'buildStatusBadge',
      widget: 'object',
      hint: '↑ Build Status Badge settings',
      fields: [
        {
          label: 'Badge Image URL',
          name: 'buildStatusBadgeImageUrl',
          widget: 'string',
          hint: 'Location of the build status badge.',
        },
        {
          label: 'Badge Image Alt',
          name: 'buildStatusBadgeImageAlt',
          widget: 'string',
          hint: 'Alt text for badge image, for the visually impaired.',
        },
        {
          label: 'Badge Image Link',
          name: 'buildStatusBadgeImageLink',
          widget: 'string',
          hint: 'Link for the badge. Set to none for no link.',
        },
      ],
    },
  ],
};

export default reportingSettingsFile;
