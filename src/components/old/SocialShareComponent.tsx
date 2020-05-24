import * as React from 'react';
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share';
import MdxContent from '../../../plugins/boldlypress-core/src/data/MdxContent';
import { TemplateTags } from '../../../plugins/boldlypress-core/src/data/TemplateTags';
import Settings, { useSettings } from '../../../plugins/boldlypress-core/src/data/useSettings';

const ICON_SIZE = 32;

const divStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  alignContent: 'flex-start',
};
const buttonStyles: React.CSSProperties = {
  cursor: 'pointer',
};

export interface SocialShareComponentProps {
  url: string;
  mdxContent: MdxContent;
  templateTags: TemplateTags;
  className?: any;
  styles?: any;
}

export default function SocialShareComponent(props: SocialShareComponentProps): JSX.Element {
  const settings: Settings = useSettings();

  const mdxContent: MdxContent = props.mdxContent;

  const facebookQuote =
    mdxContent.data.frontmatter.sharing.facebookQuote !== 'none'
      ? props.templateTags.render(mdxContent.data.frontmatter.sharing.facebookQuote)
      : undefined;
  const facebookHashtag =
    mdxContent.data.frontmatter.sharing.facebookHashtag !== 'none'
      ? mdxContent.data.frontmatter.sharing.facebookHashtag.startsWith('#')
        ? mdxContent.data.frontmatter.sharing.facebookHashtag
        : '#' + mdxContent.data.frontmatter.sharing.facebookHashtag
      : undefined;
  const twitterTitle =
    mdxContent.data.frontmatter.sharing.twitterTitle !== 'none'
      ? props.templateTags.render(mdxContent.data.frontmatter.sharing.twitterTitle)
      : undefined;
  const twitterVia = props.templateTags.render(mdxContent.data.frontmatter.sharing.twitterVia);
  // Create an array of twitter hashtags
  const twitterHashtags =
    mdxContent.data.frontmatter.sharing.twitterHashtags !== 'none'
      ? mdxContent.data.frontmatter.sharing.twitterHashtags
          .split(/\s+/)
          .filter((hashtag: string) => hashtag.length > 0)
          .map((hashtag: string) => (hashtag.startsWith('#') ? hashtag : '#' + hashtag))
      : undefined;

  return (
    <div className={props.className} style={{ ...divStyles, ...props.styles }}>
      {settings.data.socialSharingYaml.sharing.facebookPostSharingEnabled && (
        <FacebookShareButton
          className="mr-2"
          url={props.url}
          style={buttonStyles}
          quote={facebookQuote}
          hashtag={facebookHashtag}
        >
          <FacebookIcon size={ICON_SIZE} round />
        </FacebookShareButton>
      )}
      {settings.data.socialSharingYaml.sharing.linkedInPostSharingEnabled && (
        <LinkedinShareButton className="mr-2" url={props.url} style={buttonStyles}>
          <LinkedinIcon size={ICON_SIZE} round />
        </LinkedinShareButton>
      )}
      {settings.data.socialSharingYaml.sharing.twitterPostSharingEnabled && (
        <TwitterShareButton
          url={props.url}
          style={buttonStyles}
          title={twitterTitle}
          via={twitterVia !== 'none' ? (twitterVia.startsWith('@') ? twitterVia.slice(1) : twitterVia) : undefined}
          hashtags={twitterHashtags}
        >
          <TwitterIcon size={ICON_SIZE} round />
        </TwitterShareButton>
      )}
    </div>
  );
}
