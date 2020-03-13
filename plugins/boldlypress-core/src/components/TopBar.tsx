import { graphql, Link, useStaticQuery } from 'gatsby';
import * as React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import MenuSettings from '../data/settings/MenuSettings';
import NavbarSettings from '../data/settings/NavbarSettings';
import ThemeSettings from '../data/settings/ThemeSettings';
import SiteMetadata from '../data/SiteMetadata';
import renderTemplateTags from '../util/render-template-tags';

export default function TopBar(props: {}): JSX.Element {
  const data = useStaticQuery(graphql`
    query TopBarMenuQuery {
      menuYaml {
        ...menuSettings
      }
      themeYaml {
        ...themeSettings
      }
      navbarYaml {
        ...navbarSettings
      }
      site {
        siteMetadata {
          ...siteMetadataCommons
        }
      }
    }
  `);

  const siteMetadata = new SiteMetadata(data.site.siteMetadata);
  const menuSettings: MenuSettings = new MenuSettings(data.menuYaml);
  const themeSettings = new ThemeSettings(data.themeYaml);
  const navbarSettings = new NavbarSettings(data.navbarYaml);

  const templateTags: { [x: string]: string } = {
    ...siteMetadata.getTemplateTags(),
  };

  const navbarLogoText = renderTemplateTags(navbarSettings.data.navbarLogo.navbarLogoText, templateTags);
  const navbarLogoDescriptionText = renderTemplateTags(
    navbarSettings.data.navbarLogo.navbarLogoDescriptionText,
    templateTags
  );

  const topLevelMenus = menuSettings.data.navbarMenus.filter(menu => {
    return menu.parentMenuItemName === 'none';
  });
  const subMenus = menuSettings.data.navbarMenus.filter(menu => {
    return menu.parentMenuItemName !== 'none';
  });

  const menuElements: JSX.Element[] = [];

  let hasSubmenus = false;

  topLevelMenus.forEach(menu => {
    menu.menuItems.forEach((menuItem, menuItemIndex) => {
      const menuItemName: string = menuItem.name;
      const link: string = menuItem.link;
      const className: string = menuItem.class;
      const menuItemKey: string = 'menu-item-' + menuItemIndex;
      const subMenuList = subMenus.filter(subMenu => {
        return subMenu.parentMenuItemName === menuItemName;
      });
      if (subMenuList.length === 0) {
        let menuElement = <span>Error</span>;
        if (!menuItem.external) {
          menuElement = (
            <Link to={link} className={`nav-link${className !== 'none' ? ' ' + className : ''}`} key={menuItemKey}>
              {menuItemName}
            </Link>
          );
        } else {
          const newWindowAttributes = menuItem.openInNewWindow
            ? {
                target: '_blank',
                rel: 'noopener noreferrer',
              }
            : {};
          menuElement = (
            <Nav.Link
              href={link}
              className={`${className !== 'none' ? className : ''}`}
              key={menuItemKey}
              {...newWindowAttributes}
            >
              {menuItemName}
            </Nav.Link>
          );
        }
        menuElements.push(menuElement);
      } else {
        hasSubmenus = true;
        const dropdownChildren: JSX.Element[] = [];
        subMenuList.forEach(subMenu => {
          subMenu.menuItems.forEach((subMenuItem, subMenuItemIndex) => {
            const subMenuItemKey = 'nav-dropdown-item-' + subMenuItemIndex;
            if (subMenuItem.name.startsWith('---')) {
              dropdownChildren.push(<NavDropdown.Divider key={subMenuItemKey} />);
            } else {
              let dropdownItem = <span>Error</span>;
              if (!subMenuItem.external) {
                dropdownItem = (
                  <Link
                    to={subMenuItem.link}
                    key={subMenuItemKey}
                    className={`dropdown-item${subMenuItem.class !== 'none' ? ' ' + subMenuItem.class : ''}`}
                  >
                    {subMenuItem.name}
                  </Link>
                );
              } else {
                const newWindowAttributes = menuItem.openInNewWindow
                  ? {
                      target: '_blank',
                      rel: 'noopener noreferrer',
                    }
                  : {};
                dropdownItem = (
                  <NavDropdown.Item
                    href={subMenuItem.link}
                    key={subMenuItemKey}
                    className={`${subMenuItem.class !== 'none' ? subMenuItem.class : ''}`}
                    {...newWindowAttributes}
                  >
                    {subMenuItem.name}
                  </NavDropdown.Item>
                );
              }
              dropdownChildren.push(dropdownItem);
            }
          });
        });
        const menuElement = (
          <NavDropdown title={menuItemName} id="nav-dropdown" key={menuItemKey}>
            {dropdownChildren}
          </NavDropdown>
        );

        menuElements.push(menuElement);
      }
    });
  });

  let navbarFixed = undefined;
  let navbarSticky = undefined;
  switch (navbarSettings.data.navbarPlacement) {
    case 'fixed-top':
      navbarFixed = 'top';
      break;
    case 'fixed-bottom':
      navbarFixed = 'bottom';
      break;
    case 'sticky-top':
      navbarSticky = 'top';
      break;
    case 'sticky-bottom':
      navbarSticky = 'bottom';
      break;
    default:
  }

  const shadowStyleTop: React.CSSProperties = {
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.17)',
  };
  const shadowStyleBottom: React.CSSProperties = {
    boxShadow: '0 -3px 6px rgba(0, 0, 0, 0.17)',
  };
  let shadowStyle: React.CSSProperties = shadowStyleTop;
  if (
    navbarSettings.data.navbarPlacement === 'sticky-bottom' ||
    navbarSettings.data.navbarPlacement === 'fixed-bottom'
  ) {
    shadowStyle = shadowStyleBottom;
  }

  const [isNavbarAtTop, setIsNavbarAtTop] = React.useState(false);
  const [currentWindowScrollY, setCurrentWindowScrollY] = React.useState(0);
  const [navbarStartingY, setNavbarStartingY] = React.useState(0);
  const [navbarDescriptionHidden, setNavbarDescriptionHidden] = React.useState(false);

  // For some reason, React Bootstrap's Navbar ref always has a null current
  // value. So here we're creating an element ID based on the time and a random string.
  const navbarElementId =
    '_navbar_' +
    Date.now().toString(36) +
    Math.random()
      .toString(36)
      .substr(2, 9);

  // This handler will be called whenever the page scrolls and the setting
  // for the navbar drop shadow is "at-top" or "just-beyond"
  const handleScroll = (navbarElement: HTMLElement | null) => {
    if (navbarElement) {
      const navbarTop = navbarElement.getBoundingClientRect().top;
      setIsNavbarAtTop(navbarTop <= 0);
      if (navbarTop > navbarStartingY) {
        setNavbarStartingY(navbarTop);
      }

      // Hide navbar description
      if (navbarSettings.data.navbarLogo.navbarHideDescriptionWhenScrolling) {
        const overlap = 80;
        // Description is showing
        if (!navbarDescriptionHidden) {
          let shouldHide = false;
          if (navbarSettings.data.navbarPlacement === 'sticky-top') {
            shouldHide = currentWindowScrollY > navbarStartingY + overlap;
          } else if (navbarSettings.data.navbarPlacement !== 'default') {
            shouldHide = currentWindowScrollY > overlap;
          }
          setNavbarDescriptionHidden(shouldHide);
        } else {
          // Description is hidden
          let shouldShow = false;
          if (navbarSettings.data.navbarPlacement === 'sticky-top') {
            shouldShow = currentWindowScrollY <= Math.max(0, navbarStartingY - overlap);
          } else if (navbarSettings.data.navbarPlacement !== 'default') {
            shouldShow = currentWindowScrollY <= 0;
          }

          setNavbarDescriptionHidden(!shouldShow);
        }
      }
    }
    setCurrentWindowScrollY(window.scrollY);
  };

  const scrollHandlerEnabled: boolean =
    navbarSettings.data.navbarDropShadow === 'at-top' ||
    navbarSettings.data.navbarDropShadow === 'just-beyond' ||
    navbarSettings.data.navbarLogo.navbarHideDescriptionWhenScrolling;
  const isScrolledJustBeyondNavbar = currentWindowScrollY > 0 && isNavbarAtTop;
  const showShadow =
    navbarSettings.data.navbarDropShadow === 'always' ||
    (navbarSettings.data.navbarDropShadow === 'at-top' && isNavbarAtTop) ||
    (navbarSettings.data.navbarDropShadow === 'just-beyond' && isScrolledJustBeyondNavbar);

  const effectHandlerVariables: any[] = [isNavbarAtTop, currentWindowScrollY, navbarStartingY, navbarDescriptionHidden];

  useScrollHandlerEffectOn(navbarElementId, scrollHandlerEnabled, effectHandlerVariables, handleScroll);

  // When the menu is at the bottom and has submenus, bootstrap
  // shows the menu off screen. In this case, force it to collapse.
  const forceCollapsedMenu =
    hasSubmenus &&
    (navbarSettings.data.navbarPlacement === 'fixed-bottom' || navbarSettings.data.navbarPlacement === 'sticky-bottom');

  React.useEffect(() => {
    // This is a hack to get rid of the expansion class on navbar. I couldn't find
    // a way around it, so we manually have to pluck out of the class names. :/
    const navbarElement = document.getElementById(navbarElementId) as HTMLElement;
    if (navbarElement && forceCollapsedMenu) {
      navbarElement.className = navbarElement.className.replace('navbar-expand', '');
    }
  }, [forceCollapsedMenu, navbarElementId]);

  const logoImage = navbarSettings.data.navbarLogo.navbarUseSiteIcon
    ? siteMetadata.data.siteIcon
    : navbarSettings.data.navbarLogo.navbarCustomLogoImage;
  const logoImageAlt = navbarSettings.data.navbarLogo.navbarUseSiteIcon
    ? siteMetadata.data.siteIconAlt !== 'none'
      ? siteMetadata.data.siteIconAlt
      : undefined
    : navbarSettings.data.navbarLogo.navbarCustomLogoImage !== 'none'
    ? navbarSettings.data.navbarLogo.navbarCustomLogoImage
    : undefined;

  return (
    <Navbar
      expand="lg"
      bg={
        themeSettings.data.navbarBackgroundColor === 'default'
          ? themeSettings.data.navbarColorScheme
          : themeSettings.data.navbarBackgroundColor
      }
      variant={themeSettings.data.navbarColorScheme}
      className="secondary"
      fixed={navbarFixed}
      sticky={navbarSticky}
      id={navbarElementId}
      style={showShadow ? shadowStyle : {}}
    >
      <Container>
        <Link to="/" className={'navbar-brand'}>
          <div
            className={
              'd-inline-flex align-items-center' +
              (navbarSettings.data.navbarLogo.navbarLogoOrderReversed ? ' flex-row-reverse' : '') +
              ' mt-2'
            }
            style={{ userSelect: 'none' }}
          >
            <div className="d-flex align-items-center">
              {!!navbarSettings.data.navbarLogo.navbarLogoImageEnabled && (
                <img
                  src={logoImage}
                  alt={logoImageAlt}
                  width={navbarSettings.data.navbarLogo.navbarLogoImageWidth}
                  height={navbarSettings.data.navbarLogo.navbarLogoImageHeight}
                  className="d-inline-block align-top"
                />
              )}
            </div>
            {!!navbarSettings.data.navbarLogo.navbarLogoImageEnabled &&
              !!navbarSettings.data.navbarLogo.navbarLogoTextEnabled && (
                <div style={{ width: navbarSettings.data.navbarLogo.navbarLogoGap }} />
              )}
            <div>
              {!!navbarSettings.data.navbarLogo.navbarLogoTextEnabled && (
                <span
                  dangerouslySetInnerHTML={{
                    __html: navbarLogoText,
                  }}
                />
              )}
            </div>
          </div>

          {!navbarDescriptionHidden && navbarSettings.data.navbarLogo.navbarLogoDescriptionEnabled && (
            <div
              className="mb-2 block d-none d-md-block"
              dangerouslySetInnerHTML={{
                __html: navbarLogoDescriptionText,
              }}
            />
          )}
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {navbarSettings.data.navbarLogo.navbarLogoDescriptionEnabled && (
            <div
              className="my-2 mr-2 block d-md-none"
              dangerouslySetInnerHTML={{
                __html: navbarLogoDescriptionText,
              }}
            />
          )}
          <Nav className="ml-auto">{menuElements}</Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

/**
 * Creates an effect that calls the provided scroll handler when the
 * window scrolls.
 *
 * The first argument should be the React
 * ref or a string element ID for the element. The second argument
 * should be set if the handler is to be enabled or not. The third
 * argument is a handler callback that is called with the
 * element that was found (or null if none was found). The handler
 * will be called immediately so you can perform init.
 */
function useScrollHandlerEffectOn(
  targetElementRefOrId: string | { current: any },
  scrollHandlerEnabled: boolean,
  effectHandlerVariables: any[],
  handleScroll: (element: HTMLElement | null) => void
) {
  const getElement = (): HTMLElement | null => {
    if (typeof targetElementRefOrId === 'string') {
      return document.getElementById(targetElementRefOrId) as HTMLElement;
    } else {
      return targetElementRefOrId.current;
    }
  };

  React.useEffect(() => {
    const windowScrollHandler = e => {
      handleScroll(getElement());
    };
    if (scrollHandlerEnabled) {
      window.addEventListener('scroll', windowScrollHandler);
      // Init call
      handleScroll(getElement());
    }

    return () => {
      // Clean up when the ref/id changes.
      window.removeEventListener('scroll', windowScrollHandler);
    };
  }, [targetElementRefOrId, scrollHandlerEnabled, handleScroll, getElement]);

  return;
}
