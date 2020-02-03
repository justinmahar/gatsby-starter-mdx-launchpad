import * as React from 'react';
import { Helmet } from 'react-helmet';

export interface SEOProps {
  // === Standard Meta ===
  /** The title of the page. Defaults to `""` if not specified. */
  pageTitle?: string;
  /** Specify a meta description. This is shown in Google results and should be 50-160 characters long. Anything beyond that length will be truncated with an ellipsis "...". Defaults to `""` if not specified. */
  metaDescription?: string;
  /** Specify the site language. Falls back to "en" if not specified. */
  lang?: string;
  // === Open Graph (Facebook) ===
  // See: https://ogp.me/
  // Use https://developers.facebook.com/tools/debug/ to validate.
  /** OpenGraph (Facebook) metadata. Will fall back to use page title, meta description, and general "website" type if not specified. */
  openGraph?: OpenGraphMetadata;
  // === Twitter Cards ===
  // See: https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/markup.html
  // Use https://cards-dev.twitter.com/validator to validate
  /**
   * Twitter metadata. Uses the [Cards markup](https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/markup.html) to enhance tweets. Twitter will check for the meta properties you specify here and render a nice-looking card for you.
   *
   * Specify **only one** of the following cards:
   * - `twitterSummaryCard: TwitterSummaryCardType`
   * - `twitterSummaryCardWithLargeImage: TwitterSummaryCardWithLargeImageCardType`
   * - `twitterPlayerCard: TwitterPlayerCardType`
   * - `twitterAppCard: TwitterAppCardType`
   *
   * If no Twitter card is specified, Twitter will fall back on OpenGraph meta properties such as `og:type`, `og:title`, `og:description`, and `og:image`.
   *
   * For instance, if an `og:type`, `og:title`, and `og:description` exist in the markup but `twitter:card` is absent, then a `summary` card may be rendered.
   */
  twitter?: TwitterMetadata;
}

// See https://github.com/gatsbyjs/gatsby-starter-default/blob/master/src/components/seo.js#L15
export default function SEO(props: SEOProps): JSX.Element {
  const pageTitle = props.pageTitle ? props.pageTitle : '';

  const titleTag = <title>{pageTitle}</title>;

  const siteImageUrl = undefined;
  const pageUrl = undefined;

  const meta: (MetaProperty | MetaName)[] = [];
  const description = props.metaDescription ? props.metaDescription : '';
  meta.push({
    name: 'description',
    content: description,
  });
  meta.push(...createOpenGraphMetadataObjects(props.openGraph, pageTitle, siteImageUrl, pageUrl, description));

  meta.push(...createTwitterMetadataObjects(props.twitter));

  // lang
  const htmlAttributes = { lang: props.lang ? props.lang : 'en' };

  return (
    <Helmet htmlAttributes={htmlAttributes} meta={meta}>
      {titleTag}
    </Helmet>
  );
}

export type MetaName = {
  name: string;
  content: string;
};

export type MetaProperty = {
  property: string;
  content: string;
};

// === OPEN GRAPH ===

