import CMS from 'netlify-cms-app';
import blogPosts from './collections/blogPosts';
import pages from './collections/pages';
import settings from './collections/settings';

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
    collections: [blogPosts, pages, settings],
  },
};

// Initialize NetlifyCMS with the above config.
CMS.init(initOptions);
