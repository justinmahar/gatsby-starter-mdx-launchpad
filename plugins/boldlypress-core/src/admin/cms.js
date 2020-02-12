import CMS from 'netlify-cms-app';
import blogPostsCollection from './collections/blogPostsCollection';
import pagesCollection from './collections/pagesCollection';
import settingsCollection from './collections/settingsCollection';

const setup = {
  backend: {
    name: 'git-gateway',
    branch: 'master',
  },
  publish_mode: 'simple',
  media_folder: 'static/media',
  public_folder: '/media',
};

// Use the test-repo backend when developing
const isDevelopment = process.env.NODE_ENV === 'development';
if (isDevelopment) {
  setup.backend = {
    name: 'test-repo',
  };
}

const initOptions = {
  config: {
    ...setup,
    collections: [blogPostsCollection, pagesCollection, settingsCollection],
  },
};

// Initialize NetlifyCMS with the above config.
CMS.init(initOptions);
