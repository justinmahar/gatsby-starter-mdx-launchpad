import * as React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const DEFAULT_COVER_OPACITY = 0.55;

export interface ImageHeaderContainerProps {
  title: string;
  featuredImage: string;
  coverOpacity: number;
}

export default function ImageHeaderContainer(props: ImageHeaderContainerProps): JSX.Element {
  const containerStyles = {
    paddingTop: '6rem',
    paddingBottom: '6rem',
    borderBottom: 'solid 0.3rem #666666',
    borderTop: 'solid 0.1rem #666666',
    background: `linear-gradient(
          rgba(0, 0, 0, ${props.coverOpacity}), 
          rgba(0, 0, 0, ${props.coverOpacity})
        ), url('${props.featuredImage}') no-repeat center center /cover`,
  };

  return (
    <Container fluid style={containerStyles} className="primary section">
      <Row>
        <Col md={{ span: 6, offset: 3 }} style={{ textAlign: 'center', color: 'white' }}>
          <div>
            <h1
              className="text-uppercase"
              style={{
                fontSize: '3.5rem',
                color: 'white',
                textDecoration: 'none',
              }}
            >
              {props.title}
            </h1>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

ImageHeaderContainer.defaultProps = {
  coverOpacity: DEFAULT_COVER_OPACITY,
};
