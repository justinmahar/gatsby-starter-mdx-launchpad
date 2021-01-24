import { Link } from 'gatsby';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { TemplateTagRenderer } from '../../data/TemplateTagRenderer';
import Settings, { useSettings } from '../../data/useSettings';

export interface HeaderProps {}

export default function Header(props: HeaderProps): JSX.Element {
  const settings: Settings = useSettings();
  const templateTagRenderer: TemplateTagRenderer = settings.getTemplateTagRenderer();
  return (
    <div style={{ paddingTop: '2em', paddingBottom: '2em', backgroundColor: '#eeeeee' }}>
      <Container>
        <Row>
          <Col>
            <div className="text-center">
              <div className="mt-6 mb-4">
                <Link to="/">
                  <strong>{templateTagRenderer.render('{siteName}')}</strong>
                </Link>
              </div>
              <div className="d-flex flex-wrap justify-content-center">
                <div className="mx-4 my-2">
                  <Link to="/">Home</Link>
                </div>
                <div className="mx-4 my-2">
                  <Link to="/about">About</Link>
                </div>
                <div className="mx-4 my-2">
                  <Link to="/contact">Contact</Link>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
