import { graphql } from "gatsby"

/**
  This fragment will be available globally using [Gatsby's GraphQL API](https://www.gatsbyjs.org/docs/graphql-reference/#fragments).
  
  To use: 
  ```graphql
    mailingListYaml {
      ...mailingListSettings
    }
  ```
*/
export const mailingListYamlQuery = graphql`
  fragment mailingListSettings on MailingListYaml {
    mailingListAsyncEnabled
    mailingListEmailAddressFieldNameAttribute
    mailingListEmailAddressFieldPlaceholder
    mailingListFormActionUrl
    mailingListFormMethod
    mailingListFormNameAttribute
    sidebarWidget {
      enabled
      headerImage
      titleText
      bodyText
      buttonText
      privacyText
      errorSubmittingText
      successImage
      successTitleText
      successBodyText
    }
    footerMailingListSection {
      enabled
      backgroundImage
      backgroundImageBrightness
      titleText
      bodyText
      buttonText
      privacyText
      errorSubmittingText
      successImage
      successTitleText
      successBodyText
    }
  }
`
// ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑
// Important: The shapes of the query above and the type below must match!
// ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓

export type MailingListSettingsData = {
  mailingListAsyncEnabled: boolean
  mailingListEmailAddressFieldNameAttribute: string
  mailingListEmailAddressFieldPlaceholder: string
  mailingListFormActionUrl: string
  mailingListFormMethod: string
  mailingListFormNameAttribute: string
  sidebarWidget: {
    enabled: boolean
    headerImage: string
    titleText: string
    bodyText: string
    buttonText: string
    privacyText: string
    errorSubmittingText: string
    successImage: string
    successTitleText: string
    successBodyText: string
  }
  footerMailingListSection: {
    enabled: boolean
    backgroundImage: string
    backgroundImageBrightness: number
    titleText: string
    bodyText: string
    buttonText: string
    privacyText: string
    errorSubmittingText: string
    successImage: string
    successTitleText: string
    successBodyText: string
  }
}

// === === === === === === === === ===

/**
 * The mailing list signup is configured to use Netlify Forms asynchronously using the Fetch API.
 * The form includes a hidden field with the name specified in `formName`.
 * You can change the form action URL to send the data somewhere else if you'd like.
 *
 * `formMethod` is ignored when using `asyncEnabled: true`. Use the `method` fetch option to specify `GET` or `POST` for async.
 *
 * For all async `init` options, see: https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters
 */
export default class MailingListSettings {
  public asyncFetchInitOptions: RequestInit
  constructor(public data: MailingListSettingsData) {
    this.asyncFetchInitOptions = {}
  }
}