import builtInPagesSettingsFile from './settings/builtInPagesSettingsFile';
import contactFormSettingsFile from './settings/contactFormSettingsFile';
import customSettingsFiles from './settings/customSettingsFiles';
import discussionSettingsFile from './settings/discussionSettingsFile';
import mailingListSettingsFile from './settings/mailingListSettingsFile';
import menuSettingsFile from './settings/menuSettingsFile';
import navbarSettingsFile from './settings/navbarSettingsFile';
import offlineSupportSettingsFile from './settings/offlineSupportSettingsFile';
import postSettingsFile from './settings/postSettingsFile';
import reportingSettingsFile from './settings/reportingSettingsFile';
import siteSeoSettingsFile from './settings/siteSeoSettingsFile';
import siteSettingsFile from './settings/siteSettingsFile';
import socialSharingSettingsFile from './settings/socialSharingSettingsFile';
import themeSettingsFile from './settings/themeSettingsFile';

const settingsCollection = {
  label: 'Settings',
  name: 'settings',
  description: "Configure your site's menus, forms, discussion, sharing, posts, and more.",
  delete: false,
  editor: {
    preview: false,
  },
  files: [
    siteSettingsFile,
    builtInPagesSettingsFile,
    siteSeoSettingsFile,
    contactFormSettingsFile,
    mailingListSettingsFile,
    discussionSettingsFile,
    navbarSettingsFile,
    menuSettingsFile,
    socialSharingSettingsFile,
    themeSettingsFile,
    postSettingsFile,
    reportingSettingsFile,
    offlineSupportSettingsFile,
    ...customSettingsFiles,
  ],
};

export default settingsCollection;
