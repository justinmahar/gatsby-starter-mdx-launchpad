import * as React from "react"
import { Card, Button, Badge } from "react-bootstrap"
import { Link } from "gatsby"
import CommentCountComponent from "./CommentCountComponent"
import MdxContent from "../data/MdxContent"

export interface IPostCardProps {
  post: MdxContent
  postCategoryListSlug: string
  showCommentCount: boolean
}

export default function PostCard(props: IPostCardProps) {
  const post = props.post
  const postCategoryListSlug = props.postCategoryListSlug

  let postTitle: string = post.data.frontmatter.title ? post.data.frontmatter.title : "Untitled Post"
  const postHref: string = post.data.fields.slug

  const hasFeaturedImage: boolean =
    !!post.data.frontmatter.featuredImage.featuredImageEnabled && !!post.data.frontmatter.featuredImage

  const hasCardFooter: boolean =
    post.data.frontmatter.category !== "none" || !!post.data.frontmatter.dateEnabled || post.data.frontmatter.discussionEnabled

  return (
    <Card key={post.data.id} className="mb-5 secondary">
      {hasFeaturedImage && (
        <Link to={postHref}>
          <Card.Img variant="top" src={post.data.frontmatter.featuredImage.featuredImageUrl} alt={post.data.frontmatter.featuredImage.featuredImageAlt !== "none" ? post.data.frontmatter.featuredImage.featuredImageAlt : undefined} />
        </Link>
      )}
      {!hasFeaturedImage && (
        <Card.Header as="h2">
          <Link to={postHref}>{postTitle}</Link>
        </Card.Header>
      )}
      <Card.Body>
        {hasFeaturedImage && (
          <Card.Title>
            <Link to={postHref}>{postTitle}</Link>
          </Card.Title>
        )}
        <Card.Text>{post.getExcerpt()}</Card.Text>
        <Link to={postHref}>
          <Button variant="primary">Read More &raquo;</Button>
        </Link>
      </Card.Body>
      {hasCardFooter && (
        <Card.Footer>
          <div className="d-flex justify-content-between">
            <div>
              {post.data.frontmatter.category !== "none" && (
                <Link to={`/${postCategoryListSlug}/${post.data.fields.categorySlug}/`}>
                  <Badge variant="info">{post.data.frontmatter.category}</Badge>
                </Link>
              )}{" "}
              {!!post.data.frontmatter.dateEnabled && <Badge variant="light">{post.data.frontmatter.date}</Badge>}
            </div>
            <div>
              {!!props.showCommentCount && post.data.frontmatter.discussionEnabled && (
                <a href={`${post.data.fields.slug}#discussion`}>
                  <Badge variant="secondary">
                    <CommentCountComponent
                      title={postTitle}
                      identifier={post.data.fields.slug}
                      url={post.data.fields.slug}
                    />
                  </Badge>
                </a>
              )}
            </div>
          </div>
        </Card.Footer>
      )}
    </Card>
  )
}