export type OpenGraphMetadata = {
  // == REQUIRED ==
  /** (Required) `og:title` - The title of your object as it should appear within the graph, e.g., "The Rock". */
  ogTitle?: string;
  /** (Required) `og:type` - The type of your object. Supports `article`, `book`, `profile`, `website`. Specify the related properties in `ogTypeObject`. If another type is provided, use a `MetaPropertiesFunction` for the `ogTypeObject` to specify your meta properties for the type. This function should return an array of `MetaProperty` in the format `{property: string, content: string}`. */
  ogType?: string;
  /** (Required) The meta properties object for the type specified. Use {} to default to "website". */
  ogTypeObject?:
    | OpenGraphTypeArticle
    | OpenGraphTypeBook
    | OpenGraphTypeProfile
    | OpenGraphTypeWebsite
    | MetaPropertiesFunction;
  /** (Required) `og:image` - An image URL which should represent your object within the graph. Provide an array for multiple images. */
  ogImage?: OpenGraphImage | OpenGraphImage[];
  /** (Required) `og:url` - The canonical URL of your object that will be used as its permanent ID in the graph, e.g., "http://www.imdb.com/title/tt0117500/". */
  ogUrl?: string;
  // == OPTIONAL ==
  /** (Optional) `og:audio` - Audio file(s) to accompany this object. */
  ogAudio?: OpenGraphAudio | OpenGraphAudio[];
  /** (Optional) `og:description` - A one to two sentence description of your object. */
  ogDescription?: string;
  /** (Optional) `og:determiner` - The word that appears before this object's title in a sentence. An enum of (a, an, the, "", auto). If auto is chosen, the consumer of your data should chose between "a" or "an". Default is "" (blank). */
  ogDeterminer?: 'a' | 'an' | 'the' | '' | 'auto';
  /** (Optional) `og:locale` - The locale these tags are marked up in. Of the format language_TERRITORY. Default is en_US. */
  ogLocale?: string;
  /** (Optional) `og:locale:alternate` - An array of other locales this page is available in. */
  ogLocaleAlternate?: string[];
  /** (Optional) `og:site_name` - If your object is part of a larger web site, the name which should be displayed for the overall site. e.g., "IMDb". */
  ogSiteName?: string;
  /** (Optional) `og:video` - Video file(s) that complement this object. */
  ogVideo?: OpenGraphVideo | OpenGraphVideo[];
  /** (Optional) `fb:app_id` - The Facebook App ID lets Facebook know the identify of your site, which provides additional benefits like social analytics, comments moderation and authentication capabilities to your site. */
  fbAppId?: string;
};
function createOpenGraphMetadataObjects(
  data?: OpenGraphMetadata,
  fallbackTitle?: string,
  fallbackImageUrl?: string,
  fallbackUrl?: string,
  fallbackDescription?: string
): MetaProperty[] {
  data = data ? data : {};
  const meta: MetaProperty[] = [];

  // og:title
  if (!!data.ogTitle || !!fallbackTitle) {
    meta.push({
      property: 'og:title',
      content: data.ogTitle ? data.ogTitle : fallbackTitle,
    });
  }

  // og:type
  meta.push({
    property: 'og:type',
    content: data.ogType ? data.ogType : 'website',
  });

  if (data.ogType) {
    switch (data.ogType) {
      case 'article':
        const article = data.ogTypeObject as OpenGraphTypeArticle;
        meta.push(...createOpenGraphTypeArticleMetadataObjects(article));
        break;
      case 'book':
        const book = data.ogTypeObject as OpenGraphTypeBook;
        meta.push(...createOpenGraphTypeBookMetadataObjects(book));
        break;
      case 'profile':
        const profile = data.ogTypeObject as OpenGraphTypeProfile;
        meta.push(...createOpenGraphTypeProfileMetadataObjects(profile));
        break;
      case 'website':
        // No additional properties needed for website.
        break;
      default:
        // Otherwise, assume they provided MetaPropertiesFunction themselves.
        if (data.ogTypeObject) {
          const metaPropsFunction = data.ogTypeObject as MetaPropertiesFunction;
          if (typeof metaPropsFunction === 'function') {
            meta.push(...metaPropsFunction());
          }
        }
        break;
    }
  }

  // og:image
  if (!!data.ogImage || !!fallbackImageUrl) {
    if (data.ogImage) {
      const images: OpenGraphImage[] = Array.isArray(data.ogImage) ? data.ogImage : [data.ogImage];
      images.forEach((image: OpenGraphImage) => {
        meta.push(...createOpenGraphImageMetadataObjects(image));
      });
    } else {
      // Fallback image URL
      const image: OpenGraphImage = { ogImage: fallbackImageUrl };
      meta.push(...createOpenGraphImageMetadataObjects(image));
    }
  } // END og:image

  // og:url
  if (!!data.ogUrl || !!fallbackUrl) {
    meta.push({
      property: 'og:url',
      content: data.ogUrl ? data.ogUrl : fallbackUrl,
    });
  } // END og:url

  // og:audio
  if (data.ogAudio) {
    const audios: OpenGraphAudio[] = Array.isArray(data.ogAudio) ? data.ogAudio : [data.ogAudio];
    audios.forEach((audio: OpenGraphAudio) => {
      meta.push(...createOpenGraphAudioMetadataObjects(audio));
    });
  } // END og:audio

  // og:description
  if (!!data.ogDescription || !!fallbackDescription) {
    meta.push({
      property: 'og:description',
      content: data.ogDescription ? data.ogDescription : fallbackDescription,
    });
  } // END og:description

  // og:determiner
  if (data.ogDeterminer) {
    meta.push({
      property: 'og:determiner',
      content: data.ogDeterminer,
    });
  } // END og:determiner

  // og:locale
  if (data.ogLocale) {
    meta.push({
      property: 'og:locale',
      content: data.ogLocale,
    });
  } // END og:locale

  // og:locale:alternate
  if (data.ogLocaleAlternate) {
    data.ogLocaleAlternate.forEach((localeAlternate: string) => {
      meta.push({
        property: 'og:locale:alternate',
        content: localeAlternate,
      });
    });
  } // END og:locale:alternate

  // og:site_name
  if (data.ogSiteName) {
    meta.push({
      property: 'og:site_name',
      content: data.ogSiteName,
    });
  } // END og:site_name

  // og:video
  if (data.ogVideo) {
    const videos: OpenGraphVideo[] = Array.isArray(data.ogVideo) ? data.ogVideo : [data.ogVideo];
    videos.forEach((video: OpenGraphVideo) => {
      meta.push(...createOpenGraphVideoMetadataObjects(video));
    });
  } // END og:video

  // fb:app_id
  if (data.fbAppId) {
    meta.push({
      property: 'fb:app_id',
      content: data.fbAppId,
    });
  }
  // END fb:app_id

  return meta;
}

export type OpenGraphOptionalMetadata = {};

