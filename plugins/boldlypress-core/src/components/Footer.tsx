import { graphql, Link, useStaticQuery } from 'gatsby';
import * as React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import MenuSettings from '../data/settings/MenuSettings';
import SocialSharingSettings from '../data/settings/SocialSharingSettings';
import BuildStatusBadge from './configured/BuildStatusBadge';
import SocialConnectComponent from './SocialConnectComponent';

export default function Footer(props: {}): JSX.Element {
  const data = useStaticQuery(graphql`
    query FooterMenuQuery {
      menuYaml {
        ...menuSettings
      }
      socialSharingYaml {
        ...socialSharingSettings
      }
    }
  `);

  const menuSettings: MenuSettings = new MenuSettings(data.menuYaml);
  const socialSharingSettings: SocialSharingSettings = new SocialSharingSettings(data.socialSharingYaml);

  const footerMenuElements: JSX.Element[] = menuSettings.data.footerMenus.map((footerMenu, menuIndex) => {
    const menuKey = 'footer-menu-' + menuIndex;
    const menuItemElements: JSX.Element[] = footerMenu.menuItems.map((menuItem, menuItemIndex) => {
      let linkElement = <span>Error!</span>;
      if (!menuItem.external) {
        linkElement = (
          <Link to={menuItem.link} className={menuItem.class !== 'none' ? menuItem.class : undefined}>
            {menuItem.name}
          </Link>
        );
      } else {
        linkElement = (
          <a href={menuItem.link} className={menuItem.class !== 'none' ? menuItem.class : undefined}>
            {menuItem.name}
          </a>
        );
      }

      return <li key={'footer-menu-' + menuIndex + '-item-' + menuItemIndex}>{linkElement}</li>;
    });

    return (
      <div key={menuKey} className="m-2">
        <h5>{footerMenu.name}</h5>
        <ul className="list-unstyled">{menuItemElements}</ul>
      </div>
    );
  });

  const Divider = () => <span className="mx-3" />;

  const legalMenuElements: JSX.Element[] = menuSettings.data.footerLegalMenuItems.map((menuItem, index: number) => {
    let linkElement = <span>Error!</span>;
    if (!menuItem.external) {
      linkElement = (
        <Link
          to={menuItem.link}
          className={`text-muted text-nowrap ${menuItem.class !== 'none' ? menuItem.class : undefined}`}
        >
          {menuItem.name}
        </Link>
      );
    } else {
      linkElement = (
        <a
          href={menuItem.link}
          className={`text-muted text-nowrap ${menuItem.class !== 'none' ? menuItem.class : undefined}`}
        >
          {menuItem.name}
        </a>
      );
    }
    return (
      <span key={'footer-menu-item-' + index}>
        {linkElement}
        {index < menuSettings.data.footerLegalMenuItems.length - 1 && <Divider />}
      </span>
    );
  });

  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <div className="py-5">
      <Container>
        <div className="d-flex flex-wrap justify-content-around">
          {footerMenuElements}
          {(socialSharingSettings.data.facebook.connectViaFacebookEnabled ||
            socialSharingSettings.data.twitter.connectViaTwitterEnabled ||
            socialSharingSettings.data.email.connectViaEmailEnabled) && (
            <div className="m-2">
              <h5>Connect</h5>
              <div>
                <SocialConnectComponent />
              </div>
            </div>
          )}
          {isDevelopment && (
            <div className="m-2">
              <h5>Development Links</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="/admin/" target="_new">
                    NetlifyCMS
                  </a>
                </li>
                <li>
                  <Link to="/this-page-doesnt-exist">Dev 404 Page</Link>
                </li>
                <li>
                  <a href="/___graphql" target="_new">
                    GraphiQL
                  </a>
                </li>
                <li>
                  <a href="https://analytics.google.com" target="_new">
                    Analytics
                  </a>
                </li>
                <li>
                  <BuildStatusBadge />
                </li>
                <li className="text-muted">
                  <small>These links are only visible in a development environment.</small>
                </li>
              </ul>
            </div>
          )}
        </div>
        <Row className="mt-2">
          <Col md={{ span: 5 }}>
            <p className="text-muted text-center">Copyright &copy; {new Date().getFullYear()}. All rights reserved.</p>
          </Col>
          <Col md={{ span: 5, offset: 2 }}>
            <div className="text-muted text-center">{legalMenuElements}</div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
