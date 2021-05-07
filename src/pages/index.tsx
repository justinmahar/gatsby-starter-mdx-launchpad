import { graphql, Link, useStaticQuery } from 'gatsby';
import moment from 'moment';
import React from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import Body from '../components/layouts/Body';
import Head from '../components/layouts/Head';
import Layout from '../components/layouts/Layout';
import MdxContent, { MdxData } from '../data/MdxContent';

interface IndexProps {
  data: any;
}

export default function Index(props: IndexProps): JSX.Element {
  const postsData = useStaticQuery(graphql`
    query IndexQuery {
      posts: allMdx(
        filter: { frontmatter: { partial: { ne: true }, private: { ne: true }, group: { eq: "posts" } } }
        sort: { fields: frontmatter___date, order: DESC }
      ) {
        nodes {
          ...mdxContent
        }
      }
    }
  `);

  const pageTitle = `{siteName}`;
  const description = `{siteDescription}`;

  const postNodes: MdxData[] = postsData?.posts?.nodes ? postsData.posts.nodes : [];

  const devPostNodes: MdxData[] = postNodes.filter((postNode) => postNode.frontmatter?.category === 'development');
  const devPostElements = devPostNodes.map((node: MdxData) => {
    return (
      <div className="mb-4" key={node.id}>
        <MdxPostCard mdxData={node} />
      </div>
    );
  });

  const lifestylePostNodes: MdxData[] = postNodes.filter((postNode) => postNode.frontmatter?.category === 'lifestyle');
  const lifestylePostElements = lifestylePostNodes.map((node: MdxData) => {
    return (
      <div className="mb-4" key={node.id}>
        <MdxPostCard mdxData={node} />
      </div>
    );
  });

  return (
    <Layout>
      <Head seo={{ title: pageTitle, description: description }} />
      <Body>
        <Container className="content">
          <Row>
            <Col>
              <h2 className="mb-4">Development Posts</h2>
              <p>{devPostElements}</p>
              <h2 className="mb-4">Lifestyle Posts</h2>
              <p>{lifestylePostElements}</p>
            </Col>
          </Row>
        </Container>
      </Body>
    </Layout>
  );
}

interface MdxPostCardProps {
  mdxData: MdxData;
}

const MdxPostCard = (props: MdxPostCardProps) => {
  const mdxContent: MdxContent = new MdxContent(props.mdxData);
  const date = moment(mdxContent.data.frontmatter.date);
  const dateString = date.utc().format('MMMM Do, YYYY');
  return (
    <Card>
      <Card.Header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h4>
          <Link to={mdxContent.data.fields.slug}>{mdxContent.data.frontmatter.title}</Link>
        </h4>
        <div>{dateString}</div>
      </Card.Header>
      <Card.Body>
        <div>
          {mdxContent.getExcerpt()}{' '}
          <Link to={mdxContent.data.fields.slug}>
            <Button size="sm" variant="link">
              Read more &raquo;
            </Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};
