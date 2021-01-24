import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';
import { Container } from 'react-bootstrap';
import MdxContent from '../../data/MdxContent';
import { TemplateTagRenderer } from '../../data/TemplateTagRenderer';
import Settings, { useSettings } from '../../data/useSettings';
import Body from '../layouts/Body';
import Layout from '../layouts/Layout';
import MdxHead from './MdxHead';

export interface MdxPageTemplateProps {
  pageContext: any;
  data: any;
}

export default function MdxPageTemplate(props: MdxPageTemplateProps): JSX.Element {
  const mdxContent: MdxContent = new MdxContent(props.data.mdx);
  const settings: Settings = useSettings();

  const templateTagRenderer: TemplateTagRenderer = mdxContent
    .getTemplateTagRenderer()
    .combineWith(settings.getTemplateTagRenderer());
  const contentTitle = templateTagRenderer.render(mdxContent.data.frontmatter.title);

  return (
    <Layout>
      <MdxHead mdxContent={mdxContent} />
      <Body>
        <Container className="content-container">
          <h1>{contentTitle}</h1>
          <MDXRenderer scope={undefined} components={undefined}>
            {mdxContent.data.body}
          </MDXRenderer>
        </Container>
      </Body>
    </Layout>
  );
}

// Page query is located in js/MdxPageTemplate.js
