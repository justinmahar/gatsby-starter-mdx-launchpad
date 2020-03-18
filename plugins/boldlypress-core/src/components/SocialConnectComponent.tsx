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

  const socialIconElements: JSX.Element[] = socialSharingSettings.data.socialAccounts
    .filter(socialAccount => socialAccount.enabled)
    .map(socialAccount => {
      const key = `${socialAccount.name}-account`;
      if (socialAccount.link.endsWith('/contact')) {
        return (
          <Link to={socialAccount.link} className="mr-2 mb-2" key={key}>
            <EmailIcon size={ICON_SIZE} round />
          </Link>
        );
      } else {
        return (
          <SocialIcon
            url={socialAccount.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{ width: ICON_SIZE - 1, height: ICON_SIZE - 1 }}
            className="mr-2 mb-2"
            key={key}
          />
        );
      }
    });

  return (
    <div className={props.className} style={{ ...divStyles, ...props.styles }}>
      {socialIconElements}
    </div>
  );
}
