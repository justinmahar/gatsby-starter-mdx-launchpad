const socialSharingSettingsFile = {
  label: 'Social & Sharing Settings',
  name: 'socialSharingSettings',
  file: 'settings/social-sharing/social-sharing-settings.yml',
  fields: [
    {
      label: 'Sharing On Home Page',
      name: 'shareHomePageEnabled',
      widget: 'boolean',
      hint:
        'When enabled, the above buttons will appear in a sidebar widget on the home page, allowing the user to share the home page itself.',
    },
    {
      label: 'Facebook',
      name: 'facebook',
      widget: 'object',
      fields: [
        {
          label: 'Facebook Post Sharing',
          name: 'facebookPostSharingEnabled',
          widget: 'boolean',
          hint: 'When enabled, the Facebook share button will appear next to posts.',
        },
        {
          label: 'Connect Via Facebook (In Footer)',
          name: 'connectViaFacebookEnabled',
          widget: 'boolean',
          hint: 'When enabled, the footer will contain a link to your Facebook page, profile, etc.',
        },
        {
          label: 'Connect Via Facebook URL',
          name: 'connectViaFacebookUrl',
          widget: 'string',
          hint: 'The URL to your Facebook page, profile, etc.',
        },
      ],
    },
    {
      label: 'Twitter',
      name: 'twitter',
      widget: 'object',
      fields: [
        {
          label: 'Twitter Site Username',
          name: 'twitterSiteUsername',
          widget: 'string',
          hint:
            'Used as the attribution username when linking to the site in Twitter. Use the @ symbol, e.g. @devboldly. Set to none to disable.',
        },
        {
          label: 'Twitter Post Sharing',
          name: 'twitterPostSharingEnabled',
          widget: 'boolean',
          hint: 'When enabled, the Twitter share button will appear next to posts.',
        },
        {
          label: 'Connect Via Twitter (In Footer)',
          name: 'connectViaTwitterEnabled',
          widget: 'boolean',
          hint: 'When enabled, the footer will contain a link to the Twitter profile specified below.',
        },
        {
          label: 'Connect Via Twitter URL',
          name: 'connectViaTwitterUrl',
          widget: 'string',
          hint: 'The URL to your Twitter profile.',
        },
      ],
    },
    {
      label: 'LinkedIn',
      name: 'linkedIn',
      widget: 'object',
      fields: [
        {
          label: 'LinkedIn Post Sharing',
          name: 'linkedInPostSharingEnabled',
          widget: 'boolean',
          hint: 'When enabled, the LinkedIn share button will appear next to posts.',
        },
      ],
    },
    {
      label: 'Email',
      name: 'email',
      widget: 'object',
      fields: [
        {
          label: 'Connect Via Email (In Footer)',
          name: 'connectViaEmailEnabled',
          widget: 'boolean',
          hint: 'When enabled, the footer will contain a link to contact you via email or a contact form.',
        },
        {
          label: 'Connect Via Email URL',
          name: 'connectViaEmailUrl',
          widget: 'string',
          hint:
            'The URL to a contact page, or a mailto email link. Examples: "/contact", "mailtocontact@me.com" (without quotes)',
        },
      ],
    },
  ],
};

export default socialSharingSettingsFile;
