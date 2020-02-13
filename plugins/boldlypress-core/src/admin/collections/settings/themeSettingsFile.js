const themeSettingsFile = {
  label: 'Theme Settings',
  name: 'themeSettings',
  file: 'settings/theme/theme-settings.yml',
  fields: [
    {
      label: 'Navbar Color Scheme',
      name: 'navbarColorScheme',
      widget: 'select',
      hint: 'Choose from light or dark color scheme for the navbar.',
      options: [
        {
          label: 'Light',
          value: 'light',
        },
        {
          label: 'Dark',
          value: 'dark',
        },
      ],
    },
    {
      label: 'Navbar Background Color',
      name: 'navbarBackgroundColor',
      widget: 'select',
      hint: 'You can override the navbar background color for further customization.',
      options: [
        {
          label: 'Default',
          value: 'default',
        },
        {
          label: 'Primary Color',
          value: 'primary',
        },
        {
          label: 'Secondary Color',
          value: 'secondary',
        },
        {
          label: 'Success Color',
          value: 'success',
        },
        {
          label: 'Danger Color',
          value: 'danger',
        },
        {
          label: 'Warning Color',
          value: 'warning',
        },
        {
          label: 'Info Color',
          value: 'info',
        },
        {
          label: 'Light (default for Light color scheme)',
          value: 'light',
        },
        {
          label: 'Dark (default for Dark color scheme)',
          value: 'dark',
        },
        {
          label: 'Muted',
          value: 'muted',
        },
        {
          label: 'White',
          value: 'white',
        },
      ],
    },
    {
      label: 'Bootswatch',
      name: 'bootswatchSettings',
      widget: 'object',
      hint: '↑ Configure Bootswatch settings.',
      fields: [
        {
          label: 'Use Bootswatch Theme',
          name: 'useBootswatchTheme',
          widget: 'boolean',
          hint:
            'When on, the Bootswatch theme below will be loaded after Bootstrap. You can manually import the theme in gatsby-browser.js to speed things up and avoid the temporary flash of the original Bootstrap styles. When doing so, turn this setting off.',
        },
        {
          label: 'Bootswatch Theme',
          name: 'bootswatchThemeName',
          widget: 'select',
          options: [
            {
              label: 'Cerulean - A calm blue sky',
              value: 'cerulean',
            },
            {
              label: 'Cosmo - An ode to Metro',
              value: 'cosmo',
            },
            {
              label: 'Cyborg - Jet black and electric blue',
              value: 'cyborg',
            },
            {
              label: 'Darkly - Flatly in night mode',
              value: 'darkly',
            },
            {
              label: 'Flatly - Flat and modern',
              value: 'flatly',
            },
            {
              label: 'Journal - Crisp like a new sheet of paper',
              value: 'journal',
            },
            {
              label: 'Litera - The medium is the message',
              value: 'litera',
            },
            {
              label: 'Lumen - Light and shadow',
              value: 'lumen',
            },
            {
              label: 'Lux - A touch of class',
              value: 'lux',
            },
            {
              label: 'Materia - Material is the metaphor',
              value: 'materia',
            },
            {
              label: 'Minty - A fresh feel',
              value: 'minty',
            },
            {
              label: 'Pulse - A trace of purple',
              value: 'pulse',
            },
            {
              label: 'Sandstone - A touch of warmth',
              value: 'sandstone',
            },
            {
              label: 'Simplex - Mini and minimalist',
              value: 'simplex',
            },
            {
              label: 'Sketchy - A hand-drawn look for mockups and mirth',
              value: 'sketchy',
            },
            {
              label: 'Slate - Shades of gunmetal gray',
              value: 'slate',
            },
            {
              label: 'Solar - A spin on Solarized',
              value: 'solar',
            },
            {
              label: 'Spacelab - Silvery and sleek',
              value: 'spacelab',
            },
            {
              label: 'Superhero - The brave and the blue',
              value: 'superhero',
            },
            {
              label: 'United - Ubuntu orange and unique font',
              value: 'united',
            },
            {
              label: 'Yeti - A friendly foundation',
              value: 'yeti',
            },
          ],
          hint: 'Select a theme to use. You can preview them by visiting https://bootswatch.com',
        },
        {
          label: 'Bootswatch Theme CDN Location',
          name: 'bootswatchThemeCDNLocation',
          widget: 'string',
          hint: 'The CDN location of the theme.',
        },
        {
          label: 'Bootswatch Theme Filename',
          name: 'bootswatchThemeFilename',
          widget: 'string',
          hint:
            'The CDN filename to use for the theme, such as bootstrap.min.css. The full path to the theme file will be: $themeCDNLocation/$themeNameLowercase/$themeFilename',
        },
      ],
    },
  ],
};

export default themeSettingsFile;
