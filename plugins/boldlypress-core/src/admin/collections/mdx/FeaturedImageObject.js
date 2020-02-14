const FeaturedImageObject = options => {
  return {
    label: 'Featured Image',
    name: 'featuredImage',
    widget: 'object',
    fields: [
      {
        label: 'Use Featured Image',
        name: 'featuredImageEnabled',
        widget: 'boolean',
        hint:
          'When disabled, the featured image will not be shown for the content. Using a featured image is HIGHLY recommended.',
        default: false,
      },
      {
        label: 'Featured Image',
        name: 'featuredImageUrl',
        widget: 'image',
        hint:
          'Recommended size is 1200x630 (1.91:1), and under 5MB. You can use Canva to edit, and can grab a free image here: https://www.pexels.com/',
        default: '/media/no-image.png',
      },
      {
        label: 'Featured Image Alt',
        name: 'featuredImageAlt',
        widget: 'string',
        hint:
          "A description of what's happening in the custom image. This is used for accessibility, so visually impaired readers can know what's up. Supports template tags. Set to none to disable.",
        default: 'none',
      },
      {
        label: 'Show Card Image',
        name: 'showCardImage',
        widget: 'string',
        hint: 'Switch on to show the featured image at the top of the content card.',
        default: false,
      },
      {
        label: 'Show Title Section',
        name: 'showTitleSection',
        widget: 'string',
        hint: 'Switch on to show the title section.',
        default: false,
      },
    ],
  };
};

export default FeaturedImageObject;
