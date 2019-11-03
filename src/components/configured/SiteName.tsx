import * as React from 'react';
import TemplateTag from './TemplateTag';

export interface ISiteNameProps {
}

export default function SiteName (props: ISiteNameProps) {
  return (
    <TemplateTag value="{siteName}"/>
  );
}
