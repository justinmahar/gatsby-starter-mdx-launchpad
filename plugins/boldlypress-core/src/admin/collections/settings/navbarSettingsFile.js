const navbarSettings = {
  label: 'Navbar Settings',
  name: 'navbarSettings',
  file: 'settings/navbar/navbar-settings.yml',
  fields: [
    {
      label: 'Navbar Placement',
      name: 'navbarPlacement',
      widget: 'select',
      hint:
        'How the navbar should be positioned on the page. When using fixed placements, the navbar will always appear at the top/bottom. Note that the navbar may appear on the page below other sections of content, such as the featured post. In this case, Sticky Top will cause the navbar to stick to the top once the user scrolls past it.',
      options: [
        {
          label: 'On Page - Scrolls with the page content',
          value: 'default',
        },
        {
          label: 'Fixed Top - Fixed to the top',
          value: 'fixed-top',
        },
        {
          label: 'Fixed Bottom - Fixed to the bottom',
          value: 'fixed-bottom',
        },
        {
          label: 'Sticky Top - When it reaches the top, it stays there',
          value: 'sticky-top',
        },
        {
          label: 'Sticky Bottom - When it reaches the bottom, it stays there',
          value: 'sticky-bottom',
        },
      ],
    },
    {
      label: 'Fixed Top Padding',
      name: 'navbarFixedTopPadding',
      widget: 'number',
      valueType: 'int',
      min: 0,
      step: 1,
      hint:
        'This pushes the page content down by the specified amount, in pixels. When using Fixed Top placement, this setting will prevent your content from being hidden under the navbar.',
    },
    {
      label: 'Drop Shadow',
      name: 'navbarDropShadow',
      widget: 'select',
      hint: 'Choose when a shadow is shown under the nav bar for an aesthetically pleasing effect.',
      options: [
        {
          label: 'None - No drop shadow',
          value: 'none',
        },
        {
          label: 'At Top - Drop shadow when the navbar is at the top',
          value: 'at-top',
        },
        {
          label: 'Just Beyond - Drop shadow when scrolled just beyond the navbar',
          value: 'just-beyond',
        },
        {
          label: 'Always - Drop shadow always shown',
          value: 'always',
        },
      ],
    },
    {
      label: 'Navbar Logo & Description',
      name: 'navbarLogo',
      widget: 'object',
      hint: '↑ Settings for the navbar logo and description. This is the branding logo and text shown in the navbar.',
      fields: [
        {
          label: 'Show Navbar Logo Image',
          name: 'navbarLogoImageEnabled',
          widget: 'boolean',
          hint: 'Switch on to use a navbar logo image.',
        },
        {
          label: 'Use Site Icon In Navbar',
          name: 'navbarUseSiteIcon',
          widget: 'boolean',
          hint:
            'Switch on to use the site logo (configured in Site Settings) as the navbar logo. When on, the Custom Navbar Logo Image below will be ignored.',
        },
        {
          label: 'Custom Navbar Logo Image',
          name: 'navbarCustomLogoImage',
          widget: 'image',
          hint:
            'Set a custom navbar logo image. You must switch off Use Site Logo In Navbar for this to take effect. To improve performance, the image size should match the width/height specified below.',
        },
        {
          label: 'Navbar Logo Image Width',
          name: 'navbarLogoImageWidth',
          widget: 'number',
          valueType: 'int',
          min: 1,
          step: 1,
          hint:
            'Width of the navbar logo in pixels. The navbar logo image specified above will be resized to this width on the page. Defaults to 30.',
        },
        {
          label: 'Navbar Logo Image Height',
          name: 'navbarLogoImageHeight',
          widget: 'number',
          valueType: 'int',
          min: 1,
          step: 1,
          hint:
            'Height of the navbar logo in pixels. The navbar logo image specified above will be resized to this height on the page. Defaults to 30.',
        },
        {
          label: 'Navbar Logo Gap',
          name: 'navbarLogoGap',
          widget: 'number',
          valueType: 'int',
          min: 1,
          step: 1,
          hint: 'The gap between the logo image and logo text, in pixels. Defaults to 10.',
        },
        {
          label: 'Show Navbar Logo Text',
          name: 'navbarLogoTextEnabled',
          widget: 'boolean',
          hint: 'Switch on to use navbar logo text, which appears after logo image if enabled.',
        },
        {
          label: 'Navbar Logo Text',
          name: 'navbarLogoText',
          widget: 'string',
          hint: 'The navbar logo text. Supports HTML. Will collapse into the menu on smaller screens.',
        },
        {
          label: 'Show Navbar Logo Description',
          name: 'navbarLogoDescriptionEnabled',
          widget: 'boolean',
          hint: 'Switch on to show a brief description under the logo.',
        },
        {
          label: 'Navbar Logo Description',
          name: 'navbarLogoDescriptionText',
          widget: 'string',
          hint: 'The navbar logo description, appearing under the logo image and text. Supports HTML.',
        },
        {
          label: 'Hide Navbar Logo Description When Scrolling',
          name: 'navbarHideDescriptionWhenScrolling',
          widget: 'boolean',
          hint:
            'Switch on to hide the description text for the logo when scrolling. Once the user scrolls down past the navbar, the description will be hidden. If the user scrolls up past the navbar, the description will be shown again. Note than on smaller screens the description will be collapsed into the menu.',
        },
        {
          label: 'Order Reversed',
          name: 'navbarLogoOrderReversed',
          widget: 'boolean',
          hint: 'When on, text will appear first and the logo will appear after.',
        },
      ],
    },
  ],
};

export default navbarSettings;
