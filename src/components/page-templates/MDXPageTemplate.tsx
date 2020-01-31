import * as React from "react"
import MdxContent from "../../data/MdxContent"
import PageLayout from "../layouts/PageLayout"

export interface IMDXPageTemplateProps {
  pageContext: any
  data: any
}

export default function MDXPageTemplate(props: IMDXPageTemplateProps) {
  const data = props.data
  const mdxContent: MdxContent = new MdxContent(data.mdx)
  const modelMdxContent: MdxContent = new MdxContent(data.modelPageMdx)

  return (
    <PageLayout mdxContent={mdxContent} modelMdxContent={modelMdxContent} />
  )
}

// Page query is located in js/MDXPageTemplate.js
