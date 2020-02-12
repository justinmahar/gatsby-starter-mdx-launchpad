import contactFormSettings from './settings/contactFormSettings';
import customSettings from './settings/customSettings';
import discussionSettings from './settings/discussionSettings';
import mailingListSettings from './settings/mailingListSettings';
import menuSettings from './settings/menuSettings';
import navbarSettings from './settings/navbarSettings';
import offlineSupportSettings from './settings/offlineSupportSettings';
import builtInPagesSettings from './settings/builtInPagesSettings';
import postSettings from './settings/postSettings';
import reportingSettings from './settings/reportingSettings';
import siteSeoSettings from './settings/siteSeoSettings';
import siteSettings from './settings/siteSettings';
import socialSharingSettings from './settings/socialSharingSettings';
import themeSettings from './settings/themeSettings';

const settings = {
  label: 'Settings',
  name: 'settings',
  description: "Configure your site's menus, forms, discussion, sharing, posts, and more.",
  delete: false,
  editor: {
    preview: false,
  },
  files: [
    siteSettings,
    builtInPagesSettings,
    siteSeoSettings,
    contactFormSettings,
    mailingListSettings,
    discussionSettings,
    navbarSettings,
    menuSettings,
    socialSharingSettings,
    themeSettings,
    postSettings,
    reportingSettings,
    offlineSupportSettings,
    ...customSettings,
  ],
};

export default settings;
