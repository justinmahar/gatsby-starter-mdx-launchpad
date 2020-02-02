import { graphql, useStaticQuery } from 'gatsby';
import * as React from 'react';
import { EmailIcon, FacebookIcon, TwitterIcon } from 'react-share';
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

export interface SocialConnectComponentProps {
  className?: any;
  styles?: any;
}

export default function SocialConnectComponent(props: SocialConnectComponentProps): JSX.Element {
  const data = useStaticQuery(graphql`
    query SocialConnectComponentQuery {
      socialSharingYaml {
        ...socialSharingSettings
      }
    }
  `);

  const socialSharingSettings: SocialSharingSettings = new SocialSharingSettings(data.socialSharingYaml);

  return (
    <div className={props.className} style={{ ...divStyles, ...props.styles }}>
      {!!socialSharingSettings.data.facebook.connectViaFacebookEnabled && (
        <a href={socialSharingSettings.data.facebook.connectViaFacebookUrl} className="mr-2 mb-2">
          <FacebookIcon size={ICON_SIZE} round />
        </a>
      )}
      {!!socialSharingSettings.data.twitter.connectViaTwitterEnabled && (
        <a href={socialSharingSettings.data.twitter.connectViaTwitterUrl} className="mr-2 mb-2">
          <TwitterIcon size={ICON_SIZE} round />
        </a>
      )}
      {!!socialSharingSettings.data.email.connectViaEmailEnabled && (
        <a href={socialSharingSettings.data.email.connectViaEmailUrl} className="mr-2 mb-2">
          <EmailIcon size={ICON_SIZE} round />
        </a>
      )}
    </div>
  );
}