export type OpenGraphImage = {
  /** `og:image` - An image URL which should represent your object within the graph. */
  ogImage?: string;
  /** `og:image:secure_url` - An alternate url to use if the webpage requires HTTPS. */
  ogImageSecureUrl?: string;
  /** `og:image:type` - A MIME type for this image, such as `image/jpeg` for JPG or `image/png` for PNG. If not provided, the MIME type will be inferred from the extension (e.g. `.jpg`, `.png`) at the end of the URL. */
  ogImageType?: string;
  /** `og:image:width` - The number of pixels wide. */
  ogImageWidth?: number | string;
  /** `og:image:height` - The number of pixels high. */
  ogImageHeight?: number | string;
  /** `og:image:alt` - A description of what is in the image (not a caption). If the page specifies an og:image it should specify og:image:alt. */
  ogImageAlt?: string;
};
function createOpenGraphImageMetadataObjects(image: OpenGraphImage): MetaProperty[] {
  if (!image) {
    return [];
  }
  const meta: MetaProperty[] = [];
  if (image.ogImage) {
    // og:image
    meta.push({
      property: 'og:image',
      content: image.ogImage,
    });
    // og:image:url
    meta.push({
      property: 'og:image:url',
      content: image.ogImage,
    });
    // og:image:secure_url
    if (image.ogImageSecureUrl) {
      meta.push({
        property: 'og:image:secure_url',
        content: image.ogImageSecureUrl,
      });
    } else if (image.ogImage.startsWith('https')) {
      // If the link is already secure, supply it.
      meta.push({
        property: 'og:image:secure_url',
        content: image.ogImage,
      });
    }
    // og:image:type
    if (image.ogImageType) {
      meta.push({
        property: 'og:image:type',
        content: image.ogImageType,
      });
    } else {
      // If not specified, infer the MIME type for common image formats
      const mimeTypes = {
        '.art': 'image/x-jg',
        '.bm': 'image/bmp',
        '.bmp': 'image/bmp',
        '.dwg': 'image/vnd.dwg',
        '.dxf': 'image/vnd.dwg',
        '.fif': 'image/fif',
        '.flo': 'image/florian',
        '.fpx': 'image/vnd.fpx',
        '.g3': 'image/g3fax',
        '.gif': 'image/gif',
        '.ico': 'image/x-icon',
        '.ief': 'image/ief',
        '.iefs': 'image/ief',
        '.jfif': 'image/jpeg',
        '.jfif-tbnl': 'image/jpeg',
        '.jpe': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.jpg': 'image/jpeg',
        '.jps': 'image/x-jps',
        '.jut': 'image/jutvision',
        '.mcf': 'image/vasa',
        '.nap': 'image/naplps',
        '.naplps': 'image/naplps',
        '.nif': 'image/x-niff',
        '.niff': 'image/x-niff',
        '.pbm': 'image/x-portable-bitmap',
        '.pct': 'image/x-pict',
        '.pcx': 'image/x-pcx',
        '.pgm': 'image/x-portable-graymap',
        '.pic': 'image/pict',
        '.pict': 'image/pict',
        '.pm': 'image/x-xpixmap',
        '.png': 'image/png',
        '.pnm': 'image/x-portable-anymap',
        '.ppm': 'image/x-portable-pixmap',
        '.qif': 'image/x-quicktime',
        '.qti': 'image/x-quicktime',
        '.qtif': 'image/x-quicktime',
        '.ras': 'image/cmu-raster',
        '.rast': 'image/cmu-raster',
        '.rf': 'image/vnd.rn-realflash',
        '.rgb': 'image/x-rgb',
        '.rp': 'image/vnd.rn-realpix',
        '.svf': 'image/vnd.dwg',
        '.tif': 'image/tiff',
        '.tiff': 'image/tiff',
        '.turbot': 'image/florian',
        '.wbmp': 'image/vnd.wap.wbmp',
        '.webp': 'image/webp',
        '.x-png': 'image/png',
        '.xbm': 'image/xbm',
        '.xif': 'image/vnd.xiff',
        '.xpm': 'image/xpm',
        '.xwd': 'image/x-xwd',
      };
      Object.keys(mimeTypes).forEach((extension: string) => {
        if (image.ogImage.endsWith(extension)) {
          meta.push({
            property: 'og:image:type',
            content: mimeTypes[extension],
          });
        }
      });
    }
    // og:image:width
    if (image.ogImageWidth) {
      meta.push({
        property: 'og:image:width',
        content: image.ogImageWidth + '',
      });
    }
    // og:image:height
    if (image.ogImageHeight) {
      meta.push({
        property: 'og:image:height',
        content: image.ogImageHeight + '',
      });
    }
    // og:image:alt
    if (image.ogImageAlt) {
      meta.push({
        property: 'og:image:alt',
        content: image.ogImageAlt,
      });
    }
  }
  return meta;
}

