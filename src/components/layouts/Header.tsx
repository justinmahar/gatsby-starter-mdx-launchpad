import { Link } from 'gatsby';
import * as React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Settings, { useSettings } from '../../data/useSettings';

export interface HeaderProps {}

export default function Header(props: HeaderProps): JSX.Element {
  const settings: Settings = useSettings();
  return (
    <Container>
      <Row>
        <Col>
          <div>
            <div>
              <strong>{settings.data.site.siteMetadata.siteName}</strong>
            </div>
            <div>
              <Link to="/">Home</Link> | <Link to="/about">About</Link> | <Link to="/contact">Contact</Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
