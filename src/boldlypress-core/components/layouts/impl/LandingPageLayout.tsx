import { graphql, useStaticQuery } from 'gatsby';
import * as React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import MdxSEO from '../../../../../plugins/boldlypress-core/src/components/configured/MdxSEO';
import Footer from '../../../../../plugins/boldlypress-core/src/components/Footer';
import ImageHeaderContainer from '../../../../../plugins/boldlypress-core/src/components/ImageHeaderContainer';
import { LayoutProps } from '../../../../../plugins/boldlypress-core/src/components/layouts/getLayout';
import TopBar from '../../../../../plugins/boldlypress-core/src/components/TopBar';
import Wrapper from '../../../../../plugins/boldlypress-core/src/components/Wrapper';
import MdxContent from '../../../../../plugins/boldlypress-core/src/data/MdxContent';
import SiteSeoSettings from '../../../../../plugins/boldlypress-core/src/data/settings/SiteSeoSettings';
import SocialSharingSettings from '../../../../../plugins/boldlypress-core/src/data/settings/SocialSharingSettings';
import SiteMetadata from '../../../../../plugins/boldlypress-core/src/data/SiteMetadata';

export default function LandingPageLayout(props: LayoutProps): JSX.Element {
  const data = useStaticQuery(graphql`
    query LandingPageLayoutQuery {
      site {
        siteMetadata {
          ...siteMetadataCommons
        }
      }
      seoYaml {
        ...siteSeoSettings
      }
      mailingListYaml {
        ...mailingListSettings
      }
      postYaml {
        ...postSettings
      }
      discussionYaml {
        ...discussionSettings
      }
      socialSharingYaml {
        ...socialSharingSettings
      }
    }
  `);

  const mdxContent: MdxContent = new MdxContent(props.mdx);
  const siteMetadata: SiteMetadata = new SiteMetadata(data.site.siteMetadata);
  const siteSeoSettings = new SiteSeoSettings(data.seoYaml);
  const socialSharingSettings: SocialSharingSettings = new SocialSharingSettings(data.socialSharingYaml);

  const templateTags = {
    ...siteMetadata.getTemplateTags(),
    ...socialSharingSettings.getTemplateTags(),
    ...siteSeoSettings.getTemplateTagsFor(mdxContent.data.frontmatter.seoSettings.seoConfigurationId),
    ...mdxContent.getTemplateTags(),
  };

  return (
    <>
      <MdxSEO mdxContent={mdxContent} templateTags={templateTags} />
      <Wrapper>
        {!!mdxContent.data.frontmatter.featuredImage.featuredImageEnabled &&
          !!mdxContent.data.frontmatter.featuredImage.featuredImageUrl &&
          mdxContent.data.frontmatter.featuredImage.showTitleSection && (
            <ImageHeaderContainer
              title={mdxContent.data.frontmatter.title}
              featuredImage={mdxContent.data.frontmatter.featuredImage.featuredImageUrl}
            />
          )}
        <TopBar />
        <Container className="mt-5 mb-4">
          <Row>
            <Col>
              <h1>Landing page layout!</h1>
              <p>Build your landing page here.</p>
            </Col>
          </Row>
        </Container>
        <Footer />
      </Wrapper>
    </>
  );
}
