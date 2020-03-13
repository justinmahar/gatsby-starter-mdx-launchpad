import { graphql } from 'gatsby';

/**
  This fragment will be available globally using [Gatsby's GraphQL API](https://www.gatsbyjs.org/docs/graphql-reference/#fragments).
  
  To use: 
  ```graphql
    menuYaml {
      ...menuSettings
    }
  ```
*/
export const menuYamlQuery = graphql`
  fragment menuSettings on MenuYaml {
    navbarMenus {
      parentMenuItemName
      name
      menuItems {
        name
        link
        class
        external
        openInNewWindow
      }
    }
    footerMenus {
      name
      menuItems {
        name
        link
        class
        external
        openInNewWindow
      }
    }
    footerLegalMenuItems {
      name
      link
      class
      external
      openInNewWindow
    }
  }
`;
// ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑
// Important: The shapes of the query above and the type below must match!
// ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓

export type MenuSettingsData = {
  navbarMenus: {
    parentMenuItemName: string;
    name: string;
    menuItems: {
      name: string;
      link: string;
      class: string;
      external: boolean;
      openInNewWindow: boolean;
    }[];
  }[];
  footerMenus: {
    name: string;
    menuItems: {
      name: string;
      link: string;
      class: string;
      external: boolean;
      openInNewWindow: boolean;
    }[];
  }[];
  footerLegalMenuItems: {
    name: string;
    link: string;
    class: string;
    external: boolean;
    openInNewWindow: boolean;
  }[];
};

// === === === === === === === === ===

export default class MenuSettings {
  constructor(public data: MenuSettingsData) {}
}
