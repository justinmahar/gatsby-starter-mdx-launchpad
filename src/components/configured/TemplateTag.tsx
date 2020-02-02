import { graphql, useStaticQuery } from 'gatsby';
import * as React from 'react';
import SiteMetadata from '../../data/SiteMetadata';

export interface TemplateTagProps {
  value: string;
}

export default function TemplateTag(props: TemplateTagProps): JSX.Element {
  const data = useStaticQuery(graphql`
    query TemplateTagQuery {
      site {
        siteMetadata {
          ...siteMetadataCommons
        }
      }
    }
  `);

  const siteMetadata = new SiteMetadata(data.site.siteMetadata);

  const tagValue = siteMetadata.replaceTemplateTags(props.value);
  return <>{tagValue}</>;
}
