const SharingObject = () => {
  return {
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
        default: '{contentSeoTitle}',
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
        default: '{contentSeoTitle}',
      },
      {
        label: 'Twitter Via',
        name: 'twitterVia',
        widget: 'string',
        hint: 'The attribution for the shared content on Twitter. Supports template tags.',
        default: '{twitterSiteUsername}',
      },
      {
        label: 'Twitter Hashtags',
        name: 'twitterHashtags',
        widget: 'string',
        hint: 'Hashtags for the content. Set to none for no hashtags.',
        default: 'none',
      },
    ],
  };
};

export default SharingObject;
