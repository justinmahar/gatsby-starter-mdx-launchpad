import { Link } from 'gatsby';
import * as React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Settings, { useSettings } from '../../data/useSettings';

export interface HeaderProps {}

export default function Header(props: HeaderProps): JSX.Element {
  const settings: Settings = useSettings();
  return (
    <div style={{ paddingTop: '2em', paddingBottom: '2em', backgroundColor: '#eeeeee' }}>
      <Container>
        <Row>
          <Col>
            <div className="text-center">
              <div className="mt-6 mb-4">
                <strong>{settings.data.site.siteMetadata.siteName}</strong>
              </div>
              <div>
                <Link to="/">Home</Link> | <Link to="/about">About</Link> | <Link to="/contact">Contact</Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
