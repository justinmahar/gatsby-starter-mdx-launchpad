const discussionSettingsFile = {
  label: 'Discussion Settings',
  name: 'discussion-settings',
  file: 'settings/discussion/discussion-settings.yml',
  fields: [
    {
      label: 'Disqus Shortname',
      name: 'disqusShortname',
      widget: 'string',
      hint: 'Put your Disqus shortname here to enable comments. Get one here: https://disqus.com/',
    },
  ],
};

export default discussionSettingsFile;
