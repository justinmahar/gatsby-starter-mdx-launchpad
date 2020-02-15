import { CustomLayouts } from '../../../../plugins/boldlypress-core/src/components/layouts/getLayout';
import LandingPageLayout from './impl/LandingPageLayout';
import AppLayout from './impl/AppLayout';
import TemplateLayout from './impl/TemplateLayout';

const customMdxLayouts: CustomLayouts = {
  'landing-page': LandingPageLayout,
  app: AppLayout,
  template: TemplateLayout,
};

export default customMdxLayouts;
