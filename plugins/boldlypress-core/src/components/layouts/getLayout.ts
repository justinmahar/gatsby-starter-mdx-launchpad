import * as React from 'react';
import MdxContent from '../../data/MdxContent';
import coreLayouts from './coreLayouts';
import customLayouts from './customLayouts';
import NoLayout from './NoLayout';
import Settings from '../../data/useSettings';
import { TemplateTags } from '../../data/TemplateTags';

export interface LayoutProps {
  pageQueryData: any;
  pageContext: any;
  mdxContent: MdxContent;
  settings: Settings;
  templateTags: TemplateTags;
}

export type CustomLayouts = { [id: string]: React.FC<LayoutProps> };

const getLayout = (layoutId: string): React.FC<LayoutProps> => {
  if (customLayouts[layoutId]) {
    return customLayouts[layoutId];
  } else if (coreLayouts[layoutId]) {
    return coreLayouts[layoutId];
  } else {
    console.error('Layout ID not found:', layoutId);
    return NoLayout;
  }
};

export const getMdxContentLayout = (mdxContent: MdxContent): React.FC<LayoutProps> => {
  const layoutId: string = mdxContent.data.frontmatter.options.layout;
  const Layout: React.FC<LayoutProps> = getLayout(layoutId);
  return Layout;
};

export default getLayout;
