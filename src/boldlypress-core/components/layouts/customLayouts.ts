import { CustomLayouts } from '../../../../plugins/boldlypress-core/src/components/layouts/getLayout';
import LandingPageLayout from './impl/LandingPageLayout';
import AppLayout from './impl/AppLayout';
import TemplateLayout from './impl/TemplateLayout';

const customLayouts: CustomLayouts = {
  'landing-page': LandingPageLayout,
  app: AppLayout,
  template: TemplateLayout,
};

// IMPORTANT: Be sure to expose your layout to the user in: customLayoutOptions.js

export default customLayouts;
