const builtInPageSettings = {
  label: 'Built-In Page Settings',
  name: 'builtInPageSettings',
  file: 'settings/built-in-pages/built-in-pages-settings.yml',
  fields: [
    {
      label: 'Index Page',
      name: 'rawIndexSlug',
      widget: 'relation',
      collection: 'pages',
      searchFields: ['title', 'rawSlug'],
      valueField: 'rawSlug',
      displayFields: ['title'],
      hint: 'Page to show as the index, or homepage, of the site.',
    },
    {
      label: 'Category Post Listing Page',
      name: 'rawCategoryPostListingPageSlug',
      widget: 'relation',
      collection: 'pages',
      searchFields: ['title', 'rawSlug'],
      valueField: 'rawSlug',
      displayFields: ['title'],
      hint: 'Page to use as the category post listing page.',
    },
    {
      label: 'Not Found Page',
      name: 'rawNotFoundPageSlug',
      widget: 'relation',
      collection: 'pages',
      searchFields: ['title', 'rawSlug'],
      valueField: 'rawSlug',
      displayFields: ['title'],
      hint: 'The 404 Not Found page.',
    },
  ],
};

export default builtInPageSettings;
