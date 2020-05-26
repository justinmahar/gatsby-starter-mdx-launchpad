import * as React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { LayoutProps } from '../../../../plugins/boldlypress-core/src/components/layouts/getLayout';
import Body from '../Body';
import DefaultWrapper from '../DefaultWrapper';

export default function IndexLayout(props: LayoutProps): JSX.Element {
  return (
    <DefaultWrapper {...props}>
      <Body {...props}>
        <Container className="content">
          <Row>
            <Col>
              <p>Index content.</p>
            </Col>
          </Row>
        </Container>
      </Body>
    </DefaultWrapper>
  );
}