export type OpenGraphVideo = {
  /** `og:video` - A video URL which should represent your object within the graph. */
  ogVideo?: string;
  /** `og:video:secure_url` - An alternate url to use if the webpage requires HTTPS. */
  ogVideoSecureUrl?: string;
  /** `og:video:type` - A MIME type for this video, such as `video/mp4` for MP4. If not provided, the MIME type will be inferred from the extension (e.g. `.mp4`) at the end of the URL. */
  ogVideoType?: string;
  /** `og:video:width` - The number of pixels wide. */
  ogVideoWidth?: number | string;
  /** `og:video:height` - The number of pixels high. */
  ogVideoHeight?: number | string;
};
function createOpenGraphVideoMetadataObjects(video: OpenGraphVideo): MetaProperty[] {
  if (!video) {
    return [];
  }
  const meta: MetaProperty[] = [];
  if (video.ogVideo) {
    // og:video
    meta.push({
      property: 'og:video',
      content: video.ogVideo,
    });
    // og:video:url
    meta.push({
      property: 'og:video:url',
      content: video.ogVideo,
    });
    // og:video:secure_url
    if (video.ogVideoSecureUrl) {
      meta.push({
        property: 'og:video:secure_url',
        content: video.ogVideoSecureUrl,
      });
    } else if (video.ogVideo.startsWith('https')) {
      // If the link is already secure, supply it.
      meta.push({
        property: 'og:video:secure_url',
        content: video.ogVideo,
      });
    }
    // og:video:type
    if (video.ogVideoType) {
      meta.push({
        property: 'og:video:type',
        content: video.ogVideoType,
      });
    } else {
      // If not specified, infer the MIME type for common video formats
      const mimeTypes = {
        '.ts': 'video/MP2T',
        '.webm': 'video/webm',
        '.3gp': 'video/3gpp',
        '.afl': 'video/animaflex',
        '.asf': 'video/x-ms-asf',
        '.asx': 'video/x-ms-asf',
        '.avi': 'video/avi',
        '.avs': 'video/avs-video',
        '.dif': 'video/x-dv',
        '.dl': 'video/dl',
        '.dv': 'video/x-dv',
        '.fli': 'video/fli',
        '.flv': 'video/x-flv',
        '.fmf': 'video/x-atomic3d-feature',
        '.gl': 'video/gl',
        '.isu': 'video/x-isvideo',
        '.m1v': 'video/mpeg',
        '.m2v': 'video/mpeg',
        '.m3u8': 'application/x-mpegURL',
        '.m4a': 'video/mp4',
        '.m4b': 'video/mp4',
        '.m4p': 'video/mp4',
        '.m4r': 'video/mp4',
        '.m4v': 'video/mp4',
        '.mjpg': 'video/x-motion-jpeg',
        '.moov': 'video/quicktime',
        '.mov': 'video/quicktime',
        '.movie': 'video/x-sgi-movie',
        '.mp2': 'video/mpeg',
        '.mp3': 'video/mpeg',
        '.mp4': 'video/mp4',
        '.mpa': 'video/mpeg',
        '.mpe': 'video/mpeg',
        '.mpeg': 'video/mpeg',
        '.mpg': 'video/mpeg',
        '.mv': 'video/x-sgi-movie',
        '.ogg': 'video/ogg',
        '.qt': 'video/quicktime',
        '.qtc': 'video/x-qtc',
        '.rv': 'video/vnd.rn-realvideo',
        '.scm': 'video/x-scm',
        '.vdo': 'video/vdo',
        '.viv': 'video/vivo',
        '.vivo': 'video/vivo',
        '.vos': 'video/vosaic',
        '.wmv': 'video/x-ms-wmv',
        '.xdr': 'video/x-amt-demorun',
        '.xsr': 'video/x-amt-showrun',
      };
      Object.keys(mimeTypes).forEach((extension: string) => {
        if (video.ogVideo.endsWith(extension)) {
          meta.push({
            property: 'og:video:type',
            content: mimeTypes[extension],
          });
        }
      });
    }
    // og:video:width
    if (video.ogVideoWidth) {
      meta.push({
        property: 'og:video:width',
        content: video.ogVideoWidth + '',
      });
    }
    // og:video:height
    if (video.ogVideoHeight) {
      meta.push({
        property: 'og:video:height',
        content: video.ogVideoHeight + '',
      });
    }
  }
  return meta;
}

export type OpenGraphAudio = {
  /** `og:audio` - A audio URL which should represent your object within the graph. */
  ogAudio?: string;
  /** `og:audio:secure_url` - An alternate url to use if the webpage requires HTTPS. */
  ogAudioSecureUrl?: string;
  /** `og:audio:type` - A MIME type for this audio, such as `audio/mpeg3` for MP3. If not provided, the MIME type will be inferred from the extension (e.g. `.mp3`) at the end of the URL. */
  ogAudioType?: string;
};
function createOpenGraphAudioMetadataObjects(audio: OpenGraphAudio): MetaProperty[] {
  if (!audio) {
    return [];
  }
  const meta: MetaProperty[] = [];
  if (audio.ogAudio) {
    // og:audio
    meta.push({
      property: 'og:audio',
      content: audio.ogAudio,
    });
    // og:audio:url
    meta.push({
      property: 'og:audio:url',
      content: audio.ogAudio,
    });
    // og:audio:secure_url
    if (audio.ogAudioSecureUrl) {
      meta.push({
        property: 'og:audio:secure_url',
        content: audio.ogAudioSecureUrl,
      });
    } else if (audio.ogAudio.startsWith('https')) {
      // If the link is already secure, supply it.
      meta.push({
        property: 'og:audio:secure_url',
        content: audio.ogAudio,
      });
    }
    // og:audio:type
    if (audio.ogAudioType) {
      meta.push({
        property: 'og:audio:type',
        content: audio.ogAudioType,
      });
    } else {
      // If not specified, infer the MIME type for common audio formats
      const mimeTypes = {
        '.aac': 'audio/aac',
        '.aif': 'audio/aiff',
        '.aifc': 'audio/aiff',
        '.aiff': 'audio/aiff',
        '.au': 'audio/basic',
        '.funk': 'audio/make',
        '.gsd': 'audio/x-gsm',
        '.gsm': 'audio/x-gsm',
        '.it': 'audio/it',
        '.jam': 'audio/x-jam',
        '.kar': 'audio/midi',
        '.la': 'audio/nspaudio',
        '.lam': 'audio/x-liveaudio',
        '.lma': 'audio/nspaudio',
        '.m2a': 'audio/mpeg',
        '.m3u': 'audio/x-mpequrl',
        '.mid': 'audio/midi',
        '.midi': 'audio/midi',
        '.mjf': 'audio/x-vnd.audioexplosion.mjuicemediafile',
        '.mod': 'audio/mod',
        '.mp2': 'audio/mpeg',
        '.mp3': 'audio/mpeg3',
        '.mp4': 'audio/mp4',
        '.mpa': 'audio/mpeg',
        '.mpg': 'audio/mpeg',
        '.mpga': 'audio/mpeg',
        '.my': 'audio/make',
        '.oga': 'audio/ogg',
        '.pfunk': 'audio/make',
        '.qcp': 'audio/vnd.qcelp',
        '.ra': 'audio/x-pn-realaudio',
        '.ram': 'audio/x-pn-realaudio',
        '.rm': 'audio/x-pn-realaudio',
        '.rmi': 'audio/mid',
        '.rmm': 'audio/x-pn-realaudio',
        '.rmp': 'audio/x-pn-realaudio',
        '.rpm': 'audio/x-pn-realaudio-plugin',
        '.s3m': 'audio/s3m',
        '.sid': 'audio/x-psid',
        '.snd': 'audio/basic',
        '.tsi': 'audio/tsp-audio',
        '.tsp': 'audio/tsplayer',
        '.voc': 'audio/voc',
        '.vox': 'audio/voxware',
        '.vqe': 'audio/x-twinvq-plugin',
        '.vqf': 'audio/x-twinvq',
        '.vql': 'audio/x-twinvq-plugin',
        '.wav': 'audio/wav',
        '.weba': 'audio/webm',
        '.xm': 'audio/xm',
      };
      Object.keys(mimeTypes).forEach((extension: string) => {
        if (audio.ogAudio.endsWith(extension)) {
          meta.push({
            property: 'og:audio:type',
            content: mimeTypes[extension],
          });
        }
      });
    }
  }
  return meta;
}

