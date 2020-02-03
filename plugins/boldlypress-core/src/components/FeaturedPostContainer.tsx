import { Link } from 'gatsby';
import * as React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import MdxContent from '../data/MdxContent';

export interface FeaturedPostContainerProps {
  featuredPost: MdxContent;
  contentCueText: string;
  titleText: string;
  teaserText: string;
  buttonText: string;
  leftQuote: string;
  rightQuote: string;
  featuredImageUrl: string;
}

export default function FeaturedPostContainer(props: FeaturedPostContainerProps): JSX.Element {
  const featuredPost: MdxContent = props.featuredPost;

  const containerStyles = {
    paddingTop: '6rem',
    paddingBottom: '4rem',
    borderBottom: 'solid 0.3rem #666666',
    borderTop: 'solid 0.1rem #666666',
    background: `linear-gradient(
          rgba(0, 0, 0, 0.55), 
          rgba(0, 0, 0, 0.55)
        ), url('${props.featuredImageUrl}') no-repeat center center /cover`,
  };

  // The # anchor at the end brings the reader to the start of the content
  const postHref = `${featuredPost.data.fields.slug}#content`;

  return (
    <Container fluid style={containerStyles} className="primary section">
      <Row>
        <Col md={{ span: 6, offset: 3 }} style={{ textAlign: 'center', color: 'white' }}>
          <div>
            {props.contentCueText !== 'none' && <h6 className="text-uppercase mb-4">{props.contentCueText}</h6>}
            <Link to={postHref}>
              <h1
                className="text-uppercase"
                style={{
                  fontSize: '3.5rem',
                  color: 'white',
                  textDecoration: 'none',
                }}
              >
                {props.titleText}
              </h1>
            </Link>
          </div>
          <p className="my-4 font-weight-bold" style={{ fontSize: '1.5rem' }}>
            {props.leftQuote !== 'none' && props.leftQuote}
            {props.teaserText}
            {props.rightQuote !== 'none' && props.rightQuote}
          </p>
          {props.buttonText !== 'none' && (
            <div className="my-5">
              <Link to={postHref}>
                <Button className="text-uppercase font-weight-bold" variant="primary">
                  {props.buttonText}
                </Button>
              </Link>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}
