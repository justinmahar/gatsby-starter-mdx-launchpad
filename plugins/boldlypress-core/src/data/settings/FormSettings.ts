import { graphql } from 'gatsby';

/**
  This fragment will be available globally using [Gatsby's GraphQL API](https://www.gatsbyjs.org/docs/graphql-reference/#fragments).
  
  To use: 
  ```graphql
    formsYaml {
      ...formSettings
    }
  ```
*/
export const formsYamlQuery = graphql`
  fragment formSettings on FormsYaml {
    forms {
      formLabel
      formId
      formResponsesUrl
      formActionUrl
      formMethod
      formNameAttribute
      formAsyncEnabled
      formAsyncRequestMode
      formControls {
        fields {
          initialValue
          label
          nameAttribute
          placeholder
          required
          requiredErrorText
          type
        }
        submitButtonText
      }
    }
  }
`;
// ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑
// Important: The shapes of the query above and the type below must match!
// ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓

export type RequestMode = 'cors' | 'no-cors' | 'same-origin' | 'navigate';

export type FormInfo = {
  formLabel: string;
  formId: string;
  formResponsesUrl: string;
  formActionUrl: string;
  formMethod: string;
  formNameAttribute: string;
  /** For all async `init` options, see: https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters */
  formAsyncEnabled: boolean;
  formAsyncRequestMode: RequestMode;
  formControls: {
    fields: FormFieldData[];
    submitButtonText: string;
  };
};

export type FormSettingsData = {
  forms: FormInfo[];
};

export type FormFieldData = {
  initialValue: string;
  label: string;
  nameAttribute: string;
  placeholder: string;
  required: boolean;
  requiredErrorText: string;
  type: FieldType;
};

export type FieldType = 'text' | 'email' | 'textarea' | 'hidden';

// === === === === === === === === ===

export default class FormSettings {
  constructor(public data: FormSettingsData) {}
}
