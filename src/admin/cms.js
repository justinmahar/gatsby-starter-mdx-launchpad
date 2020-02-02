// Usage with import from npm package
import CMS from "netlify-cms-app"

const config = {
  config: {
  "backend": {
    "name": "test-repo",
    "branch": "master"
  },
  "publish_mode": "simple",
  "media_folder": "static/media",
  "public_folder": "/media",
  "collections": [
    {
      "label": "Blog Posts",
      "label_singular": "Blog Post",
      "description": "Blog posts are the content that makes up your site. If you're a technical person, they use MDX format and support JSX components.",
      "name": "posts",
      "folder": "src/posts-mdx",
      "delete": true,
      "extension": "mdx",
      "format": "frontmatter",
      "create": true,
      "fields": [
        {
          "label": "Title",
          "name": "title",
          "widget": "string",
          "hint": "Use an attention-grabbing title and keep this to 50-60 characters or shorter for best results (examples here: https://tinyurl.com/post-title-ideas). Template tag for this setting: {contentTitle}"
        },
        {
          "label": "Slug",
          "name": "rawSlug",
          "widget": "string",
          "hint": "Used in the URL of the post. For instance, if the slug is \"hello-world\", the post would be viewable at https://mysite.com/hello-world. Must be unique. Only use lowercase letters, dashes, and underscores."
        },
        {
          "label": "Publish Date",
          "name": "date",
          "widget": "date",
          "format": "YYYY-MM-DD",
          "hint": "This is the date shown for the post, and is used to sort posts chronologically. You can hide the date using the option below. Setting a date in the future will cause that post to be hidden until then."
        },
        {
          "label": "Category",
          "name": "category",
          "widget": "string",
          "hint": "If you don't want the post to be categorized, set this to none. Otherwise, set this to anything. Other posts with the same category will be grouped together. Template tag for this setting: {contentCategory}",
          "default": "none"
        },
        {
          "label": "Body",
          "name": "body",
          "widget": "markdown"
        },
        {
          "label": "Custom Excerpt",
          "name": "customExcerpt",
          "widget": "string",
          "hint": "Specify a custom excerpt here, or set to none to automatically use the first few sentences of the post. Template tag for this setting: {contentExcerpt}",
          "default": "none"
        },
        {
          "label": "Featured Image",
          "name": "featuredImage",
          "widget": "object",
          "fields": [
            {
              "label": "Use Featured Image",
              "name": "featuredImageEnabled",
              "widget": "boolean",
              "hint": "When disabled, the featured image will not be shown for the post. Using a featured image is HIGHLY recommended.",
              "default": false
            },
            {
              "label": "Featured Image",
              "name": "featuredImageUrl",
              "widget": "image",
              "hint": "Recommended size is 1200x630 (1.91:1), and under 5MB. You can use Canva to edit, and can grab a free image here: https://www.pexels.com/",
              "default": "/media/no-image.png"
            },
            {
              "label": "Featured Image Alt",
              "name": "featuredImageAlt",
              "widget": "string",
              "hint": "A description of what's happening in the custom image. This is used for accessibility, so visually impaired readers can know what's up. Supports template tags. Set to none to disable.",
              "default": "none"
            }
          ]
        },
        {
          "label": "Show Sidebar",
          "name": "showSidebar",
          "widget": "boolean",
          "hint": "You can show the sidebar for specific posts if you'd like.",
          "default": true
        },
        {
          "label": "Hide Post",
          "name": "hidden",
          "widget": "boolean",
          "hint": "If you hide a post, it won't be visible to users on the site.",
          "default": false
        },
        {
          "label": "Layout",
          "name": "layout",
          "widget": "hidden",
          "default": "post"
        },
        {
          "label": "Show Date",
          "name": "dateEnabled",
          "widget": "boolean",
          "hint": "When disabled, the date will not be shown for the post.",
          "default": true
        },
        {
          "label": "Enable Discussion",
          "name": "discussionEnabled",
          "widget": "boolean",
          "hint": "When disabled, the comments section will not be shown.",
          "default": true
        },
        {
          "label": "Sharing",
          "name": "sharing",
          "widget": "object",
          "fields": [
            {
              "label": "Enable Sharing",
              "name": "sharingEnabled",
              "widget": "boolean",
              "hint": "When disabled, the social media sharing buttons will not be shown.",
              "default": true
            },
            {
              "label": "Facebook Quote",
              "name": "facebookQuote",
              "widget": "string",
              "hint": "Quote to use when sharing via the Facebook button. Supports template tags.",
              "default": "{contentOgTitle}"
            },
            {
              "label": "Facebook Hashtag",
              "name": "facebookHashtag",
              "widget": "string",
              "hint": "You can use a Facebook hashtag if you'd like. Be sure to include the # character. Set to none for no hashtag.",
              "default": "none"
            },
            {
              "label": "Twitter Title",
              "name": "twitterTitle",
              "widget": "string",
              "hint": "Title shown when sharing via the Twitter button. Supports template tags.",
              "default": "{contentTwitterCardTitle}"
            },
            {
              "label": "Twitter Via",
              "name": "twitterVia",
              "widget": "string",
              "hint": "The attribution for the shared content on Twitter. Supports template tags.",
              "default": "{contentTwitterSiteUsername}"
            },
            {
              "label": "Twitter Hashtags",
              "name": "twitterHashtags",
              "widget": "string",
              "hint": "Hashtags for the content. Set to none for no hashtags.",
              "default": "none"
            }
          ]
        },
        {
          "label": "SEO Settings",
          "name": "seoSettings",
          "widget": "object",
          "fields": [
            {
              "label": "SEO Title",
              "name": "seoTitle",
              "widget": "string",
              "hint": "The title shown in the browser tab and in Google search results. Use an attention-grabbing title and keep this to 50-60 characters or shorter for best results. Supports template tags. Template tag for this setting: {contentSeoTitle}",
              "default": "{siteWidePostSeoTitle}"
            },
            {
              "label": "SEO Description",
              "name": "seoDescription",
              "widget": "string",
              "hint": "A description of the content. Can also be an excerpt, if you want. At least two sentences long is recommended, and it should entice users to click. Use {computedPostSeoDescription} for the site-wide title computed from Site-Wide Post SEO Settings. Supports template tags. Template tag for this setting: {contentSeoDescription}",
              "default": "{siteWidePostSeoDescription}"
            },
            {
              "label": "SEO Image",
              "name": "seoImage",
              "widget": "object",
              "hint": "↑ Select the image used when sharing. Unless customized below, this will be used as the Open Graph and Twitter Card image when sharing the page.",
              "fields": [
                {
                  "label": "SEO Image Used",
                  "name": "seoImageSelection",
                  "widget": "select",
                  "hint": "Specify which image should be used for SEO. ⮞ Featured Image (If Enabled): The featured image will be used for SEO. If \"Featured Image » Use Featured Image\" is disabled, it will fall back to the site-wide image specifed in Site-Wide Post SEO Settings. ⮞ Custom Image: The image specified below will be used for SEO. Choose this option if you want a different SEO image from the featured or fallback site-wide one.",
                  "default": "featured-image-if-enabled",
                  "options": [
                    {
                      "label": "Featured Image (If Enabled)",
                      "value": "featured-image-if-enabled"
                    },
                    {
                      "label": "Custom Image",
                      "value": "custom-image"
                    }
                  ]
                },
                {
                  "label": "Custom SEO Image",
                  "name": "customSeoImage",
                  "widget": "image",
                  "hint": "To use a custom SEO image, you must select Use Custom Image above. Select an image that's bigger than 1200×630 and looks good when cropped into a square. Facebook recommends a 1200×630 (1.91:1) and will crop the top and bottom of larger images. Reddit will crop and resize images to 70×70. Twitter Cards can use either square or wide images depending on the card type being used, but the default is a square. Use a different URL for new images or the image won't be updated by Facebook.",
                  "default": "/media/no-image.png"
                },
                {
                  "label": "Custom SEO Image Alt",
                  "name": "customSeoImageAlt",
                  "widget": "string",
                  "hint": "A description of what's happening in the custom image. This is used for accessibility, so visually impaired readers can know what's up. Supports template tags.",
                  "default": "none"
                }
              ]
            },
            {
              "label": "Open Graph",
              "name": "openGraph",
              "widget": "object",
              "hint": "↑ Settings for Open Graph, a protocol that allows you to specify the information to show when someone shares your page.",
              "fields": [
                {
                  "label": "OG Title",
                  "name": "ogTitle",
                  "widget": "string",
                  "hint": "The title shown when someone shares your page. Use {siteWidePostOgTitle} for the computed OG title from Site-Wide SEO Settings. Supports template tags. Template tag for this setting: {contentOgTitle}",
                  "default": "{siteWidePostOgTitle}"
                },
                {
                  "label": "OG Description",
                  "name": "ogDescription",
                  "widget": "string",
                  "hint": "The description shown when someone shares your page. At least two sentences long is recommended, and it should entice users to click.  Use {siteWidePostOgDescription} for the computed OG description from Site-Wide Post SEO Settings. Supports template tags. Template tag for this setting: {contentOgDescription}",
                  "default": "{siteWidePostOgDescription}"
                },
                {
                  "label": "Open Graph Image",
                  "name": "ogImage",
                  "widget": "object",
                  "hint": "Open Graph image settings.",
                  "fields": [
                    {
                      "label": "Use Custom OG Image",
                      "name": "ogUseCustomOgImage",
                      "widget": "boolean",
                      "hint": "Enable to use the custom image for Open Graph specified below. Otherwise, the SEO Image configured above will be used.",
                      "default": false
                    },
                    {
                      "label": "Custom OG Image",
                      "name": "ogCustomImage",
                      "widget": "image",
                      "hint": "The overridden image for Open Graph. You must switch on Use Custom OG Image above for this to take effect. Facebook recommends a 1200×630 (1.91:1) and will crop the top and bottom of larger images.",
                      "default": "/media/no-image.png"
                    },
                    {
                      "label": "Custom OG Image Alt",
                      "name": "ogCustomImageAlt",
                      "widget": "string",
                      "hint": "A description of what's happening in the custom Open Graph image. This is for accessibility, so visually impaired readers can know what's up. Supports template tags.",
                      "default": "none"
                    }
                  ]
                }
              ]
            },
            {
              "label": "Twitter Cards",
              "name": "twitterCards",
              "widget": "object",
              "hint": "↑ Settings for the Twitter Cards that are created when sharing your page on Twitter.",
              "fields": [
                {
                  "label": "Twitter Card Type",
                  "name": "twitterCardType",
                  "widget": "select",
                  "hint": "Choose the card type. Use Site-Wide Setting will use the site-wide setting specified in Site-Wide Post SEO Settings. You can override this by choosing another option here. Regular summary cards use a square image and place the image next to the content, while the summary card with large image places the image above the card's text.",
                  "default": "site-wide-twitter-card-type",
                  "options": [
                    {
                      "label": "Use Site-Wide Setting",
                      "value": "site-wide-twitter-card-type"
                    },
                    {
                      "label": "Summary Card",
                      "value": "summary-card"
                    },
                    {
                      "label": "Summary Card With Large Image",
                      "value": "summary-card-with-large-image"
                    }
                  ]
                },
                {
                  "label": "Twitter Card Title",
                  "name": "twitterCardTitle",
                  "widget": "string",
                  "hint": "The title shown when someone shares your page on Twitter. Use {siteWidePostTwitterCardTitle} for the computed Twitter Card title from Site-Wide Post SEO Settings. Supports template tags. Template tag for this setting: {contentTwitterCardTitle}",
                  "default": "{siteWidePostTwitterCardTitle}"
                },
                {
                  "label": "Twitter Card Description",
                  "name": "twitterCardDescription",
                  "widget": "string",
                  "hint": "The description shown when someone shares your page on Twitter. Use {siteWidePostTwitterCardDescription} for the computed Twitter Card description from Site-Wide Post SEO Settings. Supports template tags. Template tag for this setting: {contentTwitterCardDescription}",
                  "default": "{siteWidePostTwitterCardDescription}"
                },
                {
                  "label": "Twitter Card Image",
                  "name": "twitterCardImage",
                  "widget": "object",
                  "hint": "Twitter Card image settings.",
                  "fields": [
                    {
                      "label": "Use Custom Twitter Card Image",
                      "name": "twitterCardUseCustomImage",
                      "widget": "boolean",
                      "hint": "Enable to override the SEO Image (above) for Twitter Cards, specifying a different one below.",
                      "default": false
                    },
                    {
                      "label": "Custom Twitter Card Image",
                      "name": "twitterCardCustomImage",
                      "widget": "image",
                      "hint": "The custom image for Twitter Cards. You must switch on Use Custom Twitter Card Image above for this to take effect. You should not use a generic image such as your website logo, author photo, or other image that spans multiple pages. Images for Summary Card support an aspect ratio of 1:1 with minimum dimensions of 144x144 or maximum of 4096x4096 pixels, and will be cropped to a square on all platforms. Images for Summary Card With Large Image support an aspect ratio of 2:1 with minimum dimensions of 300x157 or maximum of 4096x4096 pixels. Images must be less than 5MB in size. JPG, PNG, WEBP and GIF formats are supported. Only the first frame of an animated GIF will be used. SVG is not supported.",
                      "default": "/media/no-image.png"
                    },
                    {
                      "label": "Custom Twitter Card Image Alt",
                      "name": "twitterCardCustomImageAlt",
                      "widget": "string",
                      "hint": "A description of what's happening in the custom Twitter Card image. This is for accessibility, so visually impaired readers can know what's up. Supports template tags.",
                      "default": "none"
                    }
                  ]
                },
                {
                  "label": "Twitter Card Site Username",
                  "name": "twitterCardSiteUsername",
                  "widget": "string",
                  "hint": "The site username that the Twitter Card is attributed to, prefixed with the @ symbol. Use {siteWidePostTwitterCardSiteUsername} to specify the site username set in Site-Wide Post SEO Settings. Supports template tags. Template tag for this setting: {contentTwitterSiteUsername}",
                  "default": "{siteWidePostTwitterCardSiteUsername}"
                }
              ]
            }
          ]
        },
        {
          "label": "Group",
          "name": "group",
          "widget": "hidden",
          "default": "posts"
        }
      ]
    },
    {
      "label": "Pages",
      "label_singular": "Page",
      "description": "Pages contain content separate from your blog posts and are not listed on the home page, category pages, or recent posts widget. Examples: About page, contact page, legal pages. If you're a technical person, they use MDX format and support JSX components.",
      "name": "pages",
      "folder": "src/pages-mdx",
      "delete": true,
      "extension": "mdx",
      "format": "frontmatter",
      "create": true,
      "fields": [
        {
          "label": "Title",
          "name": "title",
          "widget": "string",
          "hint": "The title of the page. Keep this to 50-60 characters or shorter for best results. Template tag for this setting: {contentTitle}"
        },
        {
          "label": "Slug",
          "name": "rawSlug",
          "widget": "string",
          "hint": "Used in the URL of the page. For instance, if the slug is \"about-me\", the page would be viewable at https://mysite.com/about-me. Must be unique. Only use lowercase letters, dashes, and underscores."
        },
        {
          "label": "Publish Date",
          "name": "date",
          "widget": "date",
          "format": "YYYY-MM-DD",
          "hint": "This is the publish date for the page, for your own reference. Page dates are hidden by default. You can show the date using the option below."
        },
        {
          "label": "Category",
          "name": "category",
          "widget": "hidden",
          "default": "none"
        },
        {
          "label": "Body",
          "name": "body",
          "widget": "markdown"
        },
        {
          "label": "Custom Excerpt",
          "name": "customExcerpt",
          "widget": "string",
          "hint": "Specify a custom excerpt here, or set to none to automatically use the first few sentences of the page. Template tag for this setting: {contentExcerpt}",
          "default": "none"
        },
        {
          "label": "Featured Image",
          "name": "featuredImage",
          "widget": "object",
          "fields": [
            {
              "label": "Use Featured Image",
              "name": "featuredImageEnabled",
              "widget": "boolean",
              "hint": "When disabled, the featured image will not be shown for the post. Using a featured image is HIGHLY recommended.",
              "default": false
            },
            {
              "label": "Featured Image",
              "name": "featuredImageUrl",
              "widget": "image",
              "hint": "Recommended size is 1200x630 (1.91:1), and under 5MB. You can use Canva to edit, and can grab a free image here: https://www.pexels.com/",
              "default": "/media/no-image.png"
            },
            {
              "label": "Featured Image Alt",
              "name": "featuredImageAlt",
              "widget": "string",
              "hint": "A description of what's happening in the custom image. This is used for accessibility, so visually impaired readers can know what's up. Set to none to disable. Supports template tags.",
              "default": "none"
            },
            {
              "label": "Show Title Section",
              "name": "showTitleSection",
              "widget": "boolean",
              "hint": "When switched on, a title section will be shown with the featured image as the background (if it's enabled).",
              "default": false
            },
            {
              "label": "Show Card Image",
              "name": "showCardImage",
              "widget": "boolean",
              "hint": "When switched on, the card image above the post will be shown using the featured image  (if it's enabled).",
              "default": false
            }
          ]
        },
        {
          "label": "Show Sidebar",
          "name": "showSidebar",
          "widget": "boolean",
          "hint": "You can show the sidebar for specific pages if you'd like.",
          "default": false
        },
        {
          "label": "Show Title",
          "name": "showTitle",
          "widget": "boolean",
          "hint": "The title will be shown on the page above the content.",
          "default": true
        },
        {
          "label": "Hide Page",
          "name": "hidden",
          "widget": "boolean",
          "hint": "If you hide a page, it won't be visible to users on the site.",
          "default": false
        },
        {
          "label": "Layout",
          "name": "layout",
          "widget": "select",
          "hint": "Select the layout type.",
          "default": "page",
          "options": [
            {
              "label": "Standard Page",
              "value": "page"
            },
            {
              "label": "Index (Homepage)",
              "value": "index"
            },
            {
              "label": "Category Post Listing Page",
              "value": "category-post-listing"
            }
          ]
        },
        {
          "label": "Show Date",
          "name": "dateEnabled",
          "widget": "boolean",
          "hint": "When enabled, the date will be shown for the page.",
          "default": false
        },
        {
          "label": "Enable Discussion",
          "name": "discussionEnabled",
          "widget": "boolean",
          "hint": "When enabled, the comments section will be shown.",
          "default": false
        },
        {
          "label": "Sharing",
          "name": "sharing",
          "widget": "object",
          "fields": [
            {
              "label": "Enable Sharing",
              "name": "sharingEnabled",
              "widget": "boolean",
              "hint": "When disabled, the social media sharing buttons will not be shown.",
              "default": false
            },
            {
              "label": "Facebook Quote",
              "name": "facebookQuote",
              "widget": "string",
              "hint": "Quote to use when sharing via the Facebook button. Supports template tags.",
              "default": "{contentOgTitle}"
            },
            {
              "label": "Facebook Hashtag",
              "name": "facebookHashtag",
              "widget": "string",
              "hint": "You can use a Facebook hashtag if you'd like. Be sure to include the # character. Set to none for no hashtag.",
              "default": "none"
            },
            {
              "label": "Twitter Title",
              "name": "twitterTitle",
              "widget": "string",
              "hint": "Title shown when sharing via the Twitter button. Supports template tags.",
              "default": "{contentTwitterCardTitle}"
            },
            {
              "label": "Twitter Via",
              "name": "twitterVia",
              "widget": "string",
              "hint": "The attribution for the shared content on Twitter. Supports template tags.",
              "default": "{contentTwitterSiteUsername}"
            },
            {
              "label": "Twitter Hashtags",
              "name": "twitterHashtags",
              "widget": "string",
              "hint": "Hashtags for the content. Set to none for no hashtags.",
              "default": "none"
            }
          ]
        },
        {
          "label": "SEO Settings",
          "name": "seoSettings",
          "widget": "object",
          "fields": [
            {
              "label": "SEO Title",
              "name": "seoTitle",
              "widget": "string",
              "hint": "The title shown in the browser tab and in Google search results. Use an attention-grabbing title and keep this to 50-60 characters or shorter for best results. Use {computedPageSeoTitle} for the site-wide title computed from Site-Wide Page SEO Settings.",
              "default": "{siteWidePageSeoTitle}"
            },
            {
              "label": "SEO Description",
              "name": "seoDescription",
              "widget": "string",
              "hint": "A description of the content. Can also be an excerpt, if you want. At least two sentences long is recommended, and it should entice users to click. Use {computedPageSeoDescription} for the site-wide title computed from Site-Wide Page SEO Settings.",
              "default": "{siteWidePageSeoDescription}"
            },
            {
              "label": "SEO Image",
              "name": "seoImage",
              "widget": "object",
              "hint": "↑ Select the image used when sharing. Unless customized below, this will be used as the Open Graph and Twitter Card image when sharing the page.",
              "fields": [
                {
                  "label": "SEO Image Used",
                  "name": "seoImageSelection",
                  "widget": "select",
                  "hint": "Specify which image should be used for SEO. ⮞ Featured Image (If Enabled): The featured image will be used for SEO. If \"Featured Image » Use Featured Image\" is disabled, it will fall back to the site-wide image specifed in Site-Wide Page SEO Settings. ⮞ Custom Image: The image specified below will be used for SEO. Choose this option if you want a different SEO image from the featured or fallback site-wide one.",
                  "default": "featured-image-if-enabled",
                  "options": [
                    {
                      "label": "Featured Image (If Enabled)",
                      "value": "featured-image-if-enabled"
                    },
                    {
                      "label": "Custom Image",
                      "value": "custom-image"
                    }
                  ]
                },
                {
                  "label": "Custom SEO Image",
                  "name": "customSeoImage",
                  "widget": "image",
                  "hint": "To use a custom SEO image, you must select Use Custom Image above. Select an image that's bigger than 1200×630 and looks good when cropped into a square. Facebook recommends a 1200×630 (1.91:1) and will crop the top and bottom of larger images. Reddit will crop and resize images to 70×70. Twitter Cards can use either square or wide images depending on the card type being used, but the default is a square. Use a different URL for new images or the image won't be updated by Facebook.",
                  "default": "/media/no-image.png"
                },
                {
                  "label": "Custom SEO Image Alt",
                  "name": "customSeoImageAlt",
                  "widget": "string",
                  "hint": "A description of what's happening in the custom image. This is used for accessibility, so visually impaired readers can know what's up.",
                  "default": "none"
                }
              ]
            },
            {
              "label": "Open Graph",
              "name": "openGraph",
              "widget": "object",
              "hint": "↑ Settings for Open Graph, a protocol that allows you to specify the information to show when someone shares your page.",
              "fields": [
                {
                  "label": "OG Title",
                  "name": "ogTitle",
                  "widget": "string",
                  "hint": "The title shown when someone shares your page. Use {siteWidePageOgTitle} for the computed OG title from Site-Wide SEO Settings.",
                  "default": "{siteWidePageOgTitle}"
                },
                {
                  "label": "OG Description",
                  "name": "ogDescription",
                  "widget": "string",
                  "hint": "The description shown when someone shares your page. At least two sentences long is recommended, and it should entice users to click.  Use {siteWidePageOgDescription} for the computed OG description from Site-Wide Page SEO Settings.",
                  "default": "{siteWidePageOgDescription}"
                },
                {
                  "label": "Open Graph Image",
                  "name": "ogImage",
                  "widget": "object",
                  "hint": "Open Graph image settings.",
                  "fields": [
                    {
                      "label": "Use Custom OG Image",
                      "name": "ogUseCustomOgImage",
                      "widget": "boolean",
                      "hint": "Enable to use the custom image for Open Graph specified below. Otherwise, the SEO Image configured above will be used.",
                      "default": false
                    },
                    {
                      "label": "Custom OG Image",
                      "name": "ogCustomImage",
                      "widget": "image",
                      "hint": "The overridden image for Open Graph. You must switch on Use Custom OG Image above for this to take effect. Facebook recommends a 1200×630 (1.91:1) and will crop the top and bottom of larger images.",
                      "default": "/media/no-image.png"
                    },
                    {
                      "label": "Custom OG Image Alt",
                      "name": "ogCustomImageAlt",
                      "widget": "string",
                      "hint": "A description of what's happening in the custom Open Graph image. This is for accessibility, so visually impaired readers can know what's up.",
                      "default": "none"
                    }
                  ]
                }
              ]
            },
            {
              "label": "Twitter Cards",
              "name": "twitterCards",
              "widget": "object",
              "hint": "↑ Settings for the Twitter Cards that are created when sharing your page on Twitter.",
              "fields": [
                {
                  "label": "Twitter Card Type",
                  "name": "twitterCardType",
                  "widget": "select",
                  "hint": "Choose the card type. Use Site-Wide Setting will use the site-wide setting specified in Site-Wide Page SEO Settings. You can override this by choosing another option here. Regular summary cards use a square image and place the image next to the content, while the summary card with large image places the image above the card's text.",
                  "default": "site-wide-twitter-card-type",
                  "options": [
                    {
                      "label": "Use Site-Wide Setting",
                      "value": "site-wide-twitter-card-type"
                    },
                    {
                      "label": "Summary Card",
                      "value": "summary-card"
                    },
                    {
                      "label": "Summary Card With Large Image",
                      "value": "summary-card-with-large-image"
                    }
                  ]
                },
                {
                  "label": "Twitter Card Title",
                  "name": "twitterCardTitle",
                  "widget": "string",
                  "hint": "The title shown when someone shares your page on Twitter. Use {siteWidePageTwitterCardTitle} for the computed Twitter Card title from Site-Wide Page SEO Settings.",
                  "default": "{siteWidePageTwitterCardTitle}"
                },
                {
                  "label": "Twitter Card Description",
                  "name": "twitterCardDescription",
                  "widget": "string",
                  "hint": "The description shown when someone shares your page on Twitter. Use {siteWidePageTwitterCardDescription} for the computed Twitter Card description from Site-Wide Page SEO Settings.",
                  "default": "{siteWidePageTwitterCardDescription}"
                },
                {
                  "label": "Twitter Card Image",
                  "name": "twitterCardImage",
                  "widget": "object",
                  "hint": "Twitter Card image settings.",
                  "fields": [
                    {
                      "label": "Use Custom Twitter Card Image",
                      "name": "twitterCardUseCustomImage",
                      "widget": "boolean",
                      "hint": "Enable to override the SEO Image (above) for Twitter Cards, specifying a different one below.",
                      "default": false
                    },
                    {
                      "label": "Custom Twitter Card Image",
                      "name": "twitterCardCustomImage",
                      "widget": "image",
                      "hint": "The custom image for Twitter Cards. You must switch on Use Custom Twitter Card Image above for this to take effect. You should not use a generic image such as your website logo, author photo, or other image that spans multiple pages. Images for Summary Card support an aspect ratio of 1:1 with minimum dimensions of 144x144 or maximum of 4096x4096 pixels, and will be cropped to a square on all platforms. Images for Summary Card With Large Image support an aspect ratio of 2:1 with minimum dimensions of 300x157 or maximum of 4096x4096 pixels. Images must be less than 5MB in size. JPG, PNG, WEBP and GIF formats are supported. Only the first frame of an animated GIF will be used. SVG is not supported.",
                      "default": "/media/no-image.png"
                    },
                    {
                      "label": "Custom Twitter Card Image Alt",
                      "name": "twitterCardCustomImageAlt",
                      "widget": "string",
                      "hint": "A description of what's happening in the custom Twitter Card image. This is for accessibility, so visually impaired readers can know what's up.",
                      "default": "none"
                    }
                  ]
                },
                {
                  "label": "Twitter Card Site Username",
                  "name": "twitterCardSiteUsername",
                  "widget": "string",
                  "hint": "The site username that the Twitter Card is attributed to, prefixed with the @ symbol. Use {siteWidePageTwitterCardSiteUsername} to specify the site username set in Site-Wide Page SEO Settings.",
                  "default": "{siteWidePageTwitterCardSiteUsername}"
                }
              ]
            }
          ]
        },
        {
          "label": "Group",
          "name": "group",
          "widget": "hidden",
          "default": "pages"
        }
      ]
    },
    {
      "label": "Settings",
      "name": "settings",
      "description": "Configure your site's menus, forms, discussion, sharing, posts, and more.",
      "delete": false,
      "editor": {
        "preview": false
      },
      "files": [
        {
          "label": "Site Settings",
          "name": "siteMetadataSettings",
          "file": "settings/site-metadata/site-metadata-settings.json",
          "fields": [
            {
              "label": "Site Name",
              "name": "siteName",
              "widget": "string",
              "hint": "The name of your site"
            },
            {
              "label": "Site Description",
              "name": "siteDescription",
              "widget": "string",
              "hint": "A description of your site."
            },
            {
              "label": "Site Image",
              "name": "siteImage",
              "widget": "image",
              "hint": "An image for your site. This is used by default when sharing pages of your site. Select an image that's bigger than 1200×630 and looks good when cropped into a square. Facebook recommends a 1200×630 (1.91:1) and will crop the top and bottom of larger images. Reddit will crop and resize images to 70×70. Twitter Cards can use either square or wide images depending on the card type being used, but the default is a square. Use a different URL for new images or the image won't be updated by Facebook."
            },
            {
              "label": "Site Image Alt",
              "name": "siteImageAlt",
              "widget": "string",
              "hint": "Alt text for the site image. Describes what's happening in the image for the visually impaired. Set to none to disable."
            },
            {
              "label": "Site Icon",
              "name": "siteIcon",
              "widget": "image",
              "hint": "An icon for your site. This is used by default in the navbar and for offline support (progressive web app). Must be square, at least 512x512, and either: JPEG, PNG, WebP, TIFF, GIF or SVG."
            },
            {
              "label": "Site Icon Alt",
              "name": "siteIconAlt",
              "widget": "string",
              "hint": "Alt text for the site icon. Describes what's happening in the icon for the visually impaired. Set to none to disable."
            },
            {
              "label": "Site Language",
              "name": "siteLanguage",
              "widget": "select",
              "options": [
                {
                  "label": "English",
                  "value": "en"
                },
                {
                  "label": "Abkhazian",
                  "value": "ab"
                },
                {
                  "label": "Afar",
                  "value": "aa"
                },
                {
                  "label": "Afrikaans",
                  "value": "af"
                },
                {
                  "label": "Akan",
                  "value": "ak"
                },
                {
                  "label": "Albanian",
                  "value": "sq"
                },
                {
                  "label": "Amharic",
                  "value": "am"
                },
                {
                  "label": "Arabic",
                  "value": "ar"
                },
                {
                  "label": "Aragonese",
                  "value": "an"
                },
                {
                  "label": "Armenian",
                  "value": "hy"
                },
                {
                  "label": "Assamese",
                  "value": "as"
                },
                {
                  "label": "Avaric",
                  "value": "av"
                },
                {
                  "label": "Avestan",
                  "value": "ae"
                },
                {
                  "label": "Aymara",
                  "value": "ay"
                },
                {
                  "label": "Azerbaijani",
                  "value": "az"
                },
                {
                  "label": "Bambara",
                  "value": "bm"
                },
                {
                  "label": "Bashkir",
                  "value": "ba"
                },
                {
                  "label": "Basque",
                  "value": "eu"
                },
                {
                  "label": "Belarusian",
                  "value": "be"
                },
                {
                  "label": "Bengali",
                  "value": "bn"
                },
                {
                  "label": "Bihari languages",
                  "value": "bh"
                },
                {
                  "label": "Bislama",
                  "value": "bi"
                },
                {
                  "label": "Bosnian",
                  "value": "bs"
                },
                {
                  "label": "Breton",
                  "value": "br"
                },
                {
                  "label": "Bulgarian",
                  "value": "bg"
                },
                {
                  "label": "Burmese",
                  "value": "my"
                },
                {
                  "label": "Catalan, Valencian",
                  "value": "ca"
                },
                {
                  "label": "Chamorro",
                  "value": "ch"
                },
                {
                  "label": "Chechen",
                  "value": "ce"
                },
                {
                  "label": "Chichewa, Chewa, Nyanja",
                  "value": "ny"
                },
                {
                  "label": "Chinese",
                  "value": "zh"
                },
                {
                  "label": "Chuvash",
                  "value": "cv"
                },
                {
                  "label": "Cornish",
                  "value": "kw"
                },
                {
                  "label": "Corsican",
                  "value": "co"
                },
                {
                  "label": "Cree",
                  "value": "cr"
                },
                {
                  "label": "Croatian",
                  "value": "hr"
                },
                {
                  "label": "Czech",
                  "value": "cs"
                },
                {
                  "label": "Danish",
                  "value": "da"
                },
                {
                  "label": "Divehi, Dhivehi, Maldivian",
                  "value": "dv"
                },
                {
                  "label": "Dutch, Flemish",
                  "value": "nl"
                },
                {
                  "label": "Dzongkha",
                  "value": "dz"
                },
                {
                  "label": "Esperanto",
                  "value": "eo"
                },
                {
                  "label": "Estonian",
                  "value": "et"
                },
                {
                  "label": "Ewe",
                  "value": "ee"
                },
                {
                  "label": "Faroese",
                  "value": "fo"
                },
                {
                  "label": "Fijian",
                  "value": "fj"
                },
                {
                  "label": "Finnish",
                  "value": "fi"
                },
                {
                  "label": "French",
                  "value": "fr"
                },
                {
                  "label": "Fulah",
                  "value": "ff"
                },
                {
                  "label": "Galician",
                  "value": "gl"
                },
                {
                  "label": "Georgian",
                  "value": "ka"
                },
                {
                  "label": "German",
                  "value": "de"
                },
                {
                  "label": "Greek, Modern",
                  "value": "el"
                },
                {
                  "label": "Guarani",
                  "value": "gn"
                },
                {
                  "label": "Gujarati",
                  "value": "gu"
                },
                {
                  "label": "Haitian, Haitian Creole",
                  "value": "ht"
                },
                {
                  "label": "Hausa",
                  "value": "ha"
                },
                {
                  "label": "Hebrew",
                  "value": "he"
                },
                {
                  "label": "Herero",
                  "value": "hz"
                },
                {
                  "label": "Hindi",
                  "value": "hi"
                },
                {
                  "label": "Hiri Motu",
                  "value": "ho"
                },
                {
                  "label": "Hungarian",
                  "value": "hu"
                },
                {
                  "label": "Interlingua (International Auxiliary Language Association",
                  "value": "ia"
                },
                {
                  "label": "Indonesian",
                  "value": "id"
                },
                {
                  "label": "Interlingue, Occidental",
                  "value": "ie"
                },
                {
                  "label": "Irish",
                  "value": "ga"
                },
                {
                  "label": "Igbo",
                  "value": "ig"
                },
                {
                  "label": "Inupiaq",
                  "value": "ik"
                },
                {
                  "label": "Ido",
                  "value": "io"
                },
                {
                  "label": "Icelandic",
                  "value": "is"
                },
                {
                  "label": "Italian",
                  "value": "it"
                },
                {
                  "label": "Inuktitut",
                  "value": "iu"
                },
                {
                  "label": "Japanese",
                  "value": "ja"
                },
                {
                  "label": "Javanese",
                  "value": "jv"
                },
                {
                  "label": "Kalaallisut, Greenlandic",
                  "value": "kl"
                },
                {
                  "label": "Kannada",
                  "value": "kn"
                },
                {
                  "label": "Kanuri",
                  "value": "kr"
                },
                {
                  "label": "Kashmiri",
                  "value": "ks"
                },
                {
                  "label": "Kazakh",
                  "value": "kk"
                },
                {
                  "label": "Central Khmer",
                  "value": "km"
                },
                {
                  "label": "Kikuyu, Gikuyu",
                  "value": "ki"
                },
                {
                  "label": "Kinyarwanda",
                  "value": "rw"
                },
                {
                  "label": "Kirghiz, Kyrgyz",
                  "value": "ky"
                },
                {
                  "label": "Komi",
                  "value": "kv"
                },
                {
                  "label": "Kongo",
                  "value": "kg"
                },
                {
                  "label": "Korean",
                  "value": "ko"
                },
                {
                  "label": "Kurdish",
                  "value": "ku"
                },
                {
                  "label": "Kuanyama, Kwanyama",
                  "value": "kj"
                },
                {
                  "label": "Latin",
                  "value": "la"
                },
                {
                  "label": "Luxembourgish, Letzeburgesch",
                  "value": "lb"
                },
                {
                  "label": "Ganda",
                  "value": "lg"
                },
                {
                  "label": "Limburgan, Limburger, Limburgish",
                  "value": "li"
                },
                {
                  "label": "Lingala",
                  "value": "ln"
                },
                {
                  "label": "Lao",
                  "value": "lo"
                },
                {
                  "label": "Lithuanian",
                  "value": "lt"
                },
                {
                  "label": "Luba-Katanga",
                  "value": "lu"
                },
                {
                  "label": "Latvian",
                  "value": "lv"
                },
                {
                  "label": "Manx",
                  "value": "gv"
                },
                {
                  "label": "Macedonian",
                  "value": "mk"
                },
                {
                  "label": "Malagasy",
                  "value": "mg"
                },
                {
                  "label": "Malay",
                  "value": "ms"
                },
                {
                  "label": "Malayalam",
                  "value": "ml"
                },
                {
                  "label": "Maltese",
                  "value": "mt"
                },
                {
                  "label": "Maori",
                  "value": "mi"
                },
                {
                  "label": "Marathi",
                  "value": "mr"
                },
                {
                  "label": "Marshallese",
                  "value": "mh"
                },
                {
                  "label": "Mongolian",
                  "value": "mn"
                },
                {
                  "label": "Nauru",
                  "value": "na"
                },
                {
                  "label": "Navajo, Navaho",
                  "value": "nv"
                },
                {
                  "label": "North Ndebele",
                  "value": "nd"
                },
                {
                  "label": "Nepali",
                  "value": "ne"
                },
                {
                  "label": "Ndonga",
                  "value": "ng"
                },
                {
                  "label": "Norwegian Bokmål",
                  "value": "nb"
                },
                {
                  "label": "Norwegian Nynorsk",
                  "value": "nn"
                },
                {
                  "label": "Norwegian",
                  "value": "no"
                },
                {
                  "label": "Sichuan Yi, Nuosu",
                  "value": "ii"
                },
                {
                  "label": "South Ndebele",
                  "value": "nr"
                },
                {
                  "label": "Occitan",
                  "value": "oc"
                },
                {
                  "label": "Ojibwa",
                  "value": "oj"
                },
                {
                  "label": "Church Slavic, Old Slavonic, Church Slavonic, Old Bulgarian, Old Church Slavonic",
                  "value": "cu"
                },
                {
                  "label": "Oromo",
                  "value": "om"
                },
                {
                  "label": "Oriya",
                  "value": "or"
                },
                {
                  "label": "Ossetian, Ossetic",
                  "value": "os"
                },
                {
                  "label": "Punjabi, Panjabi",
                  "value": "pa"
                },
                {
                  "label": "Pali",
                  "value": "pi"
                },
                {
                  "label": "Persian",
                  "value": "fa"
                },
                {
                  "label": "Polish",
                  "value": "pl"
                },
                {
                  "label": "Pashto, Pushto",
                  "value": "ps"
                },
                {
                  "label": "Portuguese",
                  "value": "pt"
                },
                {
                  "label": "Quechua",
                  "value": "qu"
                },
                {
                  "label": "Romansh",
                  "value": "rm"
                },
                {
                  "label": "Rundi",
                  "value": "rn"
                },
                {
                  "label": "Romanian, Moldavian, Moldovan",
                  "value": "ro"
                },
                {
                  "label": "Russian",
                  "value": "ru"
                },
                {
                  "label": "Sanskrit",
                  "value": "sa"
                },
                {
                  "label": "Sardinian",
                  "value": "sc"
                },
                {
                  "label": "Sindhi",
                  "value": "sd"
                },
                {
                  "label": "Northern Sami",
                  "value": "se"
                },
                {
                  "label": "Samoan",
                  "value": "sm"
                },
                {
                  "label": "Sango",
                  "value": "sg"
                },
                {
                  "label": "Serbian",
                  "value": "sr"
                },
                {
                  "label": "Gaelic, Scottish Gaelic",
                  "value": "gd"
                },
                {
                  "label": "Shona",
                  "value": "sn"
                },
                {
                  "label": "Sinhala, Sinhalese",
                  "value": "si"
                },
                {
                  "label": "Slovak",
                  "value": "sk"
                },
                {
                  "label": "Slovenian",
                  "value": "sl"
                },
                {
                  "label": "Somali",
                  "value": "so"
                },
                {
                  "label": "Southern Sotho",
                  "value": "st"
                },
                {
                  "label": "Spanish, Castilian",
                  "value": "es"
                },
                {
                  "label": "Sundanese",
                  "value": "su"
                },
                {
                  "label": "Swahili",
                  "value": "sw"
                },
                {
                  "label": "Swati",
                  "value": "ss"
                },
                {
                  "label": "Swedish",
                  "value": "sv"
                },
                {
                  "label": "Tamil",
                  "value": "ta"
                },
                {
                  "label": "Telugu",
                  "value": "te"
                },
                {
                  "label": "Tajik",
                  "value": "tg"
                },
                {
                  "label": "Thai",
                  "value": "th"
                },
                {
                  "label": "Tigrinya",
                  "value": "ti"
                },
                {
                  "label": "Tibetan",
                  "value": "bo"
                },
                {
                  "label": "Turkmen",
                  "value": "tk"
                },
                {
                  "label": "Tagalog",
                  "value": "tl"
                },
                {
                  "label": "Tswana",
                  "value": "tn"
                },
                {
                  "label": "Tonga (Tonga Islands)",
                  "value": "to"
                },
                {
                  "label": "Turkish",
                  "value": "tr"
                },
                {
                  "label": "Tsonga",
                  "value": "ts"
                },
                {
                  "label": "Tatar",
                  "value": "tt"
                },
                {
                  "label": "Twi",
                  "value": "tw"
                },
                {
                  "label": "Tahitian",
                  "value": "ty"
                },
                {
                  "label": "Uighur, Uyghur",
                  "value": "ug"
                },
                {
                  "label": "Ukrainian",
                  "value": "uk"
                },
                {
                  "label": "Urdu",
                  "value": "ur"
                },
                {
                  "label": "Uzbek",
                  "value": "uz"
                },
                {
                  "label": "Venda",
                  "value": "ve"
                },
                {
                  "label": "Vietnamese",
                  "value": "vi"
                },
                {
                  "label": "Volapük",
                  "value": "vo"
                },
                {
                  "label": "Walloon",
                  "value": "wa"
                },
                {
                  "label": "Welsh",
                  "value": "cy"
                },
                {
                  "label": "Wolof",
                  "value": "wo"
                },
                {
                  "label": "Western Frisian",
                  "value": "fy"
                },
                {
                  "label": "Xhosa",
                  "value": "xh"
                },
                {
                  "label": "Yiddish",
                  "value": "yi"
                },
                {
                  "label": "Yoruba",
                  "value": "yo"
                },
                {
                  "label": "Zhuang, Chuang",
                  "value": "za"
                },
                {
                  "label": "Zulu",
                  "value": "zu"
                }
              ],
              "hint": "The site language."
            },
            {
              "label": "Site URL",
              "name": "siteUrl",
              "widget": "string",
              "hint": "The URL to this site. This is used in the sitemap."
            }
          ]
        },
        {
          "label": "Built-In Page Settings",
          "name": "builtInPageSettings",
          "file": "settings/built-in-pages/built-in-page-settings.json",
          "fields": [
            {
              "label": "Index (Homepage) Settings",
              "name": "indexSettings",
              "widget": "object",
              "hint": "Settings for the index (homepage).",
              "fields": [
                {
                  "label": "Index Page",
                  "name": "rawIndexSlug",
                  "widget": "relation",
                  "collection": "pages",
                  "searchFields": [
                    "title",
                    "rawSlug"
                  ],
                  "valueField": "rawSlug",
                  "displayFields": [
                    "title"
                  ],
                  "hint": "Page to show as the index, or homepage, of the site."
                }
              ]
            },
            {
              "label": "Category Post-Listing Page Settings",
              "name": "categoryPostListingPageSettings",
              "widget": "object",
              "hint": "Settings for the category pages that list posts within that category.",
              "fields": [
                {
                  "label": "Category Post Listing Page",
                  "name": "rawCategoryPostListingPageSlug",
                  "widget": "relation",
                  "collection": "pages",
                  "searchFields": [
                    "title",
                    "rawSlug"
                  ],
                  "valueField": "rawSlug",
                  "displayFields": [
                    "title"
                  ],
                  "hint": "Page to use as the category post listing page."
                },
                {
                  "label": "Content Title",
                  "name": "contentTitle",
                  "widget": "string",
                  "hint": "Name for the page. Used primarily for SEO. Can use {siteName}, {siteDescription}, and {contentCategoryName}."
                },
                {
                  "label": "Show Sidebar",
                  "name": "showSidebar",
                  "widget": "boolean",
                  "hint": "True to show the sidebar on this page, false otherwise."
                }
              ]
            },
            {
              "label": "Not Found (404) Page Settings",
              "name": "notFoundPageSettings",
              "widget": "object",
              "hint": "Settings for the Not Found page that is shown when linking to a page that doesn't exist.",
              "fields": [
                {
                  "label": "Not Found Page",
                  "name": "rawNotFoundPageSlug",
                  "widget": "relation",
                  "collection": "pages",
                  "searchFields": [
                    "title",
                    "rawSlug"
                  ],
                  "valueField": "rawSlug",
                  "displayFields": [
                    "title"
                  ],
                  "hint": "The 404 Not Found page."
                },
                {
                  "label": "Content Title",
                  "name": "contentTitle",
                  "widget": "string",
                  "hint": "The title of the Not Found page."
                },
                {
                  "label": "Featured Image",
                  "name": "featuredImage",
                  "widget": "object",
                  "fields": [
                    {
                      "label": "Use Featured Image",
                      "name": "featuredImageEnabled",
                      "widget": "boolean",
                      "hint": "When disabled, the featured image will not be shown for the Not Found page."
                    },
                    {
                      "label": "Featured Image",
                      "name": "featuredImageUrl",
                      "widget": "image",
                      "hint": "Recommended size is 1200x630 (1.91:1), and under 5MB. You can use Canva to edit, and can grab a free image here: https://www.pexels.com/"
                    },
                    {
                      "label": "Featured Image Alt",
                      "name": "featuredImageAlt",
                      "widget": "string",
                      "hint": "A description of what's happening in the custom image. This is used for accessibility, so visually impaired readers can know what's up. Set to none to disable."
                    }
                  ]
                },
                {
                  "label": "Headline",
                  "name": "headline",
                  "widget": "string",
                  "hint": "Headline shown at the top of the page."
                },
                {
                  "label": "Body Text",
                  "name": "bodyText",
                  "widget": "string",
                  "hint": "Body text shown under the headline."
                },
                {
                  "label": "Body Image",
                  "name": "bodyImage",
                  "widget": "image",
                  "hint": "Image shown under the text."
                },
                {
                  "label": "Body Image Alt",
                  "name": "bodyImageAlt",
                  "widget": "string",
                  "hint": "Description of the body image. For visually impaired users."
                },
                {
                  "label": "Button Text",
                  "name": "buttonText",
                  "widget": "string",
                  "hint": "Text shown on the button."
                },
                {
                  "label": "Button Url",
                  "name": "buttonUrl",
                  "widget": "string",
                  "hint": "URL that the button points to."
                }
              ]
            }
          ]
        },
        {
          "label": "Site-Wide SEO Settings",
          "name": "seoSettings",
          "file": "settings/seo/seo-settings.yml",
          "fields": [
            {
              "label": "SEO Title Separator",
              "name": "seoTitleSeparator",
              "widget": "string",
              "hint": "Separator for titles. For instance, use \" | \" or \" - \", without quotes. This will be used to separate the page name from the site name. Be sure to include spaces before and after the separator if desired."
            },
            {
              "label": "Site-Wide Post SEO Settings",
              "name": "siteWidePostSeoSettings",
              "widget": "object",
              "hint": "↑ Post SEO (Search Engine Optimization) templates can be used to quickly change SEO and sharing settings for all posts that don't override them.",
              "fields": [
                {
                  "label": "SEO Title",
                  "name": "seoTitle",
                  "widget": "string",
                  "hint": "The title shown in the browser tab and in Google search results. Use an attention-grabbing title and keep this to 50-60 characters or shorter for best results. You can use the tags {siteName}, {siteDescription}, {contentTitle}, and {contentSeoDescription}."
                },
                {
                  "label": "SEO Description",
                  "name": "seoDescription",
                  "widget": "string",
                  "hint": "A description of the content. Can also be an excerpt, if you want. At least two sentences long is recommended, and it should entice users to click. You can use the tags {siteName}, {siteDescription}, {contentTitle}, and {contentSeoDescription}."
                },
                {
                  "label": "SEO Image",
                  "name": "seoImage",
                  "widget": "object",
                  "hint": "↑ Select the image used when sharing. Unless customized below, this will be used as the Open Graph and Twitter Card image when sharing the page.",
                  "fields": [
                    {
                      "label": "Use Site Image",
                      "name": "useSiteImage",
                      "widget": "boolean",
                      "hint": "When switched on, the site image (specified in Site Settings) will be used and the Custom Image below will be ignored."
                    },
                    {
                      "label": "Custom SEO Image",
                      "name": "customSeoImage",
                      "widget": "image",
                      "hint": "To use a custom SEO image, you must disable Use Site Image above. Select an image that's bigger than 1200×630 and looks good when cropped into a square. Facebook recommends a 1200×630 (1.91:1) and will crop the top and bottom of larger images. Reddit will crop and resize images to 70×70. Twitter Cards can use either square or wide images depending on the card type being used, but the default is a square. Use a different URL for new images or the image won't be updated by Facebook."
                    },
                    {
                      "label": "Custom SEO Image Alt",
                      "name": "customSeoImageAlt",
                      "widget": "string",
                      "hint": "A description of what's happening in the custom image. This is used for accessibility, so visually impaired readers can know what's up."
                    }
                  ]
                },
                {
                  "label": "Open Graph",
                  "name": "openGraph",
                  "widget": "object",
                  "hint": "↑ Settings for Open Graph, a protocol that allows you to specify the information to show when someone shares your page.",
                  "fields": [
                    {
                      "label": "OG Title",
                      "name": "ogTitle",
                      "widget": "string",
                      "hint": "The title shown when someone shares your page. You can use the tags {siteName}, {siteDescription}, {contentTitle}, and {contentSeoDescription}."
                    },
                    {
                      "label": "OG Description",
                      "name": "ogDescription",
                      "widget": "string",
                      "hint": "The description shown when someone shares your page. At least two sentences long is recommended, and it should entice users to click. You can use the tags {siteName}, {siteDescription}, {contentTitle}, and {contentSeoDescription}."
                    },
                    {
                      "label": "Open Graph Image",
                      "name": "ogImage",
                      "widget": "object",
                      "hint": "Open Graph image settings.",
                      "fields": [
                        {
                          "label": "Use Custom OG Image",
                          "name": "ogUseCustomOgImage",
                          "widget": "boolean",
                          "hint": "Enable to use the custom image for Open Graph specified below. Otherwise, the SEO Image configured above will be used."
                        },
                        {
                          "label": "Custom OG Image",
                          "name": "ogCustomImage",
                          "widget": "image",
                          "hint": "The overridden image for Open Graph. You must switch on Use Custom OG Image above for this to take effect. Facebook recommends a 1200×630 (1.91:1) and will crop the top and bottom of larger images."
                        },
                        {
                          "label": "Custom OG Image Alt",
                          "name": "ogCustomImageAlt",
                          "widget": "string",
                          "hint": "A description of what's happening in the custom Open Graph image. This is for accessibility, so visually impaired readers can know what's up."
                        }
                      ]
                    }
                  ]
                },
                {
                  "label": "Twitter Cards",
                  "name": "twitterCards",
                  "widget": "object",
                  "hint": "↑ Settings for the Twitter Cards that are created when sharing your page on Twitter.",
                  "fields": [
                    {
                      "label": "Twitter Card Type",
                      "name": "twitterCardType",
                      "widget": "select",
                      "hint": "Choose the card type. Regular summary cards use a square image and place the image next to the content, while the summary card with large image places the image above the card's text.",
                      "options": [
                        {
                          "label": "Summary Card",
                          "value": "summary-card"
                        },
                        {
                          "label": "Summary Card With Large Image",
                          "value": "summary-card-with-large-image"
                        }
                      ]
                    },
                    {
                      "label": "Twitter Card Title",
                      "name": "twitterCardTitle",
                      "widget": "string",
                      "hint": "The title shown when someone shares your page on Twitter. You can use the tags {siteName}, {siteDescription}, {contentTitle}, and {contentSeoDescription}."
                    },
                    {
                      "label": "Twitter Card Description",
                      "name": "twitterCardDescription",
                      "widget": "string",
                      "hint": "The description shown when someone shares your page on Twitter. You can use the tags {siteName}, {siteDescription}, {contentTitle}, and {contentSeoDescription}."
                    },
                    {
                      "label": "Twitter Card Image",
                      "name": "twitterCardImage",
                      "widget": "object",
                      "hint": "Twitter Card image settings.",
                      "fields": [
                        {
                          "label": "Use Custom Twitter Card Image",
                          "name": "twitterCardUseCustomImage",
                          "widget": "boolean",
                          "hint": "Enable to override the SEO Image (above) for Twitter Cards, specifying a different one below."
                        },
                        {
                          "label": "Custom Twitter Card Image",
                          "name": "twitterCardCustomImage",
                          "widget": "image",
                          "hint": "The custom image for Twitter Cards. You must switch on Use Custom Twitter Card Image above for this to take effect. You should not use a generic image such as your website logo, author photo, or other image that spans multiple pages. Images for Summary Card support an aspect ratio of 1:1 with minimum dimensions of 144x144 or maximum of 4096x4096 pixels, and will be cropped to a square on all platforms. Images for Summary Card With Large Image support an aspect ratio of 2:1 with minimum dimensions of 300x157 or maximum of 4096x4096 pixels. Images must be less than 5MB in size. JPG, PNG, WEBP and GIF formats are supported. Only the first frame of an animated GIF will be used. SVG is not supported."
                        },
                        {
                          "label": "Custom Twitter Card Image Alt",
                          "name": "twitterCardCustomImageAlt",
                          "widget": "string",
                          "hint": "A description of what's happening in the custom Twitter Card image. This is for accessibility, so visually impaired readers can know what's up."
                        }
                      ]
                    },
                    {
                      "label": "Twitter Card Site Username",
                      "name": "twitterCardSiteUsername",
                      "widget": "string",
                      "hint": "The site username that the Twitter Card is attributed to, prefixed with the @ symbol. Use {twitterSiteUsername} to specify the site username set in Social & Sharing Settings."
                    }
                  ]
                }
              ]
            },
            {
              "label": "Site-Wide Page SEO Settings",
              "name": "siteWidePageSeoSettings",
              "widget": "object",
              "hint": "↑ Page SEO templates can be used to quickly change SEO and sharing settings for all pages that don't override them.",
              "fields": [
                {
                  "label": "SEO Title",
                  "name": "seoTitle",
                  "widget": "string",
                  "hint": "The title shown in the browser tab and in Google search results. Use an attention-grabbing title and keep this to 50-60 characters or shorter for best results. You can use the tags {siteName}, {siteDescription}, {contentTitle}, and {contentSeoDescription}."
                },
                {
                  "label": "SEO Description",
                  "name": "seoDescription",
                  "widget": "string",
                  "hint": "A description of the content. Can also be an excerpt, if you want. At least two sentences long is recommended, and it should entice users to click. You can use the tags {siteName}, {siteDescription}, {contentTitle}, and {contentSeoDescription}."
                },
                {
                  "label": "SEO Image",
                  "name": "seoImage",
                  "widget": "object",
                  "hint": "↑ Select the image used when sharing. Unless customized below, this will be used as the Open Graph and Twitter Card image when sharing the page.",
                  "fields": [
                    {
                      "label": "Use Site Image",
                      "name": "useSiteImage",
                      "widget": "boolean",
                      "hint": "When switched on, the site image (specified in Site Settings) will be used and the Custom Image below will be ignored."
                    },
                    {
                      "label": "Custom SEO Image",
                      "name": "customSeoImage",
                      "widget": "image",
                      "hint": "To use a custom SEO image, you must disable Use Site Image above. Select an image that's bigger than 1200×630 and looks good when cropped into a square. Facebook recommends a 1200×630 (1.91:1) and will crop the top and bottom of larger images. Reddit will crop and resize images to 70×70. Twitter Cards can use either square or wide images depending on the card type being used, but the default is a square. Use a different URL for new images or the image won't be updated by Facebook."
                    },
                    {
                      "label": "Custom SEO Image Alt",
                      "name": "customSeoImageAlt",
                      "widget": "string",
                      "hint": "A description of what's happening in the custom image. This is used for accessibility, so visually impaired readers can know what's up."
                    }
                  ]
                },
                {
                  "label": "Open Graph",
                  "name": "openGraph",
                  "widget": "object",
                  "hint": "↑ Settings for Open Graph, a protocol that allows you to specify the information to show when someone shares your page.",
                  "fields": [
                    {
                      "label": "OG Title",
                      "name": "ogTitle",
                      "widget": "string",
                      "hint": "The title shown when someone shares your page. You can use the tags {siteName}, {siteDescription}, {contentTitle}, and {contentSeoDescription}."
                    },
                    {
                      "label": "OG Description",
                      "name": "ogDescription",
                      "widget": "string",
                      "hint": "The description shown when someone shares your page. At least two sentences long is recommended, and it should entice users to click. You can use the tags {siteName}, {siteDescription}, {contentTitle}, and {contentSeoDescription}."
                    },
                    {
                      "label": "Open Graph Image",
                      "name": "ogImage",
                      "widget": "object",
                      "hint": "Open Graph image settings.",
                      "fields": [
                        {
                          "label": "Use Custom OG Image",
                          "name": "ogUseCustomOgImage",
                          "widget": "boolean",
                          "hint": "Enable to use the custom image for Open Graph specified below. Otherwise, the SEO Image configured above will be used."
                        },
                        {
                          "label": "Custom OG Image",
                          "name": "ogCustomImage",
                          "widget": "image",
                          "hint": "The overridden image for Open Graph. You must switch on Use Custom OG Image above for this to take effect. Facebook recommends a 1200×630 (1.91:1) and will crop the top and bottom of larger images."
                        },
                        {
                          "label": "Custom OG Image Alt",
                          "name": "ogCustomImageAlt",
                          "widget": "string",
                          "hint": "A description of what's happening in the custom Open Graph image. This is for accessibility, so visually impaired readers can know what's up."
                        }
                      ]
                    }
                  ]
                },
                {
                  "label": "Twitter Cards",
                  "name": "twitterCards",
                  "widget": "object",
                  "hint": "↑ Settings for the Twitter Cards that are created when sharing your page on Twitter.",
                  "fields": [
                    {
                      "label": "Twitter Card Type",
                      "name": "twitterCardType",
                      "widget": "select",
                      "hint": "Choose the card type. Regular summary cards use a square image and place the image next to the content, while the summary card with large image places the image above the card's text.",
                      "options": [
                        {
                          "label": "Summary Card",
                          "value": "summary-card"
                        },
                        {
                          "label": "Summary Card With Large Image",
                          "value": "summary-card-with-large-image"
                        }
                      ]
                    },
                    {
                      "label": "Twitter Card Title",
                      "name": "twitterCardTitle",
                      "widget": "string",
                      "hint": "The title shown when someone shares your page on Twitter. You can use the tags {siteName}, {siteDescription}, {contentTitle}, and {contentSeoDescription}."
                    },
                    {
                      "label": "Twitter Card Description",
                      "name": "twitterCardDescription",
                      "widget": "string",
                      "hint": "The description shown when someone shares your page on Twitter. You can use the tags {siteName}, {siteDescription}, {contentTitle}, and {contentSeoDescription}."
                    },
                    {
                      "label": "Twitter Card Image",
                      "name": "twitterCardImage",
                      "widget": "object",
                      "hint": "Twitter Card image settings.",
                      "fields": [
                        {
                          "label": "Use Custom Twitter Card Image",
                          "name": "twitterCardUseCustomImage",
                          "widget": "boolean",
                          "hint": "Enable to override the SEO Image (above) for Twitter Cards, specifying a different one below."
                        },
                        {
                          "label": "Custom Twitter Card Image",
                          "name": "twitterCardCustomImage",
                          "widget": "image",
                          "hint": "The custom image for Twitter Cards. You must switch on Use Custom Twitter Card Image above for this to take effect. You should not use a generic image such as your website logo, author photo, or other image that spans multiple pages. Images for Summary Card support an aspect ratio of 1:1 with minimum dimensions of 144x144 or maximum of 4096x4096 pixels, and will be cropped to a square on all platforms. Images for Summary Card With Large Image support an aspect ratio of 2:1 with minimum dimensions of 300x157 or maximum of 4096x4096 pixels. Images must be less than 5MB in size. JPG, PNG, WEBP and GIF formats are supported. Only the first frame of an animated GIF will be used. SVG is not supported."
                        },
                        {
                          "label": "Custom Twitter Card Image Alt",
                          "name": "twitterCardCustomImageAlt",
                          "widget": "string",
                          "hint": "A description of what's happening in the custom Twitter Card image. This is for accessibility, so visually impaired readers can know what's up."
                        }
                      ]
                    },
                    {
                      "label": "Twitter Card Site Username",
                      "name": "twitterCardSiteUsername",
                      "widget": "string",
                      "hint": "The site username that the Twitter Card is attributed to, prefixed with the @ symbol. Use {twitterSiteUsername} to specify the site username set in Social & Sharing Settings."
                    }
                  ]
                }
              ]
            },
            {
              "label": "Index (Homepage) SEO Settings",
              "name": "indexSeoSettings",
              "widget": "object",
              "hint": "↑ SEO settings for the index, the front page of the site. Includes the page title shown in Google, Open Graph settings for sharing, and settings for Twitter Cards.",
              "fields": [
                {
                  "label": "SEO Title",
                  "name": "seoTitle",
                  "widget": "string",
                  "hint": "The title shown in the browser tab and in Google search results. Use an attention-grabbing title and keep this to 50-60 characters or shorter for best results. You can use the tags {siteName} and {siteDescription}."
                },
                {
                  "label": "SEO Description",
                  "name": "seoDescription",
                  "widget": "string",
                  "hint": "A description of the content. Can also be an excerpt, if you want. At least two sentences long is recommended, and it should entice users to click. You can use the tags {siteName} and {siteDescription}."
                },
                {
                  "label": "SEO Image",
                  "name": "seoImage",
                  "widget": "object",
                  "hint": "↑ Select the image used when sharing. Unless customized below, this will be used as the Open Graph and Twitter Card image when sharing the page.",
                  "fields": [
                    {
                      "label": "Use Site Image",
                      "name": "useSiteImage",
                      "widget": "boolean",
                      "hint": "When switched on, the site image (specified in Site Settings) will be used and the Custom Image below will be ignored."
                    },
                    {
                      "label": "Custom SEO Image",
                      "name": "customSeoImage",
                      "widget": "image",
                      "hint": "To use a custom SEO image, you must disable Use Site Image above. Select an image that's bigger than 1200×630 and looks good when cropped into a square. Facebook recommends a 1200×630 (1.91:1) and will crop the top and bottom of larger images. Reddit will crop and resize images to 70×70. Twitter Cards can use either square or wide images depending on the card type being used, but the default is a square. Use a different URL for new images or the image won't be updated by Facebook."
                    },
                    {
                      "label": "Custom SEO Image Alt",
                      "name": "customSeoImageAlt",
                      "widget": "string",
                      "hint": "A description of what's happening in the custom image. This is used for accessibility, so visually impaired readers can know what's up."
                    }
                  ]
                },
                {
                  "label": "Open Graph",
                  "name": "openGraph",
                  "widget": "object",
                  "hint": "↑ Settings for Open Graph, a protocol that allows you to specify the information to show when someone shares your page.",
                  "fields": [
                    {
                      "label": "OG Title",
                      "name": "ogTitle",
                      "widget": "string",
                      "hint": "The title shown when someone shares your page. You can use the tags {siteName} and {siteDescription}."
                    },
                    {
                      "label": "OG Description",
                      "name": "ogDescription",
                      "widget": "string",
                      "hint": "The description shown when someone shares your page. At least two sentences long is recommended, and it should entice users to click. You can use the tags {siteName} and {siteDescription}."
                    },
                    {
                      "label": "Open Graph Image",
                      "name": "ogImage",
                      "widget": "object",
                      "hint": "Open Graph image settings.",
                      "fields": [
                        {
                          "label": "Use Custom OG Image",
                          "name": "ogUseCustomOgImage",
                          "widget": "boolean",
                          "hint": "Enable to use the custom image for Open Graph specified below. Otherwise, the SEO Image configured above will be used."
                        },
                        {
                          "label": "Custom OG Image",
                          "name": "ogCustomImage",
                          "widget": "image",
                          "hint": "The overridden image for Open Graph. You must switch on Use Custom OG Image above for this to take effect. Facebook recommends a 1200×630 (1.91:1) and will crop the top and bottom of larger images."
                        },
                        {
                          "label": "Custom OG Image Alt",
                          "name": "ogCustomImageAlt",
                          "widget": "string",
                          "hint": "A description of what's happening in the custom Open Graph image. This is for accessibility, so visually impaired readers can know what's up."
                        }
                      ]
                    }
                  ]
                },
                {
                  "label": "Twitter Cards",
                  "name": "twitterCards",
                  "widget": "object",
                  "hint": "↑ Settings for the Twitter Cards that are created when sharing your page on Twitter.",
                  "fields": [
                    {
                      "label": "Twitter Card Type",
                      "name": "twitterCardType",
                      "widget": "select",
                      "hint": "Choose the card type. Regular summary cards use a square image and place the image next to the content, while the summary card with large image places the image above the card's text.",
                      "options": [
                        {
                          "label": "Summary Card",
                          "value": "summary-card"
                        },
                        {
                          "label": "Summary Card With Large Image",
                          "value": "summary-card-with-large-image"
                        }
                      ]
                    },
                    {
                      "label": "Twitter Card Title",
                      "name": "twitterCardTitle",
                      "widget": "string",
                      "hint": "The title shown when someone shares your page on Twitter. You can use the tags {siteName} and {siteDescription}."
                    },
                    {
                      "label": "Twitter Card Description",
                      "name": "twitterCardDescription",
                      "widget": "string",
                      "hint": "The description shown when someone shares your page on Twitter. You can use the tags {siteName} and {siteDescription}."
                    },
                    {
                      "label": "Twitter Card Image",
                      "name": "twitterCardImage",
                      "widget": "object",
                      "hint": "Twitter Card image settings.",
                      "fields": [
                        {
                          "label": "Use Custom Twitter Card Image",
                          "name": "twitterCardUseCustomImage",
                          "widget": "boolean",
                          "hint": "Enable to override the SEO Image (above) for Twitter Cards, specifying a different one below."
                        },
                        {
                          "label": "Custom Twitter Card Image",
                          "name": "twitterCardCustomImage",
                          "widget": "image",
                          "hint": "The custom image for Twitter Cards. You must switch on Use Custom Twitter Card Image above for this to take effect. You should not use a generic image such as your website logo, author photo, or other image that spans multiple pages. Images for Summary Card support an aspect ratio of 1:1 with minimum dimensions of 144x144 or maximum of 4096x4096 pixels, and will be cropped to a square on all platforms. Images for Summary Card With Large Image support an aspect ratio of 2:1 with minimum dimensions of 300x157 or maximum of 4096x4096 pixels. Images must be less than 5MB in size. JPG, PNG, WEBP and GIF formats are supported. Only the first frame of an animated GIF will be used. SVG is not supported."
                        },
                        {
                          "label": "Custom Twitter Card Image Alt",
                          "name": "twitterCardCustomImageAlt",
                          "widget": "string",
                          "hint": "A description of what's happening in the custom Twitter Card image. This is for accessibility, so visually impaired readers can know what's up."
                        }
                      ]
                    },
                    {
                      "label": "Twitter Card Site Username",
                      "name": "twitterCardSiteUsername",
                      "widget": "string",
                      "hint": "The site username that the Twitter Card is attributed to, prefixed with the @ symbol. Use {twitterSiteUsername} to specify the site username set in Social & Sharing Settings."
                    }
                  ]
                }
              ]
            },
            {
              "label": "Category Post-Listing Page SEO Settings",
              "name": "categoryPostListingPageSettings",
              "widget": "object",
              "hint": "Pages that list posts",
              "fields": [
                {
                  "label": "SEO Title",
                  "name": "seoTitle",
                  "widget": "string",
                  "hint": "The title shown in the browser tab and in Google search results. Use an attention-grabbing title and keep this to 50-60 characters or shorter for best results. You can use the tags {siteName}, {siteDescription}, and {contentCategoryName}."
                },
                {
                  "label": "SEO Description",
                  "name": "seoDescription",
                  "widget": "string",
                  "hint": "A description of the content. Can also be an excerpt, if you want. At least two sentences long is recommended, and it should entice users to click. You can use the tags {siteName}, {siteDescription}, and {contentCategoryName}."
                },
                {
                  "label": "SEO Image",
                  "name": "seoImage",
                  "widget": "object",
                  "hint": "↑ Select the image used when sharing. Unless customized below, this will be used as the Open Graph and Twitter Card image when sharing the page.",
                  "fields": [
                    {
                      "label": "Use Site Image",
                      "name": "useSiteImage",
                      "widget": "boolean",
                      "hint": "When switched on, the site image (specified in Site Settings) will be used and the Custom Image below will be ignored."
                    },
                    {
                      "label": "Custom SEO Image",
                      "name": "customSeoImage",
                      "widget": "image",
                      "hint": "To use a custom SEO image, you must disable Use Site Image above. Select an image that's bigger than 1200×630 and looks good when cropped into a square. Facebook recommends a 1200×630 (1.91:1) and will crop the top and bottom of larger images. Reddit will crop and resize images to 70×70. Twitter Cards can use either square or wide images depending on the card type being used, but the default is a square. Use a different URL for new images or the image won't be updated by Facebook."
                    },
                    {
                      "label": "Custom SEO Image Alt",
                      "name": "customSeoImageAlt",
                      "widget": "string",
                      "hint": "A description of what's happening in the custom image. This is used for accessibility, so visually impaired readers can know what's up."
                    }
                  ]
                },
                {
                  "label": "Open Graph",
                  "name": "openGraph",
                  "widget": "object",
                  "hint": "↑ Settings for Open Graph, a protocol that allows you to specify the information to show when someone shares your page.",
                  "fields": [
                    {
                      "label": "OG Title",
                      "name": "ogTitle",
                      "widget": "string",
                      "hint": "The title shown when someone shares your page. You can use the tags {siteName}, {siteDescription}, and {contentCategoryName}."
                    },
                    {
                      "label": "OG Description",
                      "name": "ogDescription",
                      "widget": "string",
                      "hint": "The description shown when someone shares your page. At least two sentences long is recommended, and it should entice users to click. You can use the tags {siteName}, {siteDescription}, and {contentCategoryName}."
                    },
                    {
                      "label": "Open Graph Image",
                      "name": "ogImage",
                      "widget": "object",
                      "hint": "Open Graph image settings.",
                      "fields": [
                        {
                          "label": "Use Custom OG Image",
                          "name": "ogUseCustomOgImage",
                          "widget": "boolean",
                          "hint": "Enable to use the custom image for Open Graph specified below. Otherwise, the SEO Image configured above will be used."
                        },
                        {
                          "label": "Custom OG Image",
                          "name": "ogCustomImage",
                          "widget": "image",
                          "hint": "The overridden image for Open Graph. You must switch on Use Custom OG Image above for this to take effect. Facebook recommends a 1200×630 (1.91:1) and will crop the top and bottom of larger images."
                        },
                        {
                          "label": "Custom OG Image Alt",
                          "name": "ogCustomImageAlt",
                          "widget": "string",
                          "hint": "A description of what's happening in the custom Open Graph image. This is for accessibility, so visually impaired readers can know what's up."
                        }
                      ]
                    }
                  ]
                },
                {
                  "label": "Twitter Cards",
                  "name": "twitterCards",
                  "widget": "object",
                  "hint": "↑ Settings for the Twitter Cards that are created when sharing your page on Twitter.",
                  "fields": [
                    {
                      "label": "Twitter Card Type",
                      "name": "twitterCardType",
                      "widget": "select",
                      "hint": "Choose the card type. Regular summary cards use a square image and place the image next to the content, while the summary card with large image places the image above the card's text.",
                      "options": [
                        {
                          "label": "Summary Card",
                          "value": "summary-card"
                        },
                        {
                          "label": "Summary Card With Large Image",
                          "value": "summary-card-with-large-image"
                        }
                      ]
                    },
                    {
                      "label": "Twitter Card Title",
                      "name": "twitterCardTitle",
                      "widget": "string",
                      "hint": "The title shown when someone shares your page on Twitter. You can use the tags {siteName}, {siteDescription}, and {contentCategoryName}."
                    },
                    {
                      "label": "Twitter Card Description",
                      "name": "twitterCardDescription",
                      "widget": "string",
                      "hint": "The description shown when someone shares your page on Twitter. You can use the tags {siteName}, {siteDescription}, and {contentCategoryName}."
                    },
                    {
                      "label": "Twitter Card Image",
                      "name": "twitterCardImage",
                      "widget": "object",
                      "hint": "Twitter Card image settings.",
                      "fields": [
                        {
                          "label": "Use Custom Twitter Card Image",
                          "name": "twitterCardUseCustomImage",
                          "widget": "boolean",
                          "hint": "Enable to override the SEO Image (above) for Twitter Cards, specifying a different one below."
                        },
                        {
                          "label": "Custom Twitter Card Image",
                          "name": "twitterCardCustomImage",
                          "widget": "image",
                          "hint": "The custom image for Twitter Cards. You must switch on Use Custom Twitter Card Image above for this to take effect. You should not use a generic image such as your website logo, author photo, or other image that spans multiple pages. Images for Summary Card support an aspect ratio of 1:1 with minimum dimensions of 144x144 or maximum of 4096x4096 pixels, and will be cropped to a square on all platforms. Images for Summary Card With Large Image support an aspect ratio of 2:1 with minimum dimensions of 300x157 or maximum of 4096x4096 pixels. Images must be less than 5MB in size. JPG, PNG, WEBP and GIF formats are supported. Only the first frame of an animated GIF will be used. SVG is not supported."
                        },
                        {
                          "label": "Custom Twitter Card Image Alt",
                          "name": "twitterCardCustomImageAlt",
                          "widget": "string",
                          "hint": "A description of what's happening in the custom Twitter Card image. This is for accessibility, so visually impaired readers can know what's up."
                        }
                      ]
                    },
                    {
                      "label": "Twitter Card Site Username",
                      "name": "twitterCardSiteUsername",
                      "widget": "string",
                      "hint": "The site username that the Twitter Card is attributed to, prefixed with the @ symbol. Use {twitterSiteUsername} to specify the site username set in Social & Sharing Settings."
                    }
                  ]
                }
              ]
            },
            {
              "label": "Not Found (404) Page SEO Settings",
              "name": "notFoundPageSeoSettings",
              "widget": "object",
              "hint": "SEO settings for the 404 Not Found page.",
              "fields": [
                {
                  "label": "SEO Title",
                  "name": "seoTitle",
                  "widget": "string",
                  "hint": "The title shown in the browser tab and in Google search results. Use an attention-grabbing title and keep this to 50-60 characters or shorter for best results. You can use the tags {siteName}, {siteDescription}, {contentTitle}, and {contentSeoDescription}."
                },
                {
                  "label": "SEO Description",
                  "name": "seoDescription",
                  "widget": "string",
                  "hint": "A description of the content. Can also be an excerpt, if you want. At least two sentences long is recommended, and it should entice users to click. You can use the tags {siteName}, {siteDescription}, {contentTitle}, and {contentSeoDescription}."
                },
                {
                  "label": "SEO Image",
                  "name": "seoImage",
                  "widget": "object",
                  "hint": "↑ Select the image used when sharing. Unless customized below, this will be used as the Open Graph and Twitter Card image when sharing the page.",
                  "fields": [
                    {
                      "label": "SEO Image Used",
                      "name": "seoImageSelection",
                      "widget": "select",
                      "hint": "Specify which image should be used for SEO. ⮞ Featured Image (If Enabled): The featured image will be used for SEO. If \"Use Featured Image\" is disabled for the Not Found page in Built-In Page Settings, it will fall back to the site image specified in Site Settings. ⮞ Custom Image: The image specified below will be used for SEO. Choose this option if you want a different SEO image from the featured or fallback site one.",
                      "options": [
                        {
                          "label": "Featured Image (If Enabled)",
                          "value": "featured-image-if-enabled"
                        },
                        {
                          "label": "Custom Image",
                          "value": "custom-image"
                        }
                      ]
                    },
                    {
                      "label": "Custom SEO Image",
                      "name": "customSeoImage",
                      "widget": "image",
                      "hint": "To use a custom SEO image, you must disable Use Site Image above. Select an image that's bigger than 1200×630 and looks good when cropped into a square. Facebook recommends a 1200×630 (1.91:1) and will crop the top and bottom of larger images. Reddit will crop and resize images to 70×70. Twitter Cards can use either square or wide images depending on the card type being used, but the default is a square. Use a different URL for new images or the image won't be updated by Facebook."
                    },
                    {
                      "label": "Custom SEO Image Alt",
                      "name": "customSeoImageAlt",
                      "widget": "string",
                      "hint": "A description of what's happening in the custom image. This is used for accessibility, so visually impaired readers can know what's up."
                    }
                  ]
                },
                {
                  "label": "Open Graph",
                  "name": "openGraph",
                  "widget": "object",
                  "hint": "↑ Settings for Open Graph, a protocol that allows you to specify the information to show when someone shares your page.",
                  "fields": [
                    {
                      "label": "OG Title",
                      "name": "ogTitle",
                      "widget": "string",
                      "hint": "The title shown when someone shares your page. You can use the tags {siteName}, {siteDescription}, {contentTitle}, and {contentSeoDescription}."
                    },
                    {
                      "label": "OG Description",
                      "name": "ogDescription",
                      "widget": "string",
                      "hint": "The description shown when someone shares your page. At least two sentences long is recommended, and it should entice users to click. You can use the tags {siteName}, {siteDescription}, {contentTitle}, and {contentSeoDescription}."
                    },
                    {
                      "label": "Open Graph Image",
                      "name": "ogImage",
                      "widget": "object",
                      "hint": "Open Graph image settings.",
                      "fields": [
                        {
                          "label": "Use Custom OG Image",
                          "name": "ogUseCustomOgImage",
                          "widget": "boolean",
                          "hint": "Enable to use the custom image for Open Graph specified below. Otherwise, the SEO Image configured above will be used."
                        },
                        {
                          "label": "Custom OG Image",
                          "name": "ogCustomImage",
                          "widget": "image",
                          "hint": "The overridden image for Open Graph. You must switch on Use Custom OG Image above for this to take effect. Facebook recommends a 1200×630 (1.91:1) and will crop the top and bottom of larger images."
                        },
                        {
                          "label": "Custom OG Image Alt",
                          "name": "ogCustomImageAlt",
                          "widget": "string",
                          "hint": "A description of what's happening in the custom Open Graph image. This is for accessibility, so visually impaired readers can know what's up."
                        }
                      ]
                    }
                  ]
                },
                {
                  "label": "Twitter Cards",
                  "name": "twitterCards",
                  "widget": "object",
                  "hint": "↑ Settings for the Twitter Cards that are created when sharing your page on Twitter.",
                  "fields": [
                    {
                      "label": "Twitter Card Type",
                      "name": "twitterCardType",
                      "widget": "select",
                      "hint": "Choose the card type. Regular summary cards use a square image and place the image next to the content, while the summary card with large image places the image above the card's text.",
                      "options": [
                        {
                          "label": "Summary Card",
                          "value": "summary-card"
                        },
                        {
                          "label": "Summary Card With Large Image",
                          "value": "summary-card-with-large-image"
                        }
                      ]
                    },
                    {
                      "label": "Twitter Card Title",
                      "name": "twitterCardTitle",
                      "widget": "string",
                      "hint": "The title shown when someone shares your page on Twitter. You can use the tags {siteName}, {siteDescription}, {contentTitle}, and {contentSeoDescription}."
                    },
                    {
                      "label": "Twitter Card Description",
                      "name": "twitterCardDescription",
                      "widget": "string",
                      "hint": "The description shown when someone shares your page on Twitter. You can use the tags {siteName}, {siteDescription}, {contentTitle}, and {contentSeoDescription}."
                    },
                    {
                      "label": "Twitter Card Image",
                      "name": "twitterCardImage",
                      "widget": "object",
                      "hint": "Twitter Card image settings.",
                      "fields": [
                        {
                          "label": "Use Custom Twitter Card Image",
                          "name": "twitterCardUseCustomImage",
                          "widget": "boolean",
                          "hint": "Enable to override the SEO Image (above) for Twitter Cards, specifying a different one below."
                        },
                        {
                          "label": "Custom Twitter Card Image",
                          "name": "twitterCardCustomImage",
                          "widget": "image",
                          "hint": "The custom image for Twitter Cards. You must switch on Use Custom Twitter Card Image above for this to take effect. You should not use a generic image such as your website logo, author photo, or other image that spans multiple pages. Images for Summary Card support an aspect ratio of 1:1 with minimum dimensions of 144x144 or maximum of 4096x4096 pixels, and will be cropped to a square on all platforms. Images for Summary Card With Large Image support an aspect ratio of 2:1 with minimum dimensions of 300x157 or maximum of 4096x4096 pixels. Images must be less than 5MB in size. JPG, PNG, WEBP and GIF formats are supported. Only the first frame of an animated GIF will be used. SVG is not supported."
                        },
                        {
                          "label": "Custom Twitter Card Image Alt",
                          "name": "twitterCardCustomImageAlt",
                          "widget": "string",
                          "hint": "A description of what's happening in the custom Twitter Card image. This is for accessibility, so visually impaired readers can know what's up."
                        }
                      ]
                    },
                    {
                      "label": "Twitter Card Site Username",
                      "name": "twitterCardSiteUsername",
                      "widget": "string",
                      "hint": "The site username that the Twitter Card is attributed to, prefixed with the @ symbol. Use {twitterSiteUsername} to specify the site username set in Social & Sharing Settings."
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "label": "Contact Form Settings",
          "name": "contactFormSettings",
          "file": "settings/contact/contact-form-settings.yml",
          "fields": [
            {
              "label": "Form Action URL",
              "name": "contactFormActionUrl",
              "widget": "string",
              "hint": "The URL to which the contact form is submitted."
            },
            {
              "label": "Form Method Attribute (Synchronous Only)",
              "name": "contactFormMethod",
              "widget": "string",
              "hint": "Set the HTTP method attribute for the form. Generally this will be POST (default) or GET. Does not apply if the form is sent asynchronously (see below). This attribute will be given to the HTML <form> tag itself."
            },
            {
              "label": "Form Name Attribute",
              "name": "contactFormNameAttribute",
              "widget": "string",
              "hint": "The name attribute for the form. This attribute will be given to the HTML <form> tag itself."
            },
            {
              "label": "Send Form Asynchronously (No Page Reload)",
              "name": "contactFormAsyncEnabled",
              "widget": "boolean",
              "hint": "When switched on, the form will be sent asynchronously with the POST method. Turning this on generally creates a better user experience. When off, the browser will submit using the method above and the page will do a full reload. (Async uses the browser Fetch API. For advanced configuration options, see the documentation)"
            },
            {
              "label": "Controls",
              "name": "contactFormControls",
              "widget": "object",
              "fields": [
                {
                  "label": "Fields",
                  "name": "fields",
                  "widget": "list",
                  "hint": "You can have as many fields as you'd like. At a minimum, most contact forms have a name, email, and message.",
                  "fields": [
                    {
                      "label": "Field Label Text",
                      "name": "label",
                      "widget": "string",
                      "default": "Contact Form Field",
                      "hint": "The label text shown for the field. Examples: Name, Email, Subject, Message"
                    },
                    {
                      "label": "Field Name Attribute",
                      "name": "nameAttribute",
                      "widget": "string",
                      "hint": "The name attribute for this field. Must be unique among the other fields! Examples: name, emailAddress, subject, message"
                    },
                    {
                      "label": "Initial Value",
                      "name": "initialValue",
                      "widget": "string",
                      "required": false,
                      "default": "",
                      "hint": "The initial value for the field."
                    },
                    {
                      "label": "Field Type",
                      "name": "type",
                      "widget": "select",
                      "options": [
                        {
                          "label": "Text",
                          "value": "text"
                        },
                        {
                          "label": "Email",
                          "value": "email"
                        },
                        {
                          "label": "Textarea",
                          "value": "textarea"
                        },
                        {
                          "label": "Hidden",
                          "value": "hidden"
                        }
                      ],
                      "default": "text",
                      "hint": "Select the type of field. Text fields are a single line, email fields will be validated by the browser automatically, and text areas offer multple lines of input."
                    },
                    {
                      "label": "Field Placeholder Text",
                      "name": "placeholder",
                      "widget": "string",
                      "default": "Enter this field",
                      "hint": "The placeholder text shown in the field when nothing has been entered yet."
                    },
                    {
                      "label": "Required?",
                      "name": "required",
                      "widget": "boolean",
                      "default": true,
                      "hint": "Whether this will be a required field or not. If required, the form will not submit until it has been filled in."
                    },
                    {
                      "label": "Required Field Error Text",
                      "name": "requiredErrorText",
                      "widget": "string",
                      "default": "This field is required.",
                      "hint": "The error message shown when a required field is not filled in. The browser may override this message with its own."
                    }
                  ]
                },
                {
                  "label": "Submit Button Text",
                  "name": "submitButtonText",
                  "widget": "string",
                  "default": "Send",
                  "hint": "The text used on the submit button."
                }
              ]
            }
          ]
        },
        {
          "label": "Mailing List Settings",
          "name": "mailingListSettings",
          "file": "settings/mailing-list/mailing-list-settings.yml",
          "fields": [
            {
              "label": "Form Action URL",
              "name": "mailingListFormActionUrl",
              "widget": "string",
              "hint": "The URL to which the mailing list form is submitted."
            },
            {
              "label": "Form Method Attribute (Synchronous Only)",
              "name": "mailingListFormMethod",
              "widget": "string",
              "hint": "Set the HTTP method attribute for the form. Generally this will be POST (default) or GET. Does not apply if the form is sent asynchronously (see below). This attribute will be given to the HTML <form> tag itself."
            },
            {
              "label": "Form Name Attribute",
              "name": "mailingListFormNameAttribute",
              "widget": "string",
              "hint": "The name attribute for the form. This attribute will be given to the HTML <form> tag itself."
            },
            {
              "label": "Email Address Name Attribute",
              "name": "mailingListEmailAddressFieldNameAttribute",
              "widget": "string",
              "hint": "The name attribute for the email address input field. This attribute will be given to the HTML <input> tag itself."
            },
            {
              "label": "Email Address Field Placeholder",
              "name": "mailingListEmailAddressFieldPlaceholder",
              "widget": "string",
              "hint": "The placeholder when no email has been entered yet."
            },
            {
              "label": "Send Form Asynchronously (No Page Reload)",
              "name": "mailingListAsyncEnabled",
              "widget": "boolean",
              "hint": "When switched on, the form will be sent asynchronously with the POST method. Turning this on generally creates a better user experience. When off, the browser will submit using the method above and the page will do a full reload. (Async uses the browser Fetch API. For advanced configuration options, see the documentation)"
            },
            {
              "label": "Sidebar Mailing List Widget",
              "name": "sidebarWidget",
              "widget": "object",
              "hint": "Settings for the sidebar widget.",
              "fields": [
                {
                  "label": "Enable Mailing List Sidebar Widget",
                  "name": "enabled",
                  "widget": "boolean",
                  "hint": "Turns the sidebar mailing list widget on/off."
                },
                {
                  "label": "Header Image",
                  "name": "headerImage",
                  "widget": "image",
                  "hint": "The header image shown at the top of the sidebar widget."
                },
                {
                  "label": "Title Text",
                  "name": "titleText",
                  "widget": "string",
                  "hint": "The title text. This catchy headline should entice the reader into signing up!"
                },
                {
                  "label": "Body Text",
                  "name": "bodyText",
                  "widget": "text",
                  "hint": "The body text. Explain the benefits of signing up here. Make it irresistible. Supports HTML."
                },
                {
                  "label": "Button Text",
                  "name": "buttonText",
                  "widget": "string",
                  "hint": "The text shown on the submit button."
                },
                {
                  "label": "Privacy Text",
                  "name": "privacyText",
                  "widget": "string",
                  "hint": "The text shown under the email field that assures the user their privacy is important to you."
                },
                {
                  "label": "Error Submitting Text",
                  "name": "errorSubmittingText",
                  "widget": "string",
                  "hint": "The text shown when there is an error submitting the form."
                },
                {
                  "label": "Success Image",
                  "name": "successImage",
                  "widget": "image",
                  "hint": "The success image, shown in place of the header image when submitting is successful."
                },
                {
                  "label": "Success Title Text",
                  "name": "successTitleText",
                  "widget": "string",
                  "hint": "The title text shown when finished submitting."
                },
                {
                  "label": "Success Body Text",
                  "name": "successBodyText",
                  "widget": "text",
                  "hint": "The message shown when finished submitting. Supports HTML."
                }
              ]
            },
            {
              "label": "Footer Mailing List Section",
              "name": "footerMailingListSection",
              "widget": "object",
              "hint": "Settings for the footer mailing list section.",
              "fields": [
                {
                  "label": "Enable Mailing List Footer Section",
                  "name": "enabled",
                  "widget": "boolean",
                  "hint": "Turns the footer mailing list section on/off."
                },
                {
                  "label": "Background Image",
                  "name": "backgroundImage",
                  "widget": "image",
                  "hint": "The image shown in the background of the section."
                },
                {
                  "label": "Background Image Brightness",
                  "name": "backgroundImageBrightness",
                  "widget": "number",
                  "valueType": "int",
                  "min": 0,
                  "max": 100,
                  "step": 1,
                  "hint": "How bright the image appears on a scale from 0-100, 0 being darkest."
                },
                {
                  "label": "Title Text",
                  "name": "titleText",
                  "widget": "string",
                  "hint": "The title text. This catchy headline should entice the reader into signing up!"
                },
                {
                  "label": "Body Text",
                  "name": "bodyText",
                  "widget": "text",
                  "hint": "The body text. Explain the benefits of signing up here. Make it irresistible. Supports HTML."
                },
                {
                  "label": "Button Text",
                  "name": "buttonText",
                  "widget": "string",
                  "hint": "The text shown on the submit button."
                },
                {
                  "label": "Privacy Text",
                  "name": "privacyText",
                  "widget": "string",
                  "hint": "The text shown under the email field that assures the user their privacy is important to you."
                },
                {
                  "label": "Error Submitting Text",
                  "name": "errorSubmittingText",
                  "widget": "string",
                  "hint": "The text shown when there is an error submitting the form."
                },
                {
                  "label": "Success Image",
                  "name": "successImage",
                  "widget": "image",
                  "hint": "The success image, shown in place of the background image when submitting is successful."
                },
                {
                  "label": "Success Title Text",
                  "name": "successTitleText",
                  "widget": "string",
                  "hint": "The title text shown when finished submitting."
                },
                {
                  "label": "Success Body Text",
                  "name": "successBodyText",
                  "widget": "text",
                  "hint": "The message shown when finished submitting. Supports HTML."
                }
              ]
            }
          ]
        },
        {
          "label": "Discussion Settings",
          "name": "discussion-settings",
          "file": "settings/discussion/discussion-settings.yml",
          "fields": [
            {
              "label": "Site-Wide Comments",
              "name": "siteWideCommentsEnabled",
              "widget": "boolean",
              "hint": "Use this to turn comments on/off for the entire site."
            },
            {
              "label": "Disqus Shortname",
              "name": "disqusShortname",
              "widget": "string",
              "hint": "Put your Disqus shortname here to enable comments. Get one here: https://disqus.com/"
            }
          ]
        },
        {
          "label": "Navbar Settings",
          "name": "navbarSettings",
          "file": "settings/navbar/navbar-settings.yml",
          "fields": [
            {
              "label": "Navbar Placement",
              "name": "navbarPlacement",
              "widget": "select",
              "hint": "How the navbar should be positioned on the page. When using fixed placements, the navbar will always appear at the top/bottom. Note that the navbar may appear on the page below other sections of content, such as the featured post. In this case, Sticky Top will cause the navbar to stick to the top once the user scrolls past it.",
              "options": [
                {
                  "label": "On Page - Scrolls with the page content",
                  "value": "default"
                },
                {
                  "label": "Fixed Top - Fixed to the top",
                  "value": "fixed-top"
                },
                {
                  "label": "Fixed Bottom - Fixed to the bottom",
                  "value": "fixed-bottom"
                },
                {
                  "label": "Sticky Top - When it reaches the top, it stays there",
                  "value": "sticky-top"
                },
                {
                  "label": "Sticky Bottom - When it reaches the bottom, it stays there",
                  "value": "sticky-bottom"
                }
              ]
            },
            {
              "label": "Fixed Top Padding",
              "name": "navbarFixedTopPadding",
              "widget": "number",
              "valueType": "int",
              "min": 0,
              "step": 1,
              "hint": "This pushes the page content down by the specified amount, in pixels. When using Fixed Top placement, this setting will prevent your content from being hidden under the navbar."
            },
            {
              "label": "Drop Shadow",
              "name": "navbarDropShadow",
              "widget": "select",
              "hint": "Choose when a shadow is shown under the nav bar for an aesthetically pleasing effect.",
              "options": [
                {
                  "label": "None - No drop shadow",
                  "value": "none"
                },
                {
                  "label": "At Top - Drop shadow when the navbar is at the top",
                  "value": "at-top"
                },
                {
                  "label": "Just Beyond - Drop shadow when scrolled just beyond the navbar",
                  "value": "just-beyond"
                },
                {
                  "label": "Always - Drop shadow always shown",
                  "value": "always"
                }
              ]
            },
            {
              "label": "Navbar Logo & Description",
              "name": "navbarLogo",
              "widget": "object",
              "hint": "↑ Settings for the navbar logo and description. This is the branding logo and text shown in the navbar.",
              "fields": [
                {
                  "label": "Show Navbar Logo Image",
                  "name": "navbarLogoImageEnabled",
                  "widget": "boolean",
                  "hint": "Switch on to use a navbar logo image."
                },
                {
                  "label": "Use Site Icon In Navbar",
                  "name": "navbarUseSiteIcon",
                  "widget": "boolean",
                  "hint": "Switch on to use the site logo (configured in Site Settings) as the navbar logo. When on, the Custom Navbar Logo Image below will be ignored."
                },
                {
                  "label": "Custom Navbar Logo Image",
                  "name": "navbarCustomLogoImage",
                  "widget": "image",
                  "hint": "Set a custom navbar logo image. You must switch off Use Site Logo In Navbar for this to take effect. To improve performance, the image size should match the width/height specified below."
                },
                {
                  "label": "Navbar Logo Image Width",
                  "name": "navbarLogoImageWidth",
                  "widget": "number",
                  "valueType": "int",
                  "min": 1,
                  "step": 1,
                  "hint": "Width of the navbar logo in pixels. The navbar logo image specified above will be resized to this width on the page. Defaults to 30."
                },
                {
                  "label": "Navbar Logo Image Height",
                  "name": "navbarLogoImageHeight",
                  "widget": "number",
                  "valueType": "int",
                  "min": 1,
                  "step": 1,
                  "hint": "Height of the navbar logo in pixels. The navbar logo image specified above will be resized to this height on the page. Defaults to 30."
                },
                {
                  "label": "Navbar Logo Gap",
                  "name": "navbarLogoGap",
                  "widget": "number",
                  "valueType": "int",
                  "min": 1,
                  "step": 1,
                  "hint": "The gap between the logo image and logo text, in pixels. Defaults to 10."
                },
                {
                  "label": "Show Navbar Logo Text",
                  "name": "navbarLogoTextEnabled",
                  "widget": "boolean",
                  "hint": "Switch on to use navbar logo text, which appears after logo image if enabled."
                },
                {
                  "label": "Navbar Logo Text",
                  "name": "navbarLogoText",
                  "widget": "string",
                  "hint": "The navbar logo text. Supports HTML. Will collapse into the menu on smaller screens."
                },
                {
                  "label": "Show Navbar Logo Description",
                  "name": "navbarLogoDescriptionEnabled",
                  "widget": "boolean",
                  "hint": "Switch on to show a brief description under the logo."
                },
                {
                  "label": "Navbar Logo Description",
                  "name": "navbarLogoDescriptionText",
                  "widget": "string",
                  "hint": "The navbar logo description, appearing under the logo image and text. Supports HTML."
                },
                {
                  "label": "Hide Navbar Logo Description When Scrolling",
                  "name": "navbarHideDescriptionWhenScrolling",
                  "widget": "boolean",
                  "hint": "Switch on to hide the description text for the logo when scrolling. Once the user scrolls down past the navbar, the description will be hidden. If the user scrolls up past the navbar, the description will be shown again. Note than on smaller screens the description will be collapsed into the menu."
                },
                {
                  "label": "Order Reversed",
                  "name": "navbarLogoOrderReversed",
                  "widget": "boolean",
                  "hint": "When on, text will appear first and the logo will appear after."
                }
              ]
            }
          ]
        },
        {
          "label": "Menu Settings",
          "name": "menuSettings",
          "file": "settings/menu/menu-settings.yml",
          "fields": [
            {
              "label": "Navbar Menu Top bar",
              "name": "navbarMenus",
              "widget": "list",
              "fields": [
                {
                  "label": "Menu Name (Not Shown)",
                  "name": "name",
                  "widget": "string",
                  "default": "New Menu",
                  "hint": "The name of the menu. This is used for your reference only and does not actually appear in the navbar. Examples: Main Menu, Categories Submenu"
                },
                {
                  "label": "Parent Menu Item Name",
                  "name": "parentMenuItemName",
                  "widget": "string",
                  "default": "none",
                  "hint": "Set this to the name of any menu item and this entire menu will become a dropdown submenu of that menu item. Leave as none to make this the main menu. Examples: none, Categories"
                },
                {
                  "label": "Menu Items",
                  "name": "menuItems",
                  "widget": "list",
                  "hint": "The menu items for this menu.",
                  "fields": [
                    {
                      "label": "Menu Item Name",
                      "name": "name",
                      "widget": "string",
                      "default": "New Menu Item",
                      "hint": "The name to appear in the menu. If this menu is a dropdown submenu menu, you can use three dashes --- to create a divider. Examples: About, Contact, ---, Categories"
                    },
                    {
                      "label": "Link",
                      "name": "link",
                      "widget": "string",
                      "default": "#",
                      "hint": "A relative or absolute link. Example: /terms"
                    },
                    {
                      "label": "Class",
                      "name": "class",
                      "widget": "string",
                      "default": "none",
                      "hint": "CSS class name(s) to use for the link. Set to \"none\" (no quotes) if not needed. Examples: none, font-weight-bold"
                    },
                    {
                      "label": "External",
                      "name": "external",
                      "widget": "boolean",
                      "default": false,
                      "hint": "Switch this on if the link takes the visitor away from this site. Applies to mailto links as well."
                    }
                  ]
                }
              ],
              "hint": "This is the navbar menu at the top of the page. It collapses when on small screens, and supports dropdown submenus."
            },
            {
              "label": "Footer Menus",
              "name": "footerMenus",
              "widget": "list",
              "hint": "These menus appear in the footer and will be laid out on the page automatically. You can have as many as you'd like!",
              "fields": [
                {
                  "label": "Name",
                  "name": "name",
                  "widget": "string",
                  "default": "New Footer Menu",
                  "hint": "The name of the menu that will be shown in the footer."
                },
                {
                  "label": "Menu Items",
                  "name": "menuItems",
                  "widget": "list",
                  "hint": "The menu items for this menu.",
                  "fields": [
                    {
                      "label": "Name",
                      "name": "name",
                      "widget": "string",
                      "default": "New Menu Item",
                      "hint": "The name to appear in the copyright footer menu."
                    },
                    {
                      "label": "Link",
                      "name": "link",
                      "widget": "string",
                      "default": "#",
                      "hint": "A relative or absolute link. Example: /terms"
                    },
                    {
                      "label": "Class",
                      "name": "class",
                      "widget": "string",
                      "default": "none",
                      "hint": "CSS class name(s) to use for the link. Set to \"none\" (no quotes) if not needed. Examples: none, font-weight-bold"
                    },
                    {
                      "label": "External",
                      "name": "external",
                      "widget": "boolean",
                      "default": false,
                      "hint": "Switch this on if the link takes the visitor away from this site. Applies to mailto links as well."
                    }
                  ]
                }
              ]
            },
            {
              "label": "Footer Legal Menu Items",
              "name": "footerLegalMenuItems",
              "widget": "list",
              "fields": [
                {
                  "label": "Name",
                  "name": "name",
                  "widget": "string",
                  "default": "New Menu Item",
                  "hint": "The name to appear in the copyright footer menu."
                },
                {
                  "label": "Link",
                  "name": "link",
                  "widget": "string",
                  "default": "#",
                  "hint": "A relative or absolute link. Example: /terms"
                },
                {
                  "label": "Class",
                  "name": "class",
                  "widget": "string",
                  "default": "none",
                  "hint": "CSS class name(s) to use for the link. Set to \"none\" (no quotes) if not needed. Examples: none, font-weight-bold"
                },
                {
                  "label": "External",
                  "name": "external",
                  "widget": "boolean",
                  "default": false,
                  "hint": "Switch this on if the link takes the visitor away from this site. Applies to mailto links as well."
                }
              ],
              "hint": "The menu items appearing next to the copyright statement, such as links to terms and privacy pages."
            }
          ]
        },
        {
          "label": "Social & Sharing Settings",
          "name": "socialSharingSettings",
          "file": "settings/social-sharing/social-sharing-settings.yml",
          "fields": [
            {
              "label": "Sharing On Home Page",
              "name": "shareHomePageEnabled",
              "widget": "boolean",
              "hint": "When enabled, the above buttons will appear in a sidebar widget on the home page, allowing the user to share the home page itself."
            },
            {
              "label": "Facebook",
              "name": "facebook",
              "widget": "object",
              "fields": [
                {
                  "label": "Facebook Post Sharing",
                  "name": "facebookPostSharingEnabled",
                  "widget": "boolean",
                  "hint": "When enabled, the Facebook share button will appear next to posts."
                },
                {
                  "label": "Connect Via Facebook (In Footer)",
                  "name": "connectViaFacebookEnabled",
                  "widget": "boolean",
                  "hint": "When enabled, the footer will contain a link to your Facebook page, profile, etc."
                },
                {
                  "label": "Connect Via Facebook URL",
                  "name": "connectViaFacebookUrl",
                  "widget": "string",
                  "hint": "The URL to your Facebook page, profile, etc."
                }
              ]
            },
            {
              "label": "Twitter",
              "name": "twitter",
              "widget": "object",
              "fields": [
                {
                  "label": "Twitter Site Username",
                  "name": "twitterSiteUsername",
                  "widget": "string",
                  "hint": "Used as the attribution username when linking to the site in Twitter. Use the @ symbol, e.g. @devboldly. Set to none to disable."
                },
                {
                  "label": "Twitter Post Sharing",
                  "name": "twitterPostSharingEnabled",
                  "widget": "boolean",
                  "hint": "When enabled, the Twitter share button will appear next to posts."
                },
                {
                  "label": "Connect Via Twitter (In Footer)",
                  "name": "connectViaTwitterEnabled",
                  "widget": "boolean",
                  "hint": "When enabled, the footer will contain a link to the Twitter profile specified below."
                },
                {
                  "label": "Connect Via Twitter URL",
                  "name": "connectViaTwitterUrl",
                  "widget": "string",
                  "hint": "The URL to your Twitter profile."
                }
              ]
            },
            {
              "label": "LinkedIn",
              "name": "linkedIn",
              "widget": "object",
              "fields": [
                {
                  "label": "LinkedIn Post Sharing",
                  "name": "linkedInPostSharingEnabled",
                  "widget": "boolean",
                  "hint": "When enabled, the LinkedIn share button will appear next to posts."
                }
              ]
            },
            {
              "label": "Email",
              "name": "email",
              "widget": "object",
              "fields": [
                {
                  "label": "Connect Via Email (In Footer)",
                  "name": "connectViaEmailEnabled",
                  "widget": "boolean",
                  "hint": "When enabled, the footer will contain a link to contact you via email or a contact form."
                },
                {
                  "label": "Connect Via Email URL",
                  "name": "connectViaEmailUrl",
                  "widget": "string",
                  "hint": "The URL to a contact page, or a mailto email link. Examples: \"/contact\", \"mailtocontact@me.com\" (without quotes)"
                }
              ]
            }
          ]
        },
        {
          "label": "Theme Settings",
          "name": "themeSettings",
          "file": "settings/theme/theme-settings.yml",
          "fields": [
            {
              "label": "Navbar Color Scheme",
              "name": "navbarColorScheme",
              "widget": "select",
              "hint": "Choose from light or dark color scheme for the navbar.",
              "options": [
                {
                  "label": "Light",
                  "value": "light"
                },
                {
                  "label": "Dark",
                  "value": "dark"
                }
              ]
            },
            {
              "label": "Navbar Background Color",
              "name": "navbarBackgroundColor",
              "widget": "select",
              "hint": "You can override the navbar background color for further customization.",
              "options": [
                {
                  "label": "Default",
                  "value": "default"
                },
                {
                  "label": "Primary Color",
                  "value": "primary"
                },
                {
                  "label": "Secondary Color",
                  "value": "secondary"
                },
                {
                  "label": "Success Color",
                  "value": "success"
                },
                {
                  "label": "Danger Color",
                  "value": "danger"
                },
                {
                  "label": "Warning Color",
                  "value": "warning"
                },
                {
                  "label": "Info Color",
                  "value": "info"
                },
                {
                  "label": "Light (default for Light color scheme)",
                  "value": "light"
                },
                {
                  "label": "Dark (default for Dark color scheme)",
                  "value": "dark"
                },
                {
                  "label": "Muted",
                  "value": "muted"
                },
                {
                  "label": "White",
                  "value": "white"
                }
              ]
            },
            {
              "label": "Bootswatch",
              "name": "bootswatchSettings",
              "widget": "object",
              "hint": "↑ Configure Bootswatch settings.",
              "fields": [
                {
                  "label": "Use Bootswatch Theme",
                  "name": "useBootswatchTheme",
                  "widget": "boolean",
                  "hint": "When on, the Bootswatch theme below will be loaded after Bootstrap. You can manually import the theme in gatsby-browser.js to speed things up and avoid the temporary flash of the original Bootstrap styles. When doing so, turn this setting off."
                },
                {
                  "label": "Bootswatch Theme",
                  "name": "bootswatchThemeName",
                  "widget": "select",
                  "options": [
                    {
                      "label": "Cerulean - A calm blue sky",
                      "value": "cerulean"
                    },
                    {
                      "label": "Cosmo - An ode to Metro",
                      "value": "cosmo"
                    },
                    {
                      "label": "Cyborg - Jet black and electric blue",
                      "value": "cyborg"
                    },
                    {
                      "label": "Darkly - Flatly in night mode",
                      "value": "darkly"
                    },
                    {
                      "label": "Flatly - Flat and modern",
                      "value": "flatly"
                    },
                    {
                      "label": "Journal - Crisp like a new sheet of paper",
                      "value": "journal"
                    },
                    {
                      "label": "Litera - The medium is the message",
                      "value": "litera"
                    },
                    {
                      "label": "Lumen - Light and shadow",
                      "value": "lumen"
                    },
                    {
                      "label": "Lux - A touch of class",
                      "value": "lux"
                    },
                    {
                      "label": "Materia - Material is the metaphor",
                      "value": "materia"
                    },
                    {
                      "label": "Minty - A fresh feel",
                      "value": "minty"
                    },
                    {
                      "label": "Pulse - A trace of purple",
                      "value": "pulse"
                    },
                    {
                      "label": "Sandstone - A touch of warmth",
                      "value": "sandstone"
                    },
                    {
                      "label": "Simplex - Mini and minimalist",
                      "value": "simplex"
                    },
                    {
                      "label": "Sketchy - A hand-drawn look for mockups and mirth",
                      "value": "sketchy"
                    },
                    {
                      "label": "Slate - Shades of gunmetal gray",
                      "value": "slate"
                    },
                    {
                      "label": "Solar - A spin on Solarized",
                      "value": "solar"
                    },
                    {
                      "label": "Spacelab - Silvery and sleek",
                      "value": "spacelab"
                    },
                    {
                      "label": "Superhero - The brave and the blue",
                      "value": "superhero"
                    },
                    {
                      "label": "United - Ubuntu orange and unique font",
                      "value": "united"
                    },
                    {
                      "label": "Yeti - A friendly foundation",
                      "value": "yeti"
                    }
                  ],
                  "hint": "Select a theme to use. You can preview them by visiting https://bootswatch.com"
                },
                {
                  "label": "Bootswatch Theme CDN Location",
                  "name": "bootswatchThemeCDNLocation",
                  "widget": "string",
                  "hint": "The CDN location of the theme."
                },
                {
                  "label": "Bootswatch Theme Filename",
                  "name": "bootswatchThemeFilename",
                  "widget": "string",
                  "hint": "The CDN filename to use for the theme, such as bootstrap.min.css. The full path to the theme file will be: ${themeCDNLocation}/${themeNameLowercase}/${themeFilename}"
                }
              ]
            }
          ]
        },
        {
          "label": "Post Settings",
          "name": "postSettings",
          "file": "settings/post/post-settings.yml",
          "fields": [
            {
              "label": "Home Page Post Count",
              "name": "indexPagePostCount",
              "widget": "number",
              "hint": "The number of posts to show on the home page."
            },
            {
              "label": "List Page Post Count",
              "name": "listPagePostCount",
              "widget": "number",
              "hint": "The number of posts to show on the All Posts page and category pages that lists posts."
            },
            {
              "label": "Recent Posts Widget Post Count",
              "name": "recentPostsWidgetPostCount",
              "widget": "number",
              "hint": "The number of posts to show in the Recent Posts widget."
            },
            {
              "label": "Recent Posts Widget Post Categories",
              "name": "recentPostsWidgetPostCategories",
              "widget": "list",
              "hint": "The categories to show recent posts for. This allows you to only show categories of interest.",
              "field": {
                "label": "Category Name",
                "name": "categoryName",
                "widget": "string",
                "default": "all",
                "hint": "Specify a category name, or set this to all to capture all categories."
              }
            },
            {
              "label": "All Posts List URL Slug",
              "name": "allPostsListSlug",
              "widget": "string",
              "hint": "The slug used to access the All Posts page. Example: /posts"
            },
            {
              "label": "Post Category List URL Slug",
              "name": "postCategoryListSlug",
              "widget": "string",
              "hint": "The slug prefix used to access post lists for categories. For example, if you set this to \"/posts/category\" and your category is \"adventure\", then the full path to access the category post list would become \"/posts/category/adventure\""
            },
            {
              "label": "Featured Post",
              "name": "featuredPost",
              "widget": "object",
              "fields": [
                {
                  "label": "Featured Post Enabled",
                  "name": "featuredPostEnabled",
                  "widget": "boolean",
                  "hint": "When switched on, the post with the slug below will appear on the index page as the featured post."
                },
                {
                  "label": "Featured The Newest Post",
                  "name": "featureNewestPostEnabled",
                  "widget": "boolean",
                  "hint": "When switched on, the newest post will be featured and the selected post below will be ignored."
                },
                {
                  "label": "Featured Post",
                  "name": "featuredPostSlug",
                  "widget": "relation",
                  "collection": "posts",
                  "searchFields": [
                    "title",
                    "rawSlug"
                  ],
                  "valueField": "rawSlug",
                  "displayFields": [
                    "title"
                  ],
                  "hint": "Choose post you'd like to feature. You must switch off the \"Feature The Newest Post\" settings for this to take effect."
                },
                {
                  "label": "Content Cue Text",
                  "name": "contentCueText",
                  "widget": "string",
                  "hint": "The cue text above the title that informs the reader what the section is for. Set to none to disable."
                },
                {
                  "label": "Custom Title Text",
                  "name": "customTitleText",
                  "widget": "string",
                  "hint": "The title text. Set to none to use the post title."
                },
                {
                  "label": "Custom Teaser",
                  "name": "customTeaser",
                  "widget": "string",
                  "hint": "The teaser text used to get the reader to click. Set to none to use the post excerpt."
                },
                {
                  "label": "Left Teaser Quote",
                  "name": "leftQuote",
                  "widget": "string",
                  "hint": "The left quote for the teaser text. Set to none for no quotes."
                },
                {
                  "label": "Right Teaser Quote",
                  "name": "rightQuote",
                  "widget": "string",
                  "hint": "The right quote for the teaser text. Set to none for no quotes."
                },
                {
                  "label": "Button Text",
                  "name": "buttonText",
                  "widget": "string",
                  "hint": "The text for the button. Set to none to disable."
                }
              ]
            }
          ]
        },
        {
          "label": "Reporting Settings",
          "name": "reportingSettings",
          "file": "settings/reporting/reporting-settings.json",
          "fields": [
            {
              "label": "Google Analytics",
              "name": "googleAnalytics",
              "widget": "object",
              "hint": "↑ Google Analytics settings",
              "fields": [
                {
                  "label": "Google Analytics Enabled",
                  "name": "analyticsEnabled",
                  "widget": "boolean",
                  "hint": "Switch on to enable Google Analytics"
                },
                {
                  "label": "Google Analytics Tracking ID",
                  "name": "trackingId",
                  "widget": "string",
                  "hint": "Enter your Google Analytics Tracking ID here. Get one here: https://analytics.google.com/"
                },
                {
                  "label": "anonymize",
                  "name": "anonymize",
                  "widget": "boolean",
                  "hint": "Switch this on to anonymize the visitor's IP. Some countries (such as Germany) require you to use the _anonymizeIP function for Google Analytics, otherwise you are not allowed to use the service."
                },
                {
                  "label": "Respect “Do Not Track” Settings",
                  "name": "respectDNT",
                  "widget": "boolean",
                  "hint": "If you enable this option, Google Analytics will not be loaded at all for visitors that have “Do Not Track” enabled. While using Google Analytics does not necessarily constitute Tracking, you might still want to do this to cater to more privacy oriented users."
                },
                {
                  "label": "Place Tracking Script In Head",
                  "name": "scriptInHead",
                  "widget": "boolean",
                  "hint": "Defines where to place the tracking script. Switch on to place in the head, switch off to place in the body. Google recommends placing the tracking script in the head, but you might toggle this if you're concerned about performance."
                }
              ]
            },
            {
              "label": "Build Status Badge",
              "name": "buildStatusBadge",
              "widget": "object",
              "hint": "↑ Build Status Badge settings",
              "fields": [
                {
                  "label": "Badge Image URL",
                  "name": "buildStatusBadgeImageUrl",
                  "widget": "string",
                  "hint": "Location of the build status badge."
                },
                {
                  "label": "Badge Image Alt",
                  "name": "buildStatusBadgeImageAlt",
                  "widget": "string",
                  "hint": "Alt text for badge image, for the visually impaired."
                },
                {
                  "label": "Badge Image Link",
                  "name": "buildStatusBadgeImageLink",
                  "widget": "string",
                  "hint": "Link for the badge. Set to none for no link."
                }
              ]
            }
          ]
        },
        {
          "label": "Offline Support (Progressive Web App) Settings",
          "name": "offlineSupportSettings",
          "file": "settings/offline/offline-settings.json",
          "fields": [
            {
              "label": "Offline Support (One-Click PWA)",
              "name": "offlineSupportEnabled",
              "widget": "boolean",
              "hint": "When switched on, your website will become a progressive web app (PWA) that can be installed on a user's device. The user will be prompted to install upon visiting the site. Once installed, an icon for the site will be added to the home screen, and the site will behave like a native app and can be used offline."
            },
            {
              "label": "Show Prompt When Update Available",
              "name": "showPromptWhenUpdateAvailable",
              "widget": "boolean",
              "hint": "When on, the user will be prompted when there are updates to your app."
            },
            {
              "label": "Update Prompt",
              "name": "updateAvailablePromptMessage",
              "widget": "string",
              "hint": "The prompt shown to the user when an update to your app is available. To test this, open your app on your phone, then make a change to the site. You should see the prompt to reload within a few minutes."
            },
            {
              "label": "Offline Support Options",
              "name": "gatsbyPluginManifestOptions",
              "widget": "object",
              "hint": "↑ Configure offline support.",
              "fields": [
                {
                  "label": "Name",
                  "name": "name",
                  "widget": "string",
                  "hint": "The name of your app. You can use {siteName} for the site name."
                },
                {
                  "label": "Short Name",
                  "name": "shortName",
                  "widget": "string",
                  "hint": "A concise name that fits in small screen areas. You can use {siteName} for the site name."
                },
                {
                  "label": "Start URL",
                  "name": "startUrl",
                  "widget": "string",
                  "hint": "The URL to start at. Typically this will be /"
                },
                {
                  "label": "Theme Color",
                  "name": "themeColor",
                  "widget": "string",
                  "hint": "Theme color for your app. Your app's title bar will use this color. Choose your app's primary color. For a quick color scheme, visit: https://coolors.co/"
                },
                {
                  "label": "Background Color",
                  "name": "backgroundColor",
                  "widget": "string",
                  "hint": "Background color for your app. Your app's icon may be shown over this background color while the app launches. For a quick color scheme, visit: https://coolors.co/"
                },
                {
                  "label": "Display Type",
                  "name": "display",
                  "widget": "select",
                  "hint": "⮞ Fullscreen: Opens the web application without any browser UI and takes up the entirety of the available display area. ⮞ Standalone: Opens the web app to look and feel like a standalone native app. The app runs in its own window, separate from the browser, and hides standard browser UI elements like the URL bar, etc. ⮞ Minimal UI: This mode is similar to fullscreen, but provides the user with some means to access a minimal set of UI elements for controlling navigation (i.e., back, forward, reload, etc). Note: Only supported by Chrome on mobile. ⮞ Browser: A standard browser experience.",
                  "options": [
                    {
                      "label": "Fullscreen - No browser UI, takes up entire display.",
                      "value": "fullscreen"
                    },
                    {
                      "label": "Standalone (Recommended) - Looks and feels like a standalone native app.",
                      "value": "standalone"
                    },
                    {
                      "label": "Minimal UI - Similar to fullscreen with limited navigation. Mobile Chrome only.",
                      "value": "minimal-ui"
                    },
                    {
                      "label": "Browser - A standard browser experience.",
                      "value": "browser"
                    }
                  ]
                },
                {
                  "label": "Icon",
                  "name": "icon",
                  "widget": "object",
                  "fields": [
                    {
                      "label": "Use Site Icon",
                      "name": "useSiteIcon",
                      "widget": "boolean",
                      "hint": "Switch on to use the Site Icon (configured in Site Settings) as the app icon. When switched on, the Custom Icon below will be ignored."
                    },
                    {
                      "label": "Custom Icon",
                      "name": "customIcon",
                      "widget": "image",
                      "hint": "Specify a custom icon for your app. The Use Site Logo setting above must be switched off. Must be square, at least 512x512, and either: JPEG, PNG, WebP, TIFF, GIF or SVG."
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
}

/**
 * Optionally pass in a config object. This object will be merged into
 * `config.yml` if it exists, and any portion that conflicts with
 * `config.yml` will be overwritten. Arrays will be replaced during merge,
 * not concatenated.
 *
 * For example, the code below contains an incomplete config, but using it,
 * your `config.yml` can be missing its backend property, allowing you
 * to set this property at runtime.
 */
CMS.init(config)