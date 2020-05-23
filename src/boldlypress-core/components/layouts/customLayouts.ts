import { CustomLayouts } from '../../../../plugins/boldlypress-core/src/components/layouts/getLayout';
import AppLayout from './impl/AppLayout';

const customLayouts: CustomLayouts = {
  app: AppLayout,
};

export default customLayouts;

// These will be exposed to the CMS (via customLayoutOptions.js)
// The values should match the keys defined above.
export const layoutOptions = [
  {
    label: 'App',
    value: 'app',
  },
];
