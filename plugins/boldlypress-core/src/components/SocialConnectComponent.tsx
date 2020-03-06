import { graphql, useStaticQuery, Link } from 'gatsby';
import * as React from 'react';
import { EmailIcon, FacebookIcon, TwitterIcon } from 'react-share';
import SocialSharingSettings from '../data/settings/SocialSharingSettings';
import { SocialIcon } from 'react-social-icons';

const ICON_SIZE = 32;

const divStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  alignContent: 'flex-start',
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
      {!!socialSharingSettings.data.instagram.connectViaInstagramEnabled && (
        <SocialIcon
          url={socialSharingSettings.data.instagram.connectViaInstagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ width: ICON_SIZE - 1, height: ICON_SIZE - 1 }}
          className="mr-2 mb-2"
        />
      )}
      {!!socialSharingSettings.data.facebook.connectViaFacebookEnabled && (
        <a
          href={socialSharingSettings.data.facebook.connectViaFacebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mr-2 mb-2"
        >
          <FacebookIcon size={ICON_SIZE} round />
        </a>
      )}
      {!!socialSharingSettings.data.twitter.connectViaTwitterEnabled && (
        <a
          href={socialSharingSettings.data.twitter.connectViaTwitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mr-2 mb-2"
        >
          <TwitterIcon size={ICON_SIZE} round />
        </a>
      )}
      {!!socialSharingSettings.data.email.connectViaEmailEnabled && (
        <Link to={socialSharingSettings.data.email.connectViaEmailUrl} className="mr-2 mb-2">
          <EmailIcon size={ICON_SIZE} round />
        </Link>
      )}
    </div>
  );
}
