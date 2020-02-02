import builtInPageSettings from './settings/built-in-page-settings.json';
import contactFormSettings from './settings/contact-form-settings.json';
import customSettings from './settings/custom-settings.json';
import discussionSettings from './settings/discussion-settings.json';
import mailingListSettings from './settings/mailing-list-settings.json';
import menuSettings from './settings/menu-settings.json';
import navbarSettings from './settings/navbar-settings.json';
import offlineSupportSettings from './settings/offline-support-settings.json';
import postSettings from './settings/post-settings.json';
import reportingSettings from './settings/reporting-settings.json';
import siteSettings from './settings/site-settings.json';
import siteWideSeoSettings from './settings/site-wide-seo-settings.json';
import socialSharingSettings from './settings/social-sharing-settings.json';
import themeSettings from './settings/theme-settings.json';

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
    builtInPageSettings,
    siteWideSeoSettings,
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
