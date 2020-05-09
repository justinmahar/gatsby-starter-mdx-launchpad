import { Location } from '@reach/router';
import { graphql, Link, useStaticQuery } from 'gatsby';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';
import moment from 'moment';
import * as React from 'react';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import MdxContent from '../../../data/MdxContent';
import DiscussionSettings from '../../../data/settings/DiscussionSettings';
import PostSettings from '../../../data/settings/PostSettings';
import SiteSeoSettings from '../../../data/settings/SiteSeoSettings';
import SocialSharingSettings from '../../../data/settings/SocialSharingSettings';
import SiteMetadata from '../../../data/SiteMetadata';
import renderTemplateTags from '../../../util/render-template-tags';
import MdxSEO from '../../configured/MdxSEO';
import DiscussionComponent from '../../DiscussionComponent';
import Footer from '../../Footer';
import ImageHeaderContainer from '../../ImageHeaderContainer';
import MailingListSignupCard from '../../MailingListSignupCard';
import MailingListSignupContainer from '../../MailingListSignupContainer';
import RecentPostsWidget from '../../RecentPostsWidget';
import SocialShareComponent from '../../SocialShareComponent';
import TopBar from '../../TopBar';
import Wrapper from '../../Wrapper';
import { LayoutProps } from '../getLayout';
import { AdminOnly, NetlifyCMSButton } from 'react-authless-admin';

