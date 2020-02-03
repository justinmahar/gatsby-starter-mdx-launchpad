import { graphql, useStaticQuery } from 'gatsby';
import * as React from 'react';
import { FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, TwitterIcon, TwitterShareButton } from 'react-share';
import SocialSharingSettings from '../data/settings/SocialSharingSettings';

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
  facebookQuote?: string;
  facebookHashtag?: string;
  twitterTitle?: string;
  twitterVia?: string;
  twitterHashtags?: string[];
  className?: any;
  styles?: any;
}

export default function SocialShareComponent(props: SocialShareComponentProps): JSX.Element {
  const data = useStaticQuery(graphql`
    query SocialShareComponentQuery {
      socialSharingYaml {
        ...socialSharingSettings
      }
    }
  `);

  const socialSharingSettings: SocialSharingSettings = new SocialSharingSettings(data.socialSharingYaml);

  return (
    <div className={props.className} style={{ ...divStyles, ...props.styles }}>
      {socialSharingSettings.data.facebook.facebookPostSharingEnabled && (
        <FacebookShareButton
          className="mr-2"
          url={props.url}
          style={buttonStyles}
          quote={props.facebookQuote}
          hashtag={props.facebookHashtag}
        >
          <FacebookIcon size={ICON_SIZE} round />
        </FacebookShareButton>
      )}
      {socialSharingSettings.data.linkedIn.linkedInPostSharingEnabled && (
        <LinkedinShareButton className="mr-2" url={props.url} style={buttonStyles}>
          <LinkedinIcon size={ICON_SIZE} round />
        </LinkedinShareButton>
      )}
      {socialSharingSettings.data.twitter.twitterPostSharingEnabled && (
        <TwitterShareButton
          url={props.url}
          style={buttonStyles}
          title={props.twitterTitle}
          via={props.twitterVia.startsWith('@') ? props.twitterVia.slice(1) : props.twitterVia}
          hashtags={props.twitterHashtags}
        >
          <TwitterIcon size={ICON_SIZE} round />
        </TwitterShareButton>
      )}
    </div>
  );
}
