const mailingListSettingsFile = {
  label: 'Mailing List Settings',
  name: 'mailingListSettings',
  file: 'settings/mailing-list/mailing-list-settings.yml',
  fields: [
    {
      label: 'Form Action URL',
      name: 'mailingListFormActionUrl',
      widget: 'string',
      hint: 'The URL to which the mailing list form is submitted.',
    },
    {
      label: 'Form Method Attribute (Synchronous Only)',
      name: 'mailingListFormMethod',
      widget: 'string',
      hint:
        'Set the HTTP method attribute for the form. Generally this will be POST (default) or GET. Does not apply if the form is sent asynchronously (see below). This attribute will be given to the HTML <form> tag itself.',
    },
    {
      label: 'Form Name Attribute',
      name: 'mailingListFormNameAttribute',
      widget: 'string',
      hint: 'The name attribute for the form. This attribute will be given to the HTML <form> tag itself.',
    },
    {
      label: 'Email Address Name Attribute',
      name: 'mailingListEmailAddressFieldNameAttribute',
      widget: 'string',
      hint:
        'The name attribute for the email address input field. This attribute will be given to the HTML <input> tag itself.',
    },
    {
      label: 'Email Address Field Placeholder',
      name: 'mailingListEmailAddressFieldPlaceholder',
      widget: 'string',
      hint: 'The placeholder when no email has been entered yet.',
    },
    {
      label: 'Send Form Asynchronously (No Page Reload)',
      name: 'mailingListAsyncEnabled',
      widget: 'boolean',
      hint:
        'When switched on, the form will be sent asynchronously with the POST method. Turning this on generally creates a better user experience. When off, the browser will submit using the method above and the page will do a full reload. (Async uses the browser Fetch API. For advanced configuration options, see the documentation)',
    },
    {
      label: 'Sidebar Mailing List Widget',
      name: 'sidebarWidget',
      widget: 'object',
      hint: 'Settings for the sidebar widget.',
      fields: [
        {
          label: 'Enable Mailing List Sidebar Widget',
          name: 'enabled',
          widget: 'boolean',
          hint: 'Turns the sidebar mailing list widget on/off.',
        },
        {
          label: 'Header Image',
          name: 'headerImage',
          widget: 'image',
          hint: 'The header image shown at the top of the sidebar widget.',
        },
        {
          label: 'Title Text',
          name: 'titleText',
          widget: 'string',
          hint: 'The title text. This catchy headline should entice the reader into signing up!',
        },
        {
          label: 'Body Text',
          name: 'bodyText',
          widget: 'text',
          hint: 'The body text. Explain the benefits of signing up here. Make it irresistible. Supports HTML.',
        },
        {
          label: 'Button Text',
          name: 'buttonText',
          widget: 'string',
          hint: 'The text shown on the submit button.',
        },
        {
          label: 'Privacy Text',
          name: 'privacyText',
          widget: 'string',
          hint: 'The text shown under the email field that assures the user their privacy is important to you.',
        },
        {
          label: 'Error Submitting Text',
          name: 'errorSubmittingText',
          widget: 'string',
          hint: 'The text shown when there is an error submitting the form.',
        },
        {
          label: 'Success Image',
          name: 'successImage',
          widget: 'image',
          hint: 'The success image, shown in place of the header image when submitting is successful.',
        },
        {
          label: 'Success Title Text',
          name: 'successTitleText',
          widget: 'string',
          hint: 'The title text shown when finished submitting.',
        },
        {
          label: 'Success Body Text',
          name: 'successBodyText',
          widget: 'text',
          hint: 'The message shown when finished submitting. Supports HTML.',
        },
      ],
    },
    {
      label: 'Footer Mailing List Section',
      name: 'footerMailingListSection',
      widget: 'object',
      hint: 'Settings for the footer mailing list section.',
      fields: [
        {
          label: 'Enable Mailing List Footer Section',
          name: 'enabled',
          widget: 'boolean',
          hint: 'Turns the footer mailing list section on/off.',
        },
        {
          label: 'Background Image',
          name: 'backgroundImage',
          widget: 'image',
          hint: 'The image shown in the background of the section.',
        },
        {
          label: 'Background Image Brightness',
          name: 'backgroundImageBrightness',
          widget: 'number',
          valueType: 'int',
          min: 0,
          max: 100,
          step: 1,
          hint: 'How bright the image appears on a scale from 0-100, 0 being darkest.',
        },
        {
          label: 'Title Text',
          name: 'titleText',
          widget: 'string',
          hint: 'The title text. This catchy headline should entice the reader into signing up!',
        },
        {
          label: 'Body Text',
          name: 'bodyText',
          widget: 'text',
          hint: 'The body text. Explain the benefits of signing up here. Make it irresistible. Supports HTML.',
        },
        {
          label: 'Button Text',
          name: 'buttonText',
          widget: 'string',
          hint: 'The text shown on the submit button.',
        },
        {
          label: 'Privacy Text',
          name: 'privacyText',
          widget: 'string',
          hint: 'The text shown under the email field that assures the user their privacy is important to you.',
        },
        {
          label: 'Error Submitting Text',
          name: 'errorSubmittingText',
          widget: 'string',
          hint: 'The text shown when there is an error submitting the form.',
        },
        {
          label: 'Success Image',
          name: 'successImage',
          widget: 'image',
          hint: 'The success image, shown in place of the background image when submitting is successful.',
        },
        {
          label: 'Success Title Text',
          name: 'successTitleText',
          widget: 'string',
          hint: 'The title text shown when finished submitting.',
        },
        {
          label: 'Success Body Text',
          name: 'successBodyText',
          widget: 'text',
          hint: 'The message shown when finished submitting. Supports HTML.',
        },
      ],
    },
  ],
};

export default mailingListSettingsFile;
