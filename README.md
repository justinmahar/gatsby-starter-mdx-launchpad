# <a href="https://gatsby-starship.netlify.com/start-here"><img alt="Gatsby-Starship" src="https://github.com/devboldly/gatsby-starship/raw/master/static/media/site-icon.png" width="30" /></a> **Gatsby-Starship**

<h3>Gatsby starter supporting React, TypeScript, and MDX.</h3>

**[Live Starter](https://gatsby-starship.netlify.app/)**.

[![Netlify Status](https://api.netlify.com/api/v1/badges/03403e88-6c49-48e4-a210-a26657449e50/deploy-status)](https://app.netlify.com/sites/gatsby-starship/deploys)

### Adding Pages and Content

- Add component pages to `pages`
- Add MDX markdown pages to `mdx-pages`
- Add MDX content partials to `mdx-partials`

See `src/mdx-partials/_defaults.mdx` for all frontmatter available and additional information on MDX.

### Configuring Redirects

Add redirects to `src/settings/redirects.ts`.

Redirects occur from the 404 not found page.

### Template Tags

A template tag system exists that allows you to reference site and content information using template tags.

Template tags are [lower camel case](https://en.wikipedia.org/wiki/Camel_case) keywords that are always wrapped in curly braces. For example, <small> `{siteName}` </small> will reference the site name configured in Site Settings. Circular references are not allowed.

`Settings` (from `useSettings` hook) and `MdxContent` (wraps MDX data) both have a getter for a `TemplateTagRenderer` which can be used to render their respective template tags. Template tags for settings are automatically applied to SEO values, and SEO can accept a prop for an additional `TemplateTagRenderer` (this is how the MDX tags are passed into SEO).

The following template tags are available:

### Settings

| Template Tag                                   | Value                            |
| ---------------------------------------------- | -------------------------------- |
| <small> `{siteName}` </small>                  | Name of site                     |
| <small> `{siteDescription}` </small>           | Description of site              |
| <small> `{siteImage}` </small>                 | Site image URL                   |
| <small> `{siteImageAlt}` </small>              | Site image alt text              |
| <small> `{siteIcon}` </small>                  | Site icon URL                    |
| <small> `{siteIconAlt}` </small>               | Site icon alt text               |
| <small> `{siteUrl}` </small>                   | Site URL                         |
| <small> `{seoTitleSeparator}` </small>         | Title separator for SEO          |
| <small> `{privatePagePathPrefix}` </small>     | Prefix used before private pages |
| <small> `{googleAnalyticsMeasurementId}` </small> | Google Analytics tracking ID     |
| <small> `{disqusShortname}` </small>           | Discus shortname                 |
| <small> `{twitterSiteUsername}` </small>       | Twitter site username            |
| <small> `{year}` </small>                      | Current year (i.e. 2021)         |

### MDX Content

| Template Tag                               | Value                          |
| ------------------------------------------ | ------------------------------ |
| <small> `{contentTitle}` </small>          | Title of current content       |
| <small> `{contentExcerpt}` </small>        | Excerpt from current content   |
| <small> `{contentSeoTitle}` </small>       | SEO title of the content       |
| <small> `{contentSeoDescription}` </small> | SEO description of the content |

# Copyright

Copyright (c) 2021 [DevBoldly](https://devboldly.com)

# Gatsby Copyright

Copyright (c) 2018 gatsbyjs

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
