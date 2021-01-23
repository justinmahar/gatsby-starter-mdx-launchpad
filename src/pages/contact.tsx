import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Body from '../components/layouts/Body';
import Layout from '../components/layouts/Layout';
import Head from '../components/layouts/Head';

interface ContactProps {
  data: any;
}

export default function Contact(props: ContactProps): JSX.Element {
  const pageTitle = 'Contact';
  return (
    <Layout>
      <Head
        seo={{
          title: `${pageTitle}{seoTitleSeparator}{siteDescription}`,
          description: "If you'd like to reach out, just shoot me an email.",
        }}
      />
      <Body>
        <Container className="content">
          <Row>
            <Col>
              <MDXRenderer scope={undefined} components={undefined}>
                {props.data.mdx.body}
              </MDXRenderer>
              <form>
                <div>
                  <textarea style={{ width: 500, height: 100 }} />
                </div>
                <div>
                  <Button>Submit</Button>
                </div>
              </form>
            </Col>
          </Row>
        </Container>
      </Body>
    </Layout>
  );
}

// Page query goes here
export const query = graphql`
  query ContactPageQuery {
    mdx(fields: { slug: { eq: "contact" } }) {
      ...mdxContent
    }
  }
`;
