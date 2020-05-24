import builtInPagesSettingsFile from './settings/builtInPagesSettingsFile';
import formSettingsFile from './settings/formSettingsFile';
import customSettingsFiles from './settings/customSettingsFiles';
import discussionSettingsFile from './settings/discussionSettingsFile';
import offlineSupportSettingsFile from './settings/offlineSupportSettingsFile';
import postSettingsFile from './settings/postSettingsFile';
import reportingSettingsFile from './settings/reportingSettingsFile';
import siteSeoSettingsFile from './settings/siteSeoSettingsFile';
import siteSettingsFile from './settings/siteSettingsFile';
import socialSharingSettingsFile from './settings/socialSharingSettingsFile';

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
    formSettingsFile,
    discussionSettingsFile,
    socialSharingSettingsFile,
    postSettingsFile,
    reportingSettingsFile,
    offlineSupportSettingsFile,
    ...customSettingsFiles,
  ],
};

export default settingsCollection;
