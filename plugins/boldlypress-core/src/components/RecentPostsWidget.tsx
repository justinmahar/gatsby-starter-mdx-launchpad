import { graphql, Link, useStaticQuery } from 'gatsby';
import * as React from 'react';
import { Card } from 'react-bootstrap';
import MdxContent from '../data/MdxContent';
import PostSettings from '../data/settings/PostSettings';

export default function RecentPostsWidget(props: {}): JSX.Element {
  const data = useStaticQuery(graphql`
    query RecentPostsQuery {
      allMdx(filter: { frontmatter: { group: { eq: "posts" } } }, sort: { order: DESC, fields: frontmatter___date }) {
        nodes {
          ...mdxContent
        }
      }
      postYaml {
        ...postSettings
      }
    }
  `);

  const postSettings = new PostSettings(data.postYaml);
  const postCount = postSettings.data.recentPostsWidgetPostCount;

  const posts: MdxContent[] = data.allMdx.nodes
    .map(node => new MdxContent(node))
    .filter((post: MdxContent) => !post.data.frontmatter.options.hidden);

  const categories: string[] = postSettings.data.recentPostsWidgetPostCategories.map(
    postCategory => postCategory.categoryName
  );

  // Filter and collect the posts to show
  let filteredPosts: MdxContent[] = [];
  if (categories.length === 0 || categories.includes('all')) {
    filteredPosts = posts;
  } else {
    for (let i = 0; i < posts.length; i++) {
      const post: MdxContent = posts[i];
      if (categories.includes(post.data.frontmatter.category)) {
        filteredPosts.push(post);
      }
      if (filteredPosts.length >= postCount) {
        break;
      }
    }
  }

  const postElements: JSX.Element[] = filteredPosts.map((post, index) => {
    return (
      <Card.Body key={'recent-post-' + index}>
        <Card.Title>
          <Link to={post.data.fields.slug}>{post.data.frontmatter.title}</Link>
        </Card.Title>
        <Card.Text>{post.data.excerpt}</Card.Text>
      </Card.Body>
    );
  });

  return (
    <Card className="secondary">
      <Card.Header as="h5">Recent Posts</Card.Header>
      {postElements}
    </Card>
  );
}
