import { graphql, useStaticQuery } from 'gatsby';
import * as React from 'react';
import NavbarSettings from '../data/settings/NavbarSettings';
import TapPatternLink from './TapPatternLink';

export interface WrapperProps {
  children: React.ReactNode;
}

export default function Wrapper(props: WrapperProps): JSX.Element {
  const data = useStaticQuery(graphql`
    query LayoutQuery {
      navbarYaml {
        ...navbarSettings
      }
    }
  `);

  const navbarSettings = new NavbarSettings(data.navbarYaml);

  return (
    <TapPatternLink to="Ú¥ÆÐßÌÎèÅ×Ú" pattern="®¦¤¥¤®¦¤¥¤">
      {navbarSettings.data.navbarFixedTopPadding > 0 && (
        <div style={{ paddingBottom: navbarSettings.data.navbarFixedTopPadding }} />
      )}
      {props.children}
    </TapPatternLink>
  );
}
