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
  ],
};

export default reportingSettingsFile;
