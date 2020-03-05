const formSettingsFile = {
  label: 'Form Settings',
  name: 'formSettings',
  file: 'settings/forms/form-settings.yml',
  fields: [
    {
      label: 'Forms',
      name: 'forms',
      widget: 'list',
      fields: [
        {
          label: 'Form Label',
          name: 'formLabel',
          widget: 'string',
          hint: 'The label for the form. For your reference in this admin dashboard only.',
        },
        {
          label: 'Form ID',
          name: 'formId',
          widget: 'string',
          hint: 'An ID used to reference this form via the CMS. This is not the HTML ID. Must be unique.',
        },
        {
          label: 'Form Action URL',
          name: 'formActionUrl',
          widget: 'string',
          hint: 'The URL to which the contact form is submitted.',
        },
        {
          label: 'Form Method Attribute (Synchronous Only)',
          name: 'formMethod',
          widget: 'string',
          hint:
            'Set the HTTP method attribute for the form. Generally this will be POST (default) or GET. Does not apply if the form is sent asynchronously (see below). This attribute will be given to the HTML <form> tag itself.',
        },
        {
          label: 'Form Name Attribute',
          name: 'formNameAttribute',
          widget: 'string',
          hint: 'The name attribute for the form. This attribute will be given to the HTML <form> tag itself.',
        },
        {
          label: 'Send Form Asynchronously (No Page Reload)',
          name: 'formAsyncEnabled',
          widget: 'boolean',
          hint:
            'When switched on, the form will be sent asynchronously with the POST method. Turning this on generally creates a better user experience. When off, the browser will submit using the method above and the page will do a full reload. (Async uses the browser Fetch API. For advanced configuration options, see the documentation)',
        },
        {
          label: 'Form Async Request Mode',
          name: 'formAsyncRequestMode',
          widget: 'select',
          options: [
            {
              label:
                'same-origin - If a request is made to another origin with this mode set, the result is simply an error. You could use this to ensure that a request is always being made to your origin.',
              value: 'same-origin',
            },
            {
              label:
                'no-cors - Prevents the method from being anything other than HEAD, GET or POST, and the headers from being anything other than simple headers. If any ServiceWorkers intercept these requests, they may not add or override any headers except for those that are simple headers. In addition, JavaScript may not access any properties of the resulting Response. This ensures that ServiceWorkers do not affect the semantics of the Web and prevents security and privacy issues arising from leaking data across domains.',
              value: 'no-cors',
            },
            {
              label:
                'cors - Allows cross-origin requests, for example to access various APIs offered by 3rd party vendors. These are expected to adhere to the CORS protocol. Only a limited set of headers are exposed in the Response, but the body is readable.',
              value: 'cors',
            },
            {
              label:
                'navigate - A mode for supporting navigation. The navigate value is intended to be used only by HTML navigation. A navigate request is created only while navigating between documents.',
              value: 'navigate',
            },
          ],
          default: 'no-cors',
          hint:
            'The mode you want to use for the request, e.g., cors, no-cors, same-origin, or navigate. The default is cors. Use no-cors for services like Google Forms.',
        },
        {
          label: 'Controls',
          name: 'formControls',
          widget: 'object',
          fields: [
            {
              label: 'Fields',
              name: 'fields',
              widget: 'list',
              hint:
                "You can have as many fields as you'd like. At a minimum, most contact forms have a name, email, and message.",
              fields: [
                {
                  label: 'Field Label Text',
                  name: 'label',
                  widget: 'string',
                  default: '',
                  hint: 'The label text shown for the field. Examples: Name, Email, Subject, Message',
                },
                {
                  label: 'Field Name Attribute',
                  name: 'nameAttribute',
                  widget: 'string',
                  hint:
                    'The name attribute for this field. Must be unique among the other fields! Examples: name, emailAddress, subject, entry.12345',
                },
                {
                  label: 'Initial Value',
                  name: 'initialValue',
                  widget: 'string',
                  required: false,
                  default: '',
                  hint:
                    'The initial value for the field. Supports all template tags from Site Settings, such as {siteName}.',
                },
                {
                  label: 'Field Type',
                  name: 'type',
                  widget: 'select',
                  options: [
                    {
                      label: 'Text',
                      value: 'text',
                    },
                    {
                      label: 'Email',
                      value: 'email',
                    },
                    {
                      label: 'Textarea',
                      value: 'textarea',
                    },
                    {
                      label: 'Hidden',
                      value: 'hidden',
                    },
                  ],
                  default: 'text',
                  hint:
                    'Select the type of field. Text fields are a single line, email fields will be validated by the browser automatically, and text areas offer multple lines of input.',
                },
                {
                  label: 'Field Placeholder Text',
                  name: 'placeholder',
                  widget: 'string',
                  default: 'Enter this field',
                  hint: 'The placeholder text shown in the field when nothing has been entered yet.',
                },
                {
                  label: 'Required?',
                  name: 'required',
                  widget: 'boolean',
                  default: true,
                  hint:
                    'Whether this will be a required field or not. If required, the form will not submit until it has been filled in.',
                },
                {
                  label: 'Required Field Error Text',
                  name: 'requiredErrorText',
                  widget: 'string',
                  default: 'This field is required.',
                  hint:
                    'The error message shown when a required field is not filled in. The browser may override this message with its own.',
                },
              ],
            },
            {
              label: 'Submit Button Text',
              name: 'submitButtonText',
              widget: 'string',
              default: 'Send',
              hint: 'The text used on the submit button.',
            },
          ],
        },
      ],
    },
  ],
};

export default formSettingsFile;
