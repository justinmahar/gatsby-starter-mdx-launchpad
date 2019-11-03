import * as React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

export interface IHeroSectionProps {
}

export default function HeroSection(props: IHeroSectionProps) {
  return (
    <div style={{ background: "white" }}>
      <Container>
        <Row>
          <Col>
            <img src="http://placekitten.com/300/200" alt="Kitten Placeholder"/>
          </Col>
          <Col>
            <h2>Headline</h2>
          </Col>
          <Col>
            Paragraph text Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel eius molestiae illo dolor magnam, voluptates esse accusamus reprehenderit dolorem voluptatibus.
          </Col>
          <Col>
            <Button className="m-1">Button 1</Button>
            <Button className="m-1">Button 2</Button>
            <Button className="m-1">Button 3</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
