

# <a href="https://boldlypress.netlify.com/start-here"><img alt="BoldlyPress" src="https://github.com/devboldly/boldlypress/raw/master/static/media/default-site-icon.png" width="30" /></a> **Boldly**Press

<h3>The React starter for DevBoldly.</h3>

**[Live Starter](https://boldlypress.netlify.app/)**.

[![Netlify Status](https://api.netlify.com/api/v1/badges/6c4493db-5263-469c-a0d2-4e3194086bb3/deploy-status)](https://app.netlify.com/sites/boldlypress/deploys)

### Template Tags

In your site's various settings, you can reference other settings using template tags. 

That way, if you change one setting, all others update automatically. Template tags are [lower camel case](https://en.wikipedia.org/wiki/Camel_case) keywords that are always wrapped in curly braces. For example, <small> `{siteName}` </small> will reference the site name configured in Site Settings. Circular references are not allowed.

The following template tags are available:

| Template Tag | Value | Source |
|--------------|-------|--------|
| <small> `{year}` </small> | Current year (i.e. 2020) | Calendar |
| <small> `{siteName}` </small> | Name of site | Site Settings |
| <small> `{siteDescription}` </small> | Description of site | Site Settings |
| <small> `{contentTitle}` </small> | Title of current content | Posts and Pages |
| <small> `{contentExcerpt}` </small> | Excerpt from current content | Posts and Pages |
| <small> `{contentCategory}` </small> | Category of current content (or none if not relevant) | Posts and Pages |
| <small> `{contentSeoTitle}` </small> | SEO title of the content | Posts and Pages |
| <small> `{contentSeoDescription}` </small> | SEO description of the content | Posts and Pages |
| <small> `{twitterSiteUsername}` </small> | Twitter username for site | Social &amp; Sharing Settings |
| <small> `{seoTitleSeparator}` </small> | Separator for use in SEO titles. | Site SEO Settings |
| <small> `{configSeoTitle}` </small> | SEO title for a particular configuration | Site SEO Settings |
| <small> `{configSeoDescription}` </small> | SEO description for a particular configuration | Site SEO Settings |

# MIT License

Copyright (c) 2020 [DevBoldly](https://devboldly.com)

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