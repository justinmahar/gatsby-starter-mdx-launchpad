import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import SiteMetadata from "../../data/SiteMetadata"

export interface ITemplateTagProps {
  value: string
}

export default function TemplateTag(props: ITemplateTagProps) {
  const data = useStaticQuery(graphql`
  query TemplateTagQuery {
    site {
      siteMetadata {
        ...siteMetadataCommons
      }
    }
  }
`)

  const siteMetadata = new SiteMetadata(data.site.siteMetadata);

  const tagValue = siteMetadata.replaceTemplateTags(props.value)
  return <>{tagValue}</>
}
