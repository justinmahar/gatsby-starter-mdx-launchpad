import { Link } from 'gatsby';
import React from 'react';
import { Container, Nav, Navbar, NavLink } from 'react-bootstrap';
import Settings, { useSettings } from '../../settings/useSettings';

export interface HeaderProps {}

export default function Header(_props: HeaderProps): JSX.Element {
  const settings: Settings = useSettings();
  return (
    <Navbar expand="lg" sticky="top" bg="light" className="shadow-sm">
      <Container>
        <Link to="/" className={'navbar-brand'}>
          <div className="d-flex flex-row">
            <div className="d-flex align-items-center mr-2">
              <img
                src={settings.data.site.siteMetadata.siteIcon}
                alt={settings.data.site.siteMetadata.siteIconAlt}
                width={30}
                height={30}
                className="d-inline-block align-top"
              />
            </div>
            <div>{settings.data.site.siteMetadata.siteName}</div>
          </div>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Nav>
            <NavLink>
              <Link to="/about">About</Link>
            </NavLink>
          </Nav>
          <Nav>
            <NavLink>
              <Link to="/contact">Contact</Link>
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
