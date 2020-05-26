import { Link } from 'gatsby';
import * as React from 'react';
import { Container } from 'reactstrap';
import Button from 'reactstrap/lib/Button';
import { LayoutProps } from '../../../../plugins/boldlypress-core/src/components/layouts/getLayout';
import Body from '../Body';
import DefaultWrapper from '../DefaultWrapper';

export default function NotFoundLayout(props: LayoutProps): JSX.Element {
  return (
    <DefaultWrapper {...props}>
      <Body {...props}>
        <Container className="text-center">
          <div style={{ fontSize: '600%' }}>404</div>
          <h1>Well, shoot.</h1>
          <br />
          <h5>We couldn't find what you were looking for.</h5>
          <br />
          <Link to="/">
            <Button color="secondary">&laquo; Home</Button>
          </Link>
        </Container>
      </Body>
    </DefaultWrapper>
  );
}
