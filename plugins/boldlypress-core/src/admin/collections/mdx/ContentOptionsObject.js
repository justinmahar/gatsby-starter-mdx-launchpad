import customLayoutOptions from './customLayoutOptions';

const ContentOptionsObject = options => {
  const layoutDefault = options && options.layoutDefault ? options.layoutDefault : 'post';
  const showSidebarDefault =
    options && typeof (options.showSidebarDefault !== 'undefined') ? options.showSidebarDefault : true;
  const showDateDefault = options && typeof (options.showDateDefault !== 'undefined') ? options.showDateDefault : true;
  const enableDiscussionDefault =
    options && typeof (options.enableDiscussionDefault !== 'undefined') ? options.enableDiscussionDefault : true;

  return {
    label: 'Content Options',
    name: 'options',
    widget: 'object',
    fields: [
      {
        label: 'Show Sidebar',
        name: 'showSidebar',
        widget: 'boolean',
        hint: "You can show or hide the sidebar if you'd like.",
        default: showSidebarDefault,
      },
      {
        label: 'Show Title',
        name: 'showTitle',
        widget: 'boolean',
        hint: "You can show or hide the title if you'd like.",
        default: true,
      },
      {
        label: 'Hidden',
        name: 'hidden',
        widget: 'boolean',
        hint: "If you hide content, it won't be visible to users on the site.",
        default: false,
      },
      {
        label: 'Layout',
        name: 'layout',
        widget: 'select',
        hint: 'Select the layout type.',
        default: layoutDefault,
        options: [
          {
            label: 'Page/Post',
            value: 'page-post',
          },
          {
            label: 'Blog Homepage',
            value: 'blog-index',
          },
          {
            label: 'Category Post Listing Page',
            value: 'category-post-listing',
          },
          ...customLayoutOptions,
        ],
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
