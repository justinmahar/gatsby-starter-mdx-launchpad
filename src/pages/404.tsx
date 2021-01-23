import { Link } from 'gatsby';
import React from 'react';
import { Button, Container } from 'react-bootstrap';
import Body from '../components/layouts/Body';
import Layout from '../components/layouts/Layout';
import SEO from '../components/layouts/SEO';
import { redirects } from '../settings/redirects';
import { navigate } from '@reach/router';

interface NotFoundProps {
  data: any;
  location: any;
}

export default function NotFound(props: NotFoundProps): JSX.Element {
  // Handle configured Redirects
  React.useEffect(() => {
    // Pathname (minus starting slash)
    const pathname: string = props.location.pathname.replace(/^\//, '');
    let redirectPathname: string | undefined = pathname;
    for (let i = 0; i < 10; i++) {
      if (!redirects[redirectPathname]) {
        break;
      }
      redirectPathname = redirects[redirectPathname];
    }
    if (pathname !== redirectPathname) {
      navigate(`/${redirectPathname}`);
    }
  }, [props.location.pathname]);

  const pageTitle = '404 Not Found';

  return (
    <Layout>
      <SEO seo={{ title: `${pageTitle}{seoTitleSeparator}{siteDescription}` }} />
      <Body>
        <Container className="text-center">
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
}

// Page query goes here
