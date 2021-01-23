import { Link } from 'gatsby';
import React from 'react';
import { Button, Container } from 'react-bootstrap';
import Body from '../components/layouts/Body';
import Layout from '../components/layouts/Layout';
import Head from '../components/layouts/Head';
import { useConfiguredRedirect } from '../hooks/useConfiguredRedirect';

interface NotFoundProps {
  data: any;
  location: any;
}

export default function NotFound(props: NotFoundProps): JSX.Element {
  // Redirect elsewhere if configured in settings/redirects.ts
  const ready = useConfiguredRedirect(props.location.pathname);

  const pageTitle = '404 Not Found';

  if (ready) {
    return (
      <Layout>
        <Head seo={{ title: `${pageTitle}{seoTitleSeparator}{siteDescription}` }} />
        <Body>
          <Container className="content text-center">
            <div style={{ fontSize: '600%' }}>404</div>
            <h1>Well, shoot.</h1>
            <br />
            <h5>We couldn't find what you were looking for.</h5>
            <br />
            <Link to="/">
              <Button variant="secondary">&laquo; Home</Button>
            </Link>
          </Container>
        </Body>
      </Layout>
    );
  } else {
    return <></>;
  }
}

// Page query goes here
