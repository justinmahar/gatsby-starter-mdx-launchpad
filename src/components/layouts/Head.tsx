import { Location } from '@reach/router';
import * as React from 'react';
import { OpenGraphMetadata, SuperSEO, TwitterSummaryCardType } from 'react-super-seo';
import { TemplateTagRenderer } from '../../data/TemplateTagRenderer';
import Settings, { useSettings } from '../../data/useSettings';

export interface HeadProps {
  seo: {
    title: string;
    description?: string;
    imageUrl?: string;
    imageWidth?: number;
    imageHeight?: number;
    imageAlt?: string;
  };
  templateTagRenderer?: TemplateTagRenderer;
  children?: React.ReactNode;
}

export default function Head(props: HeadProps): JSX.Element {
  const settings: Settings = useSettings();
  const settingsTemplateTagRenderer = settings.getTemplateTagRenderer();
  const templateTagRenderer = props.templateTagRenderer
    ? settingsTemplateTagRenderer.combineWith(props.templateTagRenderer)
    : settingsTemplateTagRenderer;

  const lang = 'en';

  const seoTitle = templateTagRenderer.render(props.seo.title);
  const seoDescription = props.seo.description ? templateTagRenderer.render(props.seo.description) : undefined;
  let seoImageUrl = settings.data.site.siteMetadata.siteImage;
  let seoImageWidth = settings.data.site.siteMetadata.siteImageWidth;
  let seoImageHeight = settings.data.site.siteMetadata.siteImageHeight;
  let seoImageAlt: string | undefined =
    settings.data.site.siteMetadata.siteImageAlt !== 'none'
      ? templateTagRenderer.render(settings.data.site.siteMetadata.siteImageAlt)
      : undefined;

  if (props.seo.imageUrl && props.seo.imageUrl !== 'none' && props.seo.imageWidth && props.seo.imageHeight) {
    seoImageUrl = props.seo.imageUrl;
    seoImageWidth = props.seo.imageWidth;
    seoImageHeight = props.seo.imageHeight;
    seoImageAlt =
      props.seo.imageAlt && props.seo.imageAlt !== 'none'
        ? templateTagRenderer.render(props.seo.imageAlt)
        : undefined;
  }

  // If the twitter site username is none, set it to undefined.
  const twitterSiteUsername =
    settings.data.settingsYaml.twitterSiteUsername !== 'none'
      ? settings.data.settingsYaml.twitterSiteUsername
      : undefined;

  const openGraph: OpenGraphMetadata = {
    ogUrl: typeof window !== 'undefined' ? window.location.href : '',
    ogTitle: seoTitle,
    ogTypeObject: {},
    ogImage: {
      ogImage: seoImageUrl,
      ogImageAlt: seoImageAlt,
      ogImageWidth: seoImageWidth,
      ogImageHeight: seoImageHeight,
    },
    ogDescription: seoDescription,
    ogSiteName: settings.data.site.siteMetadata.siteName,
  };
  const twitterCard: TwitterSummaryCardType = {
    summaryCardSiteUsername: twitterSiteUsername,
    summaryCardTitle: seoTitle,
    summaryCardDescription: seoDescription,
    summaryCardImage: seoImageUrl,
    summaryCardImageAlt: seoImageAlt,
  };

  return (
    <SuperSEO
      title={seoTitle}
      description={seoDescription}
      lang={lang}
      openGraph={{
        ...openGraph,
      }}
      twitter={{
        twitterSummaryCard: twitterCard,
      }}
    >
      {props.children}
    </SuperSEO>
  );
}
