import customSettingsFiles from './settings/customSettingsFiles';
import discussionSettingsFile from './settings/discussionSettingsFile';
import offlineSupportSettingsFile from './settings/offlineSupportSettingsFile';
import reportingSettingsFile from './settings/reportingSettingsFile';
import siteSeoSettingsFile from './settings/siteSeoSettingsFile';
import siteSettingsFile from './settings/siteSettingsFile';

const settingsCollection = {
  label: 'Settings',
  name: 'settings',
  description: 'Configure your site settings.',
  delete: false,
  editor: {
    preview: false,
  },
  files: [
    siteSettingsFile,
    siteSeoSettingsFile,
    discussionSettingsFile,
    reportingSettingsFile,
    offlineSupportSettingsFile,
    ...customSettingsFiles,
  ],
};

export default settingsCollection;