// ↓↓↓↓↓ OpenGraph Types ↓↓↓↓↓

export type OpenGraphTypeArticle = {
  /** `article:published_time` - datetime - When the article was first published. */
  articlePublishedTime?: string;
  /** `article:modified_time` - datetime - When the article was last changed. */
  articleModifiedTime?: string;
  /** `article:expiration_time` - datetime - When the article is out of date after. */
  articleExpirationTime?: string;
  /** `article:author` - string array - URI(s) to writers of the article. */
  articleAuthor?: string[];
  /** `article:section` - string - A high-level section name. E.g. Technology. For blogs, this should be the category. */
  articleSection?: string;
  /** `article:tag` - string array - Tag words associated with this article. */
  articleTag?: string[];
};
function createOpenGraphTypeArticleMetadataObjects(article: OpenGraphTypeArticle): MetaProperty[] {
  if (!article) {
    return [];
  }
  const meta: MetaProperty[] = [];
  // article:published_time
  if (article.articlePublishedTime) {
    meta.push({
      property: 'article:published_time',
      content: article.articlePublishedTime,
    });
  }
  // article:modified_time
  if (article.articleModifiedTime) {
    meta.push({
      property: 'article:modified_time',
      content: article.articleModifiedTime,
    });
  }
  // article:expiration_time
  if (article.articleExpirationTime) {
    meta.push({
      property: 'article:expiration_time',
      content: article.articleExpirationTime,
    });
  }
  // article:author
  if (article.articleAuthor) {
    article.articleAuthor.forEach((authorUri: string) => {
      meta.push({
        property: 'article:author',
        content: authorUri,
      });
    });
  }
  // article:section
  if (article.articleSection) {
    meta.push({
      property: 'article:section',
      content: article.articleSection,
    });
  }
  // article:tag
  if (article.articleTag) {
    article.articleTag.forEach((tag: string) => {
      meta.push({
        property: 'article:tag',
        content: tag,
      });
    });
  }
  return meta;
}

export type OpenGraphTypeBook = {
  /** `book:author` - string array - URI(s) to writers of the book. */
  bookAuthor?: string[];
  /** `book:isbn` - string - The ISBN */
  bookIsbn?: string;
  /** `book:release_date` - datetime - The date the book was released. */
  bookReleaseDate?: string;
  /** `book:tag` - string array - Tag words associated with this book. */
  bookTag?: string[];
};
function createOpenGraphTypeBookMetadataObjects(book: OpenGraphTypeBook): MetaProperty[] {
  if (!book) {
    return [];
  }
  const meta: MetaProperty[] = [];
  // book:author
  if (book.bookAuthor) {
    book.bookAuthor.forEach((authorUri: string) => {
      meta.push({
        property: 'book:author',
        content: authorUri,
      });
    });
  }
  // book:isbn
  if (book.bookIsbn) {
    meta.push({
      property: 'book:isbn',
      content: book.bookIsbn,
    });
  }
  // book:release_date
  if (book.bookReleaseDate) {
    meta.push({
      property: 'book:release_date',
      content: book.bookReleaseDate,
    });
  }
  // book:tag
  if (book.bookTag) {
    book.bookTag.forEach((tag: string) => {
      meta.push({
        property: 'book:tag',
        content: tag,
      });
    });
  }
  return meta;
}

