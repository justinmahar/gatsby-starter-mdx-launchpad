import { graphql, Link, useStaticQuery } from 'gatsby';
import * as React from 'react';
import { EmailIcon } from 'react-share';
import { SocialIcon } from 'react-social-icons';
import Settings, { useSettings } from '../data/useSettings';

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
  const settings: Settings = useSettings();

  const socialIconElements: JSX.Element[] = settings.data.socialSharingYaml.socialAccounts
    .filter((socialAccount) => socialAccount.enabled)
    .map((socialAccount) => {
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
