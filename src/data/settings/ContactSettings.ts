import { graphql } from "gatsby"

/**
  This fragment will be available globally using [Gatsby's GraphQL API](https://www.gatsbyjs.org/docs/graphql-reference/#fragments).
  
  To use: 
  ```graphql
    contactYaml {
      ...contactSettings
    }
  ```
*/
export const contactYamlQuery = graphql`
  fragment contactSettings on ContactYaml {
    contactFormActionUrl
    contactFormMethod
    contactFormNameAttribute
    contactFormAsyncEnabled
    contactFormControls {
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
`
// ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑
// Important: The shapes of the query above and the type below must match!
// ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓

export type ContactSettingsData = {
  contactFormActionUrl: string
  contactFormMethod: string
  contactFormNameAttribute: string
  /** For all async `init` options, see: https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters */
  contactFormAsyncEnabled: boolean
  contactFormControls: {
    fields: ContactFormFieldData[]
    submitButtonText: string
  }
}

export type ContactFormFieldData = {
  initialValue: string
  label: string
  nameAttribute: string
  placeholder: string
  required: boolean
  requiredErrorText: string
  type: FieldType
}

export type FieldType = "text" | "email" | "textarea" | "hidden"

// === === === === === === === === ===

export default class ContactSettings {
  asyncFetchInitOptions: RequestInit
  constructor(public data: ContactSettingsData) { 
    this.asyncFetchInitOptions = {}
  }
}