export type OpenGraphTypeProfile = {
  /** `profile:first_name` - string - A name normally given to an individual by a parent or self-chosen. */
  profileFirstName?: string;
  /** `profile:last_name` - string - A name inherited from a family or marriage and by which the individual is commonly known. */
  profileLastName?: string;
  /** `profile:username` - string - A short unique string to identify them. */
  profileUsername?: string;
  /** `profile:gender` - enum(male, female) - Their gender. */
  profileGender?: string;
};
function createOpenGraphTypeProfileMetadataObjects(profile: OpenGraphTypeProfile): MetaProperty[] {
  if (!profile) {
    return [];
  }
  const meta: MetaProperty[] = [];
  // profile:first_name
  if (profile.profileFirstName) {
    meta.push({
      property: 'profile:first_name',
      content: profile.profileFirstName,
    });
  }
  // profile:last_name
  if (profile.profileLastName) {
    meta.push({
      property: 'profile:last_name',
      content: profile.profileLastName,
    });
  }
  // profile:username
  if (profile.profileUsername) {
    meta.push({
      property: 'profile:username',
      content: profile.profileUsername,
    });
  }
  // profile:gender
  if (profile.profileGender) {
    meta.push({
      property: 'profile:gender',
      content: profile.profileGender,
    });
  }
  return meta;
}

export type OpenGraphTypeWebsite = {};

export type MetaPropertiesFunction = () => MetaProperty[];

// ↑↑↑↑↑ END OpenGraph Types ↑↑↑↑↑

// === END OPEN GRAPH ===

export type TwitterMetadata = {
  // === Twitter Cards ===
  /** `twitter:card` value `summary` - [Summary Card](https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/summary) - Gives the reader a preview of the content before clicking through to your website. */
  twitterSummaryCard?: TwitterSummaryCardType;
  /** `twitter:card` value `summary_large_image` - [Summary Card with Large Image](https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/summary-card-with-large-image) - Features a large, full-width prominent image alongside a tweet. */
  twitterSummaryCardWithLargeImage?: TwitterSummaryCardWithLargeImageCardType;
  /** `twitter:card` value `player` - [Player Card](https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/player-card) - Embed a playable video or audio clip into a Tweet. */
  twitterPlayerCard?: TwitterPlayerCardType;
  /** `twitter:card` value `app` - [App Card](https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/app-card) - Provides mobile app information along with a tweet to drive installs. */
  twitterAppCard?: TwitterAppCardType;
};
function createTwitterMetadataObjects(data: TwitterMetadata): MetaProperty[] {
  if (!data) {
    return [];
  }
  const meta: MetaProperty[] = [];
  if (data.twitterSummaryCard) {
    meta.push(...createTwitterSummaryCardMetadataObjects(data.twitterSummaryCard as TwitterSummaryCardType));
  }

  if (data.twitterSummaryCardWithLargeImage) {
    meta.push(
      ...createTwitterSummaryCardWithLargeImageMetadataObjects(
        data.twitterSummaryCardWithLargeImage as TwitterSummaryCardWithLargeImageCardType
      )
    );
  }

  if (data.twitterPlayerCard) {
    meta.push(...createTwitterPlayerCardMetadataObjects(data.twitterPlayerCard as TwitterPlayerCardType));
  }

  if (data.twitterAppCard) {
    meta.push(...createTwitterAppCardMetadataObjects(data.twitterAppCard as TwitterAppCardType));
  }

  return meta;
}

/**
 * `twitter:card` value `summary`
 *
 * The Summary Card can be used for many kinds of web content, from blog posts and news articles, to products and restaurants. It is designed to give the reader a preview of the content before clicking through to your website.
 *
 * https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/summary
 */
export type TwitterSummaryCardType = {
  /** (Optional) `twitter:site` - The Twitter @username the card should be attributed to. */
  summaryCardSiteUsername?: string;
  /** (Required) `twitter:title` - A concise title for the related content. */
  summaryCardTitle?: string;
  /** (Optional) `twitter:description` - A description that concisely summarizes the content as appropriate for presentation within a Tweet. You should not re-use the title as the description or use this field to describe the general services provided by the website. */
  summaryCardDescription?: string;
  /** (Optional) `twitter:image` - A URL to a unique image representing the content of the page. You should not use a generic image such as your website logo, author photo, or other image that spans multiple pages.
   *
   * ### Image
   * Images for this Card support an aspect ratio of 1:1 with minimum dimensions of 144x144 or maximum of 4096x4096 pixels. Images must be less than 5MB in size. The image will be cropped to a square on all platforms. JPG, PNG, WEBP and GIF formats are supported. Only the first frame of an animated GIF will be used. SVG is not supported.
   */
  summaryCardImage?: string;
  /** (Optional) `twitter:image:alt` - A text description of the image conveying the essential nature of an image to users who are visually impaired. Maximum 420 characters. */
  summaryCardImageAlt?: string;
};
function createTwitterSummaryCardMetadataObjects(summaryCard: TwitterSummaryCardType): MetaProperty[] {
  if (!summaryCard) {
    return [];
  }
  const meta: MetaProperty[] = [];
  // twitter:card
  meta.push({
    property: 'twitter:card',
    content: 'summary',
  });
  // twitter:site
  if (summaryCard.summaryCardSiteUsername) {
    meta.push({
      property: 'twitter:site',
      content: summaryCard.summaryCardSiteUsername,
    });
  }
  // twitter:title
  if (summaryCard.summaryCardTitle) {
    meta.push({
      property: 'twitter:title',
      content: summaryCard.summaryCardTitle,
    });
  }
  // twitter:description
  if (summaryCard.summaryCardDescription) {
    meta.push({
      property: 'twitter:description',
      content: summaryCard.summaryCardDescription,
    });
  }
  // twitter:image
  if (summaryCard.summaryCardImage) {
    meta.push({
      property: 'twitter:image',
      content: summaryCard.summaryCardImage,
    });
  }
  // twitter:image:alt
  if (summaryCard.summaryCardImageAlt) {
    meta.push({
      property: 'twitter:image:alt',
      content: summaryCard.summaryCardImageAlt,
    });
  }
  return meta;
}

