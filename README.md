<h2 align="center">
  <a href="https://github.com/justinmahar/gatsby-starter-mdx-launchpad">
    <img alt="Gatsby Starter: MDX Launchpad" src="https://github.com/justinmahar/gatsby-starter-mdx-launchpad/raw/master/static/media/site-icon.png" width="30" />
  </a>
  <a href="https://github.com/justinmahar/gatsby-starter-mdx-launchpad">
    Gatsby Starter: MDX Launchpad
  </a>
</h2>
<h3 align="center">
  Lightweight Gatsby starter supporting TypeScript and MDX. Easily launch your content!
</h3>
<p align="center">
  <a href="https://github.com/justinmahar/gatsby-starter-mdx-launchpad/generate">
    <img src="https://img.shields.io/badge/GitHub-Use%20this%20template-brightgreen"/>
  </a>
  <a href="https://app.netlify.com/sites/gatsby-starter-mdx-launchpad/deploys">
    <img src="https://api.netlify.com/api/v1/badges/21f52584-91b7-4198-8ac7-827357fef04f/deploy-status" alt="Deploy Status"/>
  </a>
</p>

## Documentation

👁️ **[Live Demo](https://gatsby-starter-mdx-launchpad.netlify.app/)**

### Adding Pages and Content

- Add component pages to `pages`
- Add MDX markdown pages to `mdx/pages`
- Add MDX content partials to `mdx/partials`
- Add MDX frontmatter specs to `mdx/defaults.mdx`

See `src/mdx/defaults.mdx` for all frontmatter available and additional information on MDX.

### Configuring Redirects

If you change the path for any of your pages, you can maintain old links using a simple redirects configuration.

Add redirects to the `redirects` field in `src/settings/settings.yml`. This is an array of objects, each having a `from` and a `to` field used to specify the redirect.

Redirects occur from the 404 not found page. A check is done there to see if the path has a redirect configured before the 404 page is shown. If a redirect is found, a Gatsby navigate call is made to redirect to the new path.

### Template Tags

A template tag system exists that allows you to reference site and content information using template tags.

Template tags are [lower camel case](https://en.wikipedia.org/wiki/Camel_case) keywords that are always wrapped in curly braces. For example, <small> `{siteName}` </small> will reference the site name configured in Site Settings. Circular references are not allowed.

`Settings` (from `useSettings` hook) and `MdxContent` (wraps MDX data) both have a getter for a `TemplateTagRenderer` which can be used to render their respective template tags. Template tags for settings are automatically applied to SEO values, and SEO can accept a prop for an additional `TemplateTagRenderer` (this is how the MDX tags are passed into SEO).

The following template tags are available:

### Settings

| Template Tag                                      | Value                            |
| ------------------------------------------------- | -------------------------------- |
| <small> `{siteName}` </small>                     | Name of site                     |
| <small> `{siteDescription}` </small>              | Description of site              |
| <small> `{siteImage}` </small>                    | Site image URL                   |
| <small> `{siteImageAlt}` </small>                 | Site image alt text              |
| <small> `{siteIcon}` </small>                     | Site icon URL                    |
| <small> `{siteIconAlt}` </small>                  | Site icon alt text               |
| <small> `{siteUrl}` </small>                      | Site URL                         |
| <small> `{siteVersion}` </small>                  | Site version from `package.json` |
| <small> `{seoTitleSeparator}` </small>            | Title separator for SEO          |
| <small> `{privatePagePathPrefix}` </small>        | Prefix used before private pages |
| <small> `{googleAnalyticsMeasurementId}` </small> | Google Analytics tracking ID     |
| <small> `{disqusShortname}` </small>              | Discus shortname                 |
| <small> `{twitterSiteUsername}` </small>          | Twitter site username            |
| <small> `{year}` </small>                         | Current year (i.e. 2021)         |

### MDX Content

| Template Tag                               | Value                          |
| ------------------------------------------ | ------------------------------ |
| <small> `{contentTitle}` </small>          | Title of current content       |
| <small> `{contentExcerpt}` </small>        | Excerpt from current content   |
| <small> `{contentSeoTitle}` </small>       | SEO title of the content       |
| <small> `{contentSeoDescription}` </small> | SEO description of the content |

# BSD Zero Clause License

Copyright (c) 2021 [Justin Mahar](https://github.com/justinmahar)

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
