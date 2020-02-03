import { graphql } from 'gatsby';

/**
  This fragment will be available globally using [Gatsby's GraphQL API](https://www.gatsbyjs.org/docs/graphql-reference/#fragments).
  
  To use: 
  ```graphql
    navbarYaml {
      ...navbarSettings
    }
  ```
*/
export const navbarYamlQuery = graphql`
  fragment navbarSettings on NavbarYaml {
    navbarLogo {
      navbarCustomLogoImage
      navbarLogoDescriptionEnabled
      navbarLogoDescriptionText
      navbarLogoGap
      navbarLogoImageEnabled
      navbarLogoImageHeight
      navbarLogoImageWidth
      navbarLogoText
      navbarLogoTextEnabled
      navbarUseSiteIcon
      navbarHideDescriptionWhenScrolling
      navbarLogoOrderReversed
    }
    navbarPlacement
    navbarFixedTopPadding
    navbarDropShadow
  }
`;
// ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑
// Important: The shapes of the query above and the type below must match!
// ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓

export type NavbarSettingsData = {
  navbarLogo: {
    navbarCustomLogoImage: string;
    navbarLogoDescriptionEnabled: boolean;
    navbarLogoDescriptionText: string;
    navbarLogoGap: number;
    navbarLogoImageEnabled: boolean;
    navbarLogoImageHeight: number;
    navbarLogoImageWidth: number;
    navbarLogoText: string;
    navbarLogoTextEnabled: boolean;
    navbarUseSiteIcon: string;
    navbarHideDescriptionWhenScrolling: boolean;
    navbarLogoOrderReversed: boolean;
  };
  navbarPlacement: NavbarPlacement;
  navbarFixedTopPadding: number;
  navbarDropShadow: NavbarDropShadow;
};

export type NavbarPlacement = 'default' | 'fixed-top' | 'fixed-bottom' | 'sticky-top' | 'sticky-bottom';

export type NavbarDropShadow = 'none' | 'at-top' | 'just-beyond' | 'always';

// === === === === === === === === ===

export default class NavbarSettings {
  constructor(public data: NavbarSettingsData) {}
}
