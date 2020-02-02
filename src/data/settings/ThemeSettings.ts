import { graphql } from 'gatsby';

/**
  This fragment will be available globally using [Gatsby's GraphQL API](https://www.gatsbyjs.org/docs/graphql-reference/#fragments).
  
  To use: 
  ```graphql
    themeYaml {
      ...themeSettings
    }
  ```
*/
export const themeYamlQuery = graphql`
  fragment themeSettings on ThemeYaml {
    navbarColorScheme
    navbarBackgroundColor
    bootswatchSettings {
      bootswatchThemeCDNLocation
      bootswatchThemeFilename
      bootswatchThemeName
      useBootswatchTheme
    }
  }
`;
// ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑
// Important: The shapes of the query above and the type below must match!
// ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓

export type ThemeSettingsData = {
  navbarColorScheme: ThemeSettingsNavbarColorScheme;
  navbarBackgroundColor: ThemeSettingsNavbarBackgroundColor;
  bootswatchSettings: {
    bootswatchThemeCDNLocation: string;
    bootswatchThemeFilename: string;
    bootswatchThemeName: ThemeSettingsBootswatchThemeName;
    useBootswatchTheme: boolean;
  };
};

export type ThemeSettingsNavbarColorScheme = 'light' | 'dark';
export type ThemeSettingsNavbarBackgroundColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark'
  | 'muted'
  | 'white';
export type ThemeSettingsBootswatchThemeName =
  | 'cerulean'
  | 'cosmo'
  | 'cyborg'
  | 'darkly'
  | 'flatly'
  | 'journal'
  | 'litera'
  | 'lumen'
  | 'lux'
  | 'materia'
  | 'minty'
  | 'pulse'
  | 'sandstone'
  | 'simplex'
  | 'sketchy'
  | 'slate'
  | 'solar'
  | 'spacelab'
  | 'superhero'
  | 'united'
  | 'yeti';

// === === === === === === === === ===

export default class ThemeSettings {
  constructor(public data: ThemeSettingsData) {
    const bootswatchThemeCDNLocation: string = this.data.bootswatchSettings.bootswatchThemeCDNLocation;
    // Ensure it always ends with a slash.
    this.data.bootswatchSettings.bootswatchThemeCDNLocation = bootswatchThemeCDNLocation.endsWith('/')
      ? bootswatchThemeCDNLocation
      : bootswatchThemeCDNLocation + '/';
  }
}