/**
 * `twitter:card` value `summary_large_image`
 *
 * The Summary Card with Large Image features a large, full-width prominent image alongside a tweet. It is designed to give the reader a rich photo experience, and clicking on the image brings the user to your website.
 *
 * https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/summary-card-with-large-image
 */
export type TwitterSummaryCardWithLargeImageCardType = {
  /** (Optional) `twitter:site` - The Twitter @username the card should be attributed to. */
  summaryCardSiteUsername?: string;
  /** (Required) `twitter:title` - A concise title for the related content. */
  summaryCardTitle?: string;
  /** (Optional) `twitter:description` - A description that concisely summarizes the content as appropriate for presentation within a Tweet. You should not re-use the title as the description or use this field to describe the general services provided by the website. */
  summaryCardDescription?: string;
  /** (Optional) `twitter:image` - A URL to a unique image representing the content of the page. You should not use a generic image such as your website logo, author photo, or other image that spans multiple pages.
   *
   * ### Image
   * Images for this Card support an aspect ratio of 2:1 with minimum dimensions of 300x157 or maximum of 4096x4096 pixels. Images must be less than 5MB in size. JPG, PNG, WEBP and GIF formats are supported. Only the first frame of an animated GIF will be used. SVG is not supported.
   */
  summaryCardImage?: string;
  /** (Optional) `twitter:image:alt` - A text description of the image conveying the essential nature of an image to users who are visually impaired. Maximum 420 characters. */
  summaryCardImageAlt?: string;
};
function createTwitterSummaryCardWithLargeImageMetadataObjects(
  summaryCard: TwitterSummaryCardWithLargeImageCardType
): MetaProperty[] {
  if (!summaryCard) {
    return [];
  }
  const meta: MetaProperty[] = [];
  // twitter:card
  meta.push({
    property: 'twitter:card',
    content: 'summary_large_image',
  });
  // twitter:site
  if (summaryCard.summaryCardSiteUsername) {
    meta.push({
      property: 'twitter:site',
      content: summaryCard.summaryCardSiteUsername,
    });
  }
  // twitter:title
  if (summaryCard.summaryCardTitle) {
    meta.push({
      property: 'twitter:title',
      content: summaryCard.summaryCardTitle,
    });
  }
  // twitter:description
  if (summaryCard.summaryCardDescription) {
    meta.push({
      property: 'twitter:description',
      content: summaryCard.summaryCardDescription,
    });
  }
  // twitter:image
  if (summaryCard.summaryCardImage) {
    meta.push({
      property: 'twitter:image',
      content: summaryCard.summaryCardImage,
    });
  }
  // twitter:image:alt
  if (summaryCard.summaryCardImageAlt) {
    meta.push({
      property: 'twitter:image:alt',
      content: summaryCard.summaryCardImageAlt,
    });
  }
  return meta;
}

/**
 * `twitter:card` value `player`
 *
 * Video and audio clips have a special place on the Twitter platform thanks to the Player Card. By implementing a few HTML meta tags to your website and following the Twitter Developer Policy, you can deliver your rich media to users across the globe.
 *
 * https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/player-card
 */
export type TwitterPlayerCardType = {
  /** (Required) `twitter:title` - The title of your content as it should appear in the card */
  playerCardTitle: string;
  /** (Required) `twitter:site` - The Twitter @username the card should be attributed to. */
  playerCardSiteUsername: string;
  /** (Optional) `twitter:description` - A description of the content in a maximum of 200 characters */
  playerCardDescription: string;
  /** (Required) `twitter:player` - HTTPS URL to iFrame player. This must be a HTTPS URL which does not generate active mixed content warnings in a web browser. The audio or video player must not require plugins such as Adobe Flash. */
  playerCardPlayer: string;
  /** (Required) `twitter:player:width` - Width of iFrame specified in twitter:player in pixels */
  playerCardPlayerWidth: number | string;
  /** (Required) `twitter:player:height` - Height of iFrame specified in twitter:player in pixels */
  playerCardPlayerHeight: number | string;
  /** (Required) `twitter:image` - Image to be displayed in place of the player on platforms that don’t support iFrames or inline players. You should make this image the same dimensions as your player. Images with fewer than 68,600 pixels (a 262x262 square image, or a 350x196 16:9 image) will cause the player card not to render. Images must be less than 5MB in size. JPG, PNG, WEBP and GIF formats are supported. Only the first frame of an animated GIF will be used. SVG is not supported. */
  playerCardImage: string;
  /** (Optional) `twitter:image:alt` - A text description of the image conveying the essential nature of an image to users who are visually impaired. Maximum 420 characters. */
  playerCardImageAlt: string;
};
function createTwitterPlayerCardMetadataObjects(playerCard: TwitterPlayerCardType): MetaProperty[] {
  if (!playerCard) {
    return [];
  }
  const meta: MetaProperty[] = [];
  // twitter:card
  meta.push({
    property: 'twitter:card',
    content: 'player',
  });
  // twitter:title
  if (playerCard.playerCardTitle) {
    meta.push({
      property: 'twitter:title',
      content: playerCard.playerCardTitle,
    });
  }
  // twitter:site
  if (playerCard.playerCardSiteUsername) {
    meta.push({
      property: 'twitter:site',
      content: playerCard.playerCardSiteUsername,
    });
  }
  // twitter:description
  if (playerCard.playerCardDescription) {
    meta.push({
      property: 'twitter:description',
      content: playerCard.playerCardDescription,
    });
  }
  // twitter:player
  if (playerCard.playerCardPlayer) {
    meta.push({
      property: 'twitter:player',
      content: playerCard.playerCardPlayer,
    });
  }
  // twitter:player:width
  if (playerCard.playerCardPlayerWidth) {
    meta.push({
      property: 'twitter:player:width',
      content: playerCard.playerCardPlayerWidth + '',
    });
  }
  // twitter:player:height
  if (playerCard.playerCardPlayerHeight) {
    meta.push({
      property: 'twitter:player:height',
      content: playerCard.playerCardPlayerHeight + '',
    });
  }
  // twitter:image
  if (playerCard.playerCardImage) {
    meta.push({
      property: 'twitter:image',
      content: playerCard.playerCardImage,
    });
  }
  // twitter:image:alt
  if (playerCard.playerCardImageAlt) {
    meta.push({
      property: 'twitter:image:alt',
      content: playerCard.playerCardImageAlt,
    });
  }
  return meta;
}

