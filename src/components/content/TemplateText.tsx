import React from 'react';
import MdxContent from '../../data/MdxContent';
import { TemplateTagRenderer } from '../../data/TemplateTagRenderer';
import Settings, { useSettings } from '../../settings/useSettings';

interface Props {
  text: string;
  mdxContent?: MdxContent;
}

export const TemplateText = (props: Props): JSX.Element => {
  const settings: Settings = useSettings();
  let tags: TemplateTagRenderer = settings.getTemplateTagRenderer();
  if (props.mdxContent) {
    tags = tags.combineWith(props.mdxContent.getTemplateTagRenderer());
  }
  const renderedText = tags.render(props.text);
  return <>{renderedText}</>;
};
