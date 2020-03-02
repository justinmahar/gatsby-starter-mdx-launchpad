import { Location } from '@reach/router';
import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import FeaturedPostContainer from '../../../components/FeaturedPostContainer';
import Footer from '../../../components/Footer';
import MailingListSignupCard from '../../../components/MailingListSignupCard';
import MailingListSignupContainer from '../../../components/MailingListSignupContainer';
import PostCard from '../../../components/PostCard';
import SocialShareComponent from '../../../components/SocialShareComponent';
import TopBar from '../../../components/TopBar';
import Wrapper from '../../../components/Wrapper';
import MdxContent from '../../../data/MdxContent';
import DiscussionSettings from '../../../data/settings/DiscussionSettings';
import MailingListSettings from '../../../data/settings/MailingListSettings';
import PostSettings from '../../../data/settings/PostSettings';
import SiteSeoSettings from '../../../data/settings/SiteSeoSettings';
import SocialSharingSettings from '../../../data/settings/SocialSharingSettings';
import SiteMetadata from '../../../data/SiteMetadata';
import useMailingList from '../../../hooks/useMailingList';
import MdxSEO from '../../configured/MdxSEO';
import { LayoutProps } from '../getLayout';
import FormSettings, { FormInfo } from '../../../data/settings/FormSettings';

export default function BlogIndexLayout(props: LayoutProps): JSX.Element {
  const data = useStaticQuery(graphql`
    query BlogIndexLayoutQuery {
      allMdxPosts: allMdx(filter: { frontmatter: { group: { eq: "posts" } } }) {
        nodes {
          ...mdxContent
        }
      }
      site {
        siteMetadata {
          ...siteMetadataCommons
        }
      }
      formsYaml {
        ...formSettings
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
  const formSettings = new FormSettings(data.formsYaml);
  const siteSeoSettings = new SiteSeoSettings(data.seoYaml);
  const mailingListSettings = new MailingListSettings(data.mailingListYaml);
  const postSettings = new PostSettings(data.postYaml);
  const discussionSettings = new DiscussionSettings(data.discussionYaml);
  const socialSharingSettings: SocialSharingSettings = new SocialSharingSettings(data.socialSharingYaml);

  const mailingListFormInfo: FormInfo = formSettings.data.forms.find((formInfo: FormInfo) => {
    return formInfo.formId === mailingListSettings.data.mailingListFormId;
  });

  const mailingListFormId: string = mailingListFormInfo ? mailingListFormInfo.formId : 'undefined';
  const mailingListFormAsyncEnabled: boolean = mailingListFormInfo ? mailingListFormInfo.formAsyncEnabled : true;
  const mailingListFormAsyncRequestMode: RequestMode = mailingListFormInfo
    ? mailingListFormInfo.formAsyncRequestMode
    : 'cors';

  const mailingList = useMailingList(mailingListFormId, mailingListFormAsyncEnabled, {
    mode: mailingListFormAsyncRequestMode,
  });

  const indexPagePostCount = postSettings.data.indexPagePostCount;
  const allPostsListSlug = postSettings.data.allPostsListSlug;
  const postCategoryListSlug = postSettings.data.postCategoryListSlug;
  const featuredPostEnabled: boolean = postSettings.data.featuredPost.featuredPostEnabled;
  const featuredPostSlug: string = postSettings.data.featuredPost.featuredPostSlug;

  const posts: MdxContent[] = data.allMdxPosts.nodes
    .map(node => new MdxContent(node))
    .filter((post: MdxContent) => !post.data.frontmatter.options.hidden);

  const postElements: JSX.Element[] = posts.slice(0, indexPagePostCount).map((post: MdxContent, index: number) => {
    return (
      <PostCard
        key={'post-card-' + index}
        post={post}
        postCategoryListSlug={postCategoryListSlug}
        showCommentCount={discussionSettings.data.siteWideCommentsEnabled}
      />
    );
  });

  // Locate the featured post, if that feature is enabled.
  let featuredPost: MdxContent = null;
  if (featuredPostEnabled) {
    if (postSettings.data.featuredPost.featureNewestPostEnabled) {
      featuredPost = posts[0];
    } else {
      // Find the post that has the same slug as the featured post.
      const featuredPosts = posts.filter((post: MdxContent) => post.data.frontmatter.rawSlug === featuredPostSlug);
      if (featuredPosts.length > 0) {
        featuredPost = featuredPosts[0];
      } else {
        console.error('Featured MDX post not found:', featuredPostSlug);
      }
    }
  }

  const templateTags = {
    ...siteMetadata.getTemplateTags(),
    ...socialSharingSettings.getTemplateTags(),
    ...siteSeoSettings.getTemplateTagsFor(mdxContent.data.frontmatter.seoSettings.seoConfigurationId),
    ...mdxContent.getTemplateTags(),
  };

  return (
    <Wrapper>
      <MdxSEO mdxContent={mdxContent} templateTags={templateTags} />

      {/* Only show the featured post if that feature is enabled */}
      {!!featuredPost && (
        <FeaturedPostContainer
          featuredPost={featuredPost}
          contentCueText={postSettings.data.featuredPost.contentCueText}
          titleText={
            postSettings.data.featuredPost.customTitleText !== 'none'
              ? postSettings.data.featuredPost.customTitleText
              : featuredPost.data.frontmatter.title
          }
          teaserText={
            postSettings.data.featuredPost.customTeaser !== 'none'
              ? postSettings.data.featuredPost.customTeaser
              : featuredPost.getExcerpt()
          }
          buttonText={postSettings.data.featuredPost.buttonText}
          leftQuote={postSettings.data.featuredPost.leftQuote}
          rightQuote={postSettings.data.featuredPost.rightQuote}
          featuredImageUrl={
            featuredPost.data.frontmatter.featuredImage.featuredImageEnabled
              ? featuredPost.data.frontmatter.featuredImage.featuredImageUrl
              : siteMetadata.data.siteImage
          }
        />
      )}
      <TopBar />

      <Container className="mt-5 mb-4">
        <Row>
          <Col xs={12} md={8}>
            {postElements}
            <div className="d-flex justify-content-center align-items-center my-4">
              <Link to={`/${allPostsListSlug}`}>
                <Button variant="secondary" size="sm">
                  Browse All Posts &rarr;
                </Button>
              </Link>
            </div>
          </Col>
          <Col xs={12} md={4}>
            <div className="d-none d-md-block">
              <MailingListSignupCard mailingList={mailingList} />
            </div>
            {socialSharingSettings.data.shareHomePageEnabled &&
              (socialSharingSettings.data.facebook.facebookPostSharingEnabled ||
                socialSharingSettings.data.linkedIn.linkedInPostSharingEnabled ||
                socialSharingSettings.data.twitter.twitterPostSharingEnabled) && (
                <div className="mt-4">
                  <h4 className="mb-2">Share {siteMetadata.data.siteName} with your friends:</h4>
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
        </Row>
      </Container>
      <MailingListSignupContainer mailingList={mailingList} formId="mailing-list" />
      <Footer />
    </Wrapper>
  );
}
