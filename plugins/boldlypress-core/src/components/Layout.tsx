import { graphql, useStaticQuery } from 'gatsby';
import * as React from 'react';
import Helmet from 'react-helmet';
import NavbarSettings from '../data/settings/NavbarSettings';
import ThemeSettings from '../data/settings/ThemeSettings';
import Footer from './Footer';

export interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout(props: LayoutProps): JSX.Element {
  // Theme Settings
  const data = useStaticQuery(graphql`
    query LayoutQuery {
      themeYaml {
        ...themeSettings
      }
      navbarYaml {
        ...navbarSettings
      }
    }
  `);
  const themeSettings = new ThemeSettings(data.themeYaml);
  let themeFileUrl = '';
  if (themeSettings.data.bootswatchSettings.useBootswatchTheme) {
    themeFileUrl =
      themeSettings.data.bootswatchSettings.bootswatchThemeCDNLocation +
      themeSettings.data.bootswatchSettings.bootswatchThemeName +
      '/' +
      themeSettings.data.bootswatchSettings.bootswatchThemeFilename;
  }
  // END Bootswatch Settings

  const navbarSettings = new NavbarSettings(data.navbarYaml);

  return (
    <>
      <Helmet>
        {themeSettings.data.bootswatchSettings.useBootswatchTheme && (
          <link rel="stylesheet" type="text/css" href={themeFileUrl} />
        )}
      </Helmet>
      {navbarSettings.data.navbarFixedTopPadding > 0 && (
        <div style={{ paddingBottom: navbarSettings.data.navbarFixedTopPadding }} />
      )}
      {props.children}
      <Footer />
    </>
  );
}
