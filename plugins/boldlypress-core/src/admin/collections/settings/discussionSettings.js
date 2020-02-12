const discussionSettings = {
  label: 'Discussion Settings',
  name: 'discussion-settings',
  file: 'settings/discussion/discussion-settings.yml',
  fields: [
    {
      label: 'Site-Wide Comments',
      name: 'siteWideCommentsEnabled',
      widget: 'boolean',
      hint: 'Use this to turn comments on/off for the entire site.',
    },
    {
      label: 'Disqus Shortname',
      name: 'disqusShortname',
      widget: 'string',
      hint: 'Put your Disqus shortname here to enable comments. Get one here: https://disqus.com/',
    },
  ],
};

export default discussionSettings;