export default function ContentLayout(props: LayoutProps): JSX.Element {
  const data = useStaticQuery(graphql`
    query ContentLayoutQuery {
      site {
        siteMetadata {
          ...siteMetadataCommons
        }
      }
      seoYaml {
        ...siteSeoSettings
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
  const siteMetadata = new SiteMetadata(data.site.siteMetadata);
  const siteSeoSettings = new SiteSeoSettings(data.seoYaml);
  const postSettings = new PostSettings(data.postYaml);
  const discussionSettings = new DiscussionSettings(data.discussionYaml);
  const socialSharingSettings: SocialSharingSettings = new SocialSharingSettings(data.socialSharingYaml);

  const postCategoryListSlug = postSettings.data.postCategoryListSlug;

  if (!mdxContent) {
    return <p>No MDX content was provided.</p>;
  }

  const showSidebar: boolean = mdxContent.hasSidebar();

  const templateTags = {
    ...siteMetadata.getTemplateTags(),
    ...socialSharingSettings.getTemplateTags(),
    ...siteSeoSettings.getTemplateTagsFor(mdxContent.data.frontmatter.seoSettings.seoConfigurationId),
    ...mdxContent.getTemplateTags(),
  };

  const contentTitle = renderTemplateTags(mdxContent.data.frontmatter.title, templateTags);

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
        <a
          id="content"
          style={{
            display: 'block',
            position: 'relative',
            top: '-50px',
            visibility: 'hidden',
          }}
        />
        <Container className="mt-5 mb-4">
          <Row>
            <Col lg={{ span: 8, offset: showSidebar ? 0 : 2 }}>
              <div className="mb-4" style={{ fontSize: '120%' }}>
                <Card className="primary">
                  {!!mdxContent.data.frontmatter.featuredImage.featuredImageEnabled &&
                    !!mdxContent.data.frontmatter.featuredImage.featuredImageUrl &&
                    mdxContent.data.frontmatter.featuredImage.showCardImage && (
                      <Card.Img
                        variant="top"
                        src={mdxContent.data.frontmatter.featuredImage.featuredImageUrl}
                        alt={
                          mdxContent.data.frontmatter.featuredImage.featuredImageAlt !== 'none'
                            ? mdxContent.data.frontmatter.featuredImage.featuredImageAlt
                            : undefined
                        }
                      />
                    )}
                  <Card.Body>
                    {mdxContent.data.frontmatter.options.showTitle && (
                      <Card.Title>
                        <h1>{contentTitle}</h1>
                      </Card.Title>
                    )}
                    {((!!mdxContent.data.frontmatter.options.dateEnabled && !!mdxContent.data.frontmatter.date) ||
                      mdxContent.data.fields.categorySlug !== 'none') && (
                      <Card.Text>
                        Posted
                        {!!mdxContent.data.frontmatter.options.dateEnabled && !!mdxContent.data.frontmatter.date && (
                          <>
                            {' on '}
                            {moment(mdxContent.data.frontmatter.date).format('MMMM Do, YYYY')}
                          </>
                        )}
                        {mdxContent.data.fields.categorySlug !== 'none' && (
                          <>
                            {' in '}
                            <Link to={`/${postCategoryListSlug}/${mdxContent.data.fields.categorySlug}`}>
                              {mdxContent.data.frontmatter.category}
                            </Link>
                          </>
                        )}
                      </Card.Text>
                    )}
                    <MDXRenderer scope={undefined} components={undefined}>
                      {mdxContent.data.body}
                    </MDXRenderer>
                    <AdminOnly>
                      <div className="mt-4">
                        <NetlifyCMSButton
                          collection={mdxContent.data.frontmatter.group}
                          entry={mdxContent.data.fields.slug}
                          openInNewWindow
                          component={Button}
                          componentProps={{ variant: 'secondary' }}
                        >
                          ✏️ Edit Content
                        </NetlifyCMSButton>
                      </div>
                    </AdminOnly>
                  </Card.Body>
                </Card>
              </div>
              {!!mdxContent.data.frontmatter.sharing.sharingEnabled &&
                (socialSharingSettings.data.sharing.facebookPostSharingEnabled ||
                  socialSharingSettings.data.sharing.linkedInPostSharingEnabled ||
                  socialSharingSettings.data.sharing.twitterPostSharingEnabled) && (
                  <div className="mb-4">
                    <Card className="secondary">
                      <Card.Body>
                        <Card.Title>
                          <h3 className="mb-2">Share it:</h3>
                        </Card.Title>
                        <Location>
                          {(locationProps) => {
                            return (
                              <SocialShareComponent
                                url={locationProps.location.href}
                                mdxContent={mdxContent}
                                templateTags={templateTags}
                              />
                            );
                          }}
                        </Location>
                      </Card.Body>
                    </Card>
                  </div>
                )}
            </Col>
            {showSidebar && (
              <Col md={{ span: 4 }}>
                <div className="d-none d-md-block mb-4">
                  <MailingListSignupCard formId="mailing-list" />
                </div>
                <div className="mb-4">
                  <RecentPostsWidget />
                </div>
                {!!mdxContent.data.frontmatter.sharing.sharingEnabled &&
                  (socialSharingSettings.data.sharing.facebookPostSharingEnabled ||
                    socialSharingSettings.data.sharing.linkedInPostSharingEnabled ||
                    socialSharingSettings.data.sharing.twitterPostSharingEnabled) && (
                    <div className="d-none d-md-block">
                      <h3 className="mb-2">Share it:</h3>
                      <Location>
                        {(locationProps) => {
                          return (
                            <SocialShareComponent
                              url={locationProps.location.href}
                              mdxContent={mdxContent}
                              templateTags={templateTags}
                            />
                          );
                        }}
                      </Location>
                    </div>
                  )}
              </Col>
            )}
          </Row>
        </Container>
        <span id="discussion" style={{ position: 'relative', top: -50 }} />
        {!!discussionSettings.data.siteWideCommentsEnabled &&
          !!mdxContent.data.frontmatter.options.discussionEnabled && (
            <Container className="pb-5">
              <Row>
                <Col md={{ span: showSidebar ? 12 : 8, offset: showSidebar ? 0 : 2 }}>
                  <Card className="secondary">
                    <Card.Body>
                      <Card.Title>
                        <h3 className="mb-2">Leave a comment:</h3>
                      </Card.Title>
                      <DiscussionComponent
                        title={contentTitle}
                        identifier={mdxContent.data.fields.slug}
                        shortname={discussionSettings.data.disqusShortname}
                      />
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          )}
        <MailingListSignupContainer formId="mailing-list" />
        <Footer />
      </Wrapper>
    </>
  );
}
