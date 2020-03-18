const socialSharingSettingsFile = {
  label: 'Social & Sharing Settings',
  name: 'socialSharingSettings',
  file: 'settings/social-sharing/social-sharing-settings.yml',
  fields: [
    {
      label: 'Sharing',
      name: 'sharing',
      widget: 'object',
      fields: [
        {
          label: 'Facebook Post Sharing',
          name: 'facebookPostSharingEnabled',
          widget: 'boolean',
          hint: 'When enabled, the Facebook share button will appear.',
        },
        {
          label: 'Twitter Post Sharing',
          name: 'twitterPostSharingEnabled',
          widget: 'boolean',
          hint: 'When enabled, the Twitter share button will appear.',
        },
        {
          label: 'LinkedIn Post Sharing',
          name: 'linkedInPostSharingEnabled',
          widget: 'boolean',
          hint: 'When enabled, the LinkedIn share button will appear.',
        },
        {
          label: 'Sharing On Home Page',
          name: 'shareHomePageEnabled',
          widget: 'boolean',
          hint:
            'When enabled, sharing buttons will appear on the home page, allowing the user to share the home page itself.',
        },
      ],
    },
    {
      label: 'Social Accounts',
      name: 'socialAccounts',
      widget: 'list',
      hint: 'Social accounts shown in the footer.',
      fields: [
        {
          label: 'Name',
          name: 'name',
          widget: 'string',
          hint: 'Name of social account.',
        },
        {
          label: 'Link',
          name: 'link',
          widget: 'string',
          hint:
            'The URL to the social account, or a mailto: for email addresses. Any link ending with /contact will use a mail icon that links locally.',
        },
        {
          label: 'External',
          name: 'external',
          widget: 'boolean',
          default: true,
          hint: 'Switch on if this link takes the user off-site. Switch off if the link is local to this site.',
        },
        {
          label: 'Enabled',
          name: 'enabled',
          widget: 'boolean',
          default: true,
          hint: 'Switch on if the social account should be enabled. Switching off will hide it.',
        },
      ],
    },
    {
      label: 'Twitter Site Username',
      name: 'twitterSiteUsername',
      widget: 'string',
      hint:
        'Used as the attribution username when linking to the site in Twitter. Use the @ symbol, e.g. @devboldly. Set to none to disable.',
    },
  ],
};

export default socialSharingSettingsFile;
