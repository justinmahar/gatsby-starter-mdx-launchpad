import { Link } from 'gatsby';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { TemplateTagRenderer } from '../../data/TemplateTagRenderer';
import Settings, { useSettings } from '../../data/useSettings';
import { BuildStatusBadge } from 'react-build-status-badge';

export interface FooterProps {}

export default function Footer(props: FooterProps): JSX.Element {
  const settings: Settings = useSettings();
  const templateTagRenderer: TemplateTagRenderer = settings.getTemplateTagRenderer();
  return (
    <div style={{ paddingTop: '8em', paddingBottom: '8em', backgroundColor: '#202020' }}>
      <Container>
        <Row>
          <Col>
            <div className="d-flex flex-column justify-content-center">
              <div className="text-center mt-6 mb-4" style={{ color: 'white' }}>
                Copyright &copy; {templateTagRenderer.render('{year}')}, {templateTagRenderer.render('{siteName}')}.
                All rights reserved. Logo by{' '}
                <a href="https://twemoji.twitter.com/" target="_blank" rel="noopener noreferrer">
                  Twemoji
                </a>
                .
              </div>
              <div className="d-flex justify-content-center">
                <div className="mx-4 my-2">
                  <Link className="heading" to="/terms">
                    Terms
                  </Link>
                </div>
                <div className="mx-4 my-2">
                  <Link className="heading" to="/privacy">
                    Privacy
                  </Link>
                </div>
                <div className="mx-4 my-2">
                  <a className="heading" href="/sitemap.xml">
                    Sitemap
                  </a>
                </div>
                <div className="mx-4 my-2">
                  <BuildStatusBadge>
                    [![Netlify
                    Status](https://api.netlify.com/api/v1/badges/ede63be4-6d43-4eb3-9a73-ee7adaaa7c4d/deploy-status)](https://app.netlify.com/sites/hustlebase/deploys)
                  </BuildStatusBadge>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
