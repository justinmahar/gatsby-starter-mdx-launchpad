import * as React from "react"
import { Link } from "gatsby"
import { Button, Badge } from "react-bootstrap"

export interface IPaginationComponentProps {
  previousPageLink?: string
  nextPageLink?: string
  currentPage: number
  numPages: number
}

export default function PaginationComponent(props: IPaginationComponentProps) {
  const newerPostsButton: JSX.Element = (
    <Button
      variant="secondary"
      size="sm"
      className={!props.previousPageLink ? "invisible" : undefined}
    >
      &larr; Newer Posts
    </Button>
  )
  const olderPostsButton: JSX.Element = (
    <Button
      variant="secondary"
      size="sm"
      className={!props.nextPageLink ? "invisible" : undefined}
    >
      Older Posts &rarr;
    </Button>
  )

  return (
    <div className="d-flex justify-content-between align-items-center my-4">
      <div>
        {!!props.previousPageLink && (
          <Link to={props.previousPageLink}>{newerPostsButton}</Link>
        )}
        {!props.previousPageLink && newerPostsButton}
      </div>
      <div>
        <Badge variant="light">
          Page {props.currentPage}/{props.numPages}
        </Badge>
      </div>
      <div>
        {!!props.nextPageLink && (
          <Link to={props.nextPageLink}>{olderPostsButton}</Link>
        )}
        {!props.nextPageLink && olderPostsButton}
      </div>
    </div>
  )
}
