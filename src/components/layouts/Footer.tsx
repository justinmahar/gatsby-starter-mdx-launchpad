import { Link } from 'gatsby';
import * as React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Settings, { useSettings } from '../../data/useSettings';

export interface FooterProps {}

export default function Footer(props: FooterProps): JSX.Element {
  const settings: Settings = useSettings();
  return (
    <div style={{ paddingTop: '8em', paddingBottom: '8em', backgroundColor: '#202020' }}>
      <Container>
        <Row>
          <Col>
            <div className="d-flex flex-column justify-content-center">
              <div className="text-center mt-6 mb-4" style={{ color: 'white' }}>
                Copyright &copy; {new Date().getFullYear()}, {settings.data.site.siteMetadata.siteName}. All rights
                reserved. Logo by{' '}
                <a href="https://twemoji.twitter.com/" target="_blank" rel="noopener noreferrer">
                  Twemoji
                </a>
                .
              </div>
              <div className="d-flex justify-content-center">
                <div className="mx-4">
                  <Link className="heading" to="/terms">
                    Terms
                  </Link>
                </div>
                <div className="mx-4">
                  <Link className="heading" to="/privacy">
                    Privacy
                  </Link>
                </div>
                <div className="mx-4">
                  <a className="heading" href="/sitemap.xml">
                    Sitemap
                  </a>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
