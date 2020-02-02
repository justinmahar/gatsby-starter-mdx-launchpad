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
      }
    }
    footerMenus {
      name
      menuItems {
        name
        link
        class
        external
      }
    }
    footerLegalMenuItems {
      name
      link
      class
      external
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
    }[];
  }[];
  footerMenus: {
    name: string;
    menuItems: {
      name: string;
      link: string;
      class: string;
      external: boolean;
    }[];
  }[];
  footerLegalMenuItems: {
    name: string;
    link: string;
    class: string;
    external: boolean;
  }[];
};

// === === === === === === === === ===

export default class MenuSettings {
  constructor(public data: MenuSettingsData) {}
}