/**
 * `twitter:card` value `app`
 *
 * The App Card represents mobile applications on Twitter and is aimed at driving installs. The App Card was designed to allow for a name, description and icon, and also to highlight attributes such as the rating and the price.
 *
 * https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/app-card
 */
export type TwitterAppCardType = {
  /** (Required) `twitter:site` - The Twitter @username the card should be attributed to. */
  appCardSiteUsername: string;
  /** (Optional) `twitter:description` - You can use this as a more concise description than what you may have on the app store. This field has a maximum of 200 characters */
  appCardDescription: string;
  /** (Required) `twitter:app:id:iphone` - String value, and should be the numeric representation of your app ID in the App Store (.i.e. “307234931”) */
  appCardAppIdIphone: string;
  /** (Required) `twitter:app:id:ipad` - String value, should be the numeric representation of your app ID in the App Store (.i.e. “307234931”) */
  appCardAppIdIpad: string;
  /** (Required) `twitter:app:id:googleplay` - String value, and should be the numeric representation of your app ID in Google Play (.i.e. “com.android.app”) */
  appCardAppIdGoogleplay: string;
  /** (Optional) `twitter:app:url:iphone` - Your app’s custom URL scheme (you must include ”://” after your scheme name) */
  appCardAppUrlIphone: string;
  /** (Optional) `twitter:app:url:ipad` - Your app’s custom URL scheme */
  appCardAppUrlIpad: string;
  /** (Optional) `twitter:app:country` - If your application is not available in the US App Store, you must set this value to the two-letter country code for the App Store that contains your application. */
  appCardAppCountry: string;
  /** (Optional) `twitter:app:url:googleplay` - Your app’s custom URL scheme */
  appCardAppUrlGoogleplay: string;
};
function createTwitterAppCardMetadataObjects(appCard: TwitterAppCardType): MetaProperty[] {
  if (!appCard) {
    return [];
  }
  const meta: MetaProperty[] = [];
  // twitter:card
  meta.push({
    property: 'twitter:card',
    content: 'app',
  });
  // twitter:site
  if (appCard.appCardSiteUsername) {
    meta.push({
      property: 'twitter:site',
      content: appCard.appCardSiteUsername,
    });
  }
  // twitter:description
  if (appCard.appCardDescription) {
    meta.push({
      property: 'twitter:description',
      content: appCard.appCardDescription,
    });
  }
  // twitter:app:id:iphone
  if (appCard.appCardAppIdIphone) {
    meta.push({
      property: 'twitter:app:id:iphone',
      content: appCard.appCardAppIdIphone,
    });
  }
  // twitter:app:id:ipad
  if (appCard.appCardAppIdIpad) {
    meta.push({
      property: 'twitter:app:id:ipad',
      content: appCard.appCardAppIdIpad,
    });
  }
  // twitter:app:id:googleplay
  if (appCard.appCardAppIdGoogleplay) {
    meta.push({
      property: 'twitter:app:id:googleplay',
      content: appCard.appCardAppIdGoogleplay,
    });
  }
  // twitter:app:url:iphone
  if (appCard.appCardAppUrlIphone) {
    meta.push({
      property: 'twitter:app:url:iphone',
      content: appCard.appCardAppUrlIphone,
    });
  }
  // twitter:app:url:ipad
  if (appCard.appCardAppUrlIpad) {
    meta.push({
      property: 'twitter:app:url:ipad',
      content: appCard.appCardAppUrlIpad,
    });
  }
  // twitter:app:country
  if (appCard.appCardAppCountry) {
    meta.push({
      property: 'twitter:app:country',
      content: appCard.appCardAppCountry,
    });
  }
  // twitter:app:url:googleplay
  if (appCard.appCardAppUrlGoogleplay) {
    meta.push({
      property: 'twitter:app:url:googleplay',
      content: appCard.appCardAppUrlGoogleplay,
    });
  }
  return meta;
}
