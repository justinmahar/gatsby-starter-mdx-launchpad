import * as React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import MdxSEO from '../../../../../plugins/boldlypress-core/src/components/configured/MdxSEO';
import { LayoutProps } from '../../../../../plugins/boldlypress-core/src/components/layouts/getLayout';
import DefaultFooter from '../../../../../plugins/boldlypress-core/src/components/layouts/default/DefaultFooter';
import DefaultHeader from '../../../../../plugins/boldlypress-core/src/components/layouts/default/DefaultHeader';
import DefaultPostFooter from '../../../../../plugins/boldlypress-core/src/components/layouts/default/DefaultPostFooter';
import DefaultPostHeader from '../../../../../plugins/boldlypress-core/src/components/layouts/default/DefaultPostHeader';
import DefaultPreFooter from '../../../../../plugins/boldlypress-core/src/components/layouts/default/DefaultPreFooter';
import DefaultPreHeader from '../../../../../plugins/boldlypress-core/src/components/layouts/default/DefaultPreHeader';

export default function AppLayout(props: LayoutProps): JSX.Element {
  return (
    <>
      <MdxSEO {...props} />
      <DefaultPreHeader {...props} />
      <DefaultHeader {...props} />
      <DefaultPostHeader {...props} />
      <Container className="mt-5 mb-4">
        <Row>
          <Col>
            <h1>App Layout</h1>
            <p>Place your app here.</p>
          </Col>
        </Row>
      </Container>
      <DefaultPreFooter {...props} />
      <DefaultFooter {...props} />
      <DefaultPostFooter {...props} />
    </>
  );
}
