import Disqus from "disqus-react"
import * as React from "react"

export interface ICommentCountComponentProps {
  identifier: string
  url: string
  title: string
}

export default function CommentCountComponent(
  props: ICommentCountComponentProps
) {
  const shortname = process.env.GATSBY_DISQUS_NAME
  const disqusConfig = {
    shortname: shortname,
    config: {
      identifier: props.identifier,
      url: props.url,
      title: props.title,
    },
  }

  return <Disqus.CommentCount {...disqusConfig}>Comments</Disqus.CommentCount>
}
