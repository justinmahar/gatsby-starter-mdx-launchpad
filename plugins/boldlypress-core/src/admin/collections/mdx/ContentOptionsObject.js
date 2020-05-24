import layoutOptions from './layoutOptions';

const ContentOptionsObject = (options) => {
  const layoutDefault = options && options.layoutDefault ? options.layoutDefault : 'content';
  const showDateDefault =
    options && typeof (options.showDateDefault !== 'undefined') ? options.showDateDefault : true;
  const enableDiscussionDefault =
    options && typeof (options.enableDiscussionDefault !== 'undefined') ? options.enableDiscussionDefault : true;

  return {
    label: 'Content Options',
    name: 'options',
    widget: 'object',
    fields: [
      {
        label: 'Layout',
        name: 'layout',
        widget: 'select',
        hint: 'Select the layout type.',
        default: layoutDefault,
        options: layoutOptions,
      },
      {
        label: 'Show Title',
        name: 'showTitle',
        widget: 'boolean',
        hint: "You can show or hide the title if you'd like.",
        default: true,
      },
      {
        label: 'Unlisted',
        name: 'unlisted',
        widget: 'boolean',
        hint:
          'When enabled, the content will only be accessible with a link. It will not be shown in blog listings or in the sitemap, and its path will be prefixed with /u/ (i.e. /u/my-post).',
        default: false,
      },
      {
        label: 'Hidden',
        name: 'hidden',
        widget: 'boolean',
        hint:
          "If you hide content, it won't be visible to users on the site, and it will not be accessible via a link. Use this to pull down content, and to hide pages referenced in Built-In Page Settings.",
        default: false,
      },
      {
        label: 'Show Date',
        name: 'dateEnabled',
        widget: 'boolean',
        hint: 'When disabled, the date will not be shown for the content.',
        default: showDateDefault,
      },
      {
        label: 'Enable Discussion',
        name: 'discussionEnabled',
        widget: 'boolean',
        hint: 'When disabled, the comments section will not be shown.',
        default: enableDiscussionDefault,
      },
    ],
  };
};

export default ContentOptionsObject;
