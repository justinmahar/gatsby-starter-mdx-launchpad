import { Location } from '@reach/router';
import { graphql, Link, useStaticQuery } from 'gatsby';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';
import moment from 'moment';
import * as React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import MdxContent from '../../../data/MdxContent';
import DiscussionSettings from '../../../data/settings/DiscussionSettings';
import MailingListSettings from '../../../data/settings/MailingListSettings';
import PostSettings from '../../../data/settings/PostSettings';
import SiteSeoSettings from '../../../data/settings/SiteSeoSettings';
import SocialSharingSettings from '../../../data/settings/SocialSharingSettings';
import SiteMetadata from '../../../data/SiteMetadata';
import useMailingList from '../../../hooks/useMailingList';
import renderTemplateTags from '../../../util/render-template-tags';
import MdxSEO from '../../configured/MdxSEO';
import DiscussionComponent from '../../DiscussionComponent';
import ImageHeaderContainer from '../../ImageHeaderContainer';
import MailingListSignupCard from '../../MailingListSignupCard';
import MailingListSignupContainer from '../../MailingListSignupContainer';
import RecentPostsWidget from '../../RecentPostsWidget';
import SocialShareComponent from '../../SocialShareComponent';
import TopBar from '../../TopBar';
import Wrapper from '../../Wrapper';
import { LayoutProps } from '../getLayout';
import Footer from '../../Footer';

export default function PagePostLayout(props: LayoutProps): JSX.Element {
  const staticQueryData = useStaticQuery(graphql`
    query PagePostLayoutQuery {
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

  const mdxContent: MdxContent = new MdxContent(props.data.mdx);
  const siteMetadata = new SiteMetadata(staticQueryData.site.siteMetadata);
  const siteSeoSettings = new SiteSeoSettings(staticQueryData.seoYaml);
  const mailingListSettings = new MailingListSettings(staticQueryData.mailingListYaml);
  const postSettings = new PostSettings(staticQueryData.postYaml);
  const discussionSettings = new DiscussionSettings(staticQueryData.discussionYaml);
  const socialSharingSettings: SocialSharingSettings = new SocialSharingSettings(staticQueryData.socialSharingYaml);

  const postCategoryListSlug = postSettings.data.postCategoryListSlug;

  const mailingList = useMailingList(
    mailingListSettings.data.mailingListFormActionUrl,
    mailingListSettings.data.mailingListAsyncEnabled,
    mailingListSettings.asyncFetchInitOptions
  );

  if (!props.data.mdx) {
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
                  </Card.Body>
                </Card>
              </div>
              {!!mdxContent.data.frontmatter.sharing.sharingEnabled &&
                (socialSharingSettings.data.facebook.facebookPostSharingEnabled ||
                  socialSharingSettings.data.linkedIn.linkedInPostSharingEnabled ||
                  socialSharingSettings.data.twitter.twitterPostSharingEnabled) && (
                  <div className="mb-4">
                    <Card className="secondary">
                      <Card.Body>
                        <Card.Title>
                          <h3 className="mb-2">Share it:</h3>
                        </Card.Title>
                        <Location>
                          {locationProps => {
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
                  <MailingListSignupCard mailingList={mailingList} />
                </div>
                <div className="mb-4">
                  <RecentPostsWidget />
                </div>
                {!!mdxContent.data.frontmatter.sharing.sharingEnabled &&
                  (socialSharingSettings.data.facebook.facebookPostSharingEnabled ||
                    socialSharingSettings.data.linkedIn.linkedInPostSharingEnabled ||
                    socialSharingSettings.data.twitter.twitterPostSharingEnabled) && (
                    <div className="d-none d-md-block">
                      <h3 className="mb-2">Share it:</h3>
                      <Location>
                        {locationProps => {
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
        {!!discussionSettings.data.siteWideCommentsEnabled && !!mdxContent.data.frontmatter.options.discussionEnabled && (
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
        <MailingListSignupContainer mailingList={mailingList} />
        <Footer />
      </Wrapper>
    </>
  );
}
