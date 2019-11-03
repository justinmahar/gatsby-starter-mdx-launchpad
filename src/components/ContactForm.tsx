import { graphql, useStaticQuery } from "gatsby"
import * as React from "react"
import { Alert, Button, Form, FormControlProps, Spinner } from "react-bootstrap"
import { BsPrefixProps, ReplaceProps } from "react-bootstrap/helpers"
import useContactForm, { ContactFormField } from "../hooks/useContactForm"
import ContactSettings, { ContactFormFieldData } from "../data/settings/ContactSettings"

export interface IContactFormProps {
  className?: string
}

export default function ContactForm(props: IContactFormProps) {
  const formRef = React.useRef(null)

  const [successAlertVisible, setSuccessAlertVisible] = React.useState(false)
  const [errorAlertVisible, setErrorAlertVisible] = React.useState(false)

  const data = useStaticQuery(graphql`
    query ContactFormQuery {
      contactYaml {
        ...contactSettings
      }
    }
  `)

  const contactSettings = new ContactSettings(data.contactYaml)

  const formFields: ContactFormField[] =
    contactSettings.data.contactFormControls.fields.map((value: ContactFormFieldData) => {
      return {
        ...value,
        validate: () => true
      }
    })

  const fetchInitOptions = contactSettings.asyncFetchInitOptions

  const formModel = useContactForm("/", formFields, fetchInitOptions)

  const contactFormElements = formFields.map((formField: ContactFormField) => {
    const fieldError = formModel.formErrors[formField.nameAttribute]
    let fieldValue = formModel.formValues[formField.nameAttribute]
    fieldValue = !!fieldValue ? fieldValue : ""
    return (
      <div key={`field-${formField.nameAttribute}`}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>{formField.label}</Form.Label>
          {!!fieldError && (
            <p className="text-danger font-weight-bold">
              <small>{formModel.formErrors[formField.nameAttribute]}</small>
            </p>
          )}
          <Form.Control
            type={formField.type}
            as={formField.type === "textarea" ? "textarea" : "input"}
            rows="3"
            placeholder={formField.placeholder}
            name={formField.nameAttribute}
            value={fieldValue}
            required={formField.required}
            disabled={formModel.sending}
            onChange={(
              e: React.FormEvent<
                ReplaceProps<"input", BsPrefixProps<"input"> & FormControlProps>
              >
            ) =>
              formModel.setFieldValue(
                formField.nameAttribute,
                e.currentTarget.value
              )
            }
          />
        </Form.Group>
      </div>
    )
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (contactSettings.data.contactFormAsyncEnabled) {
      e.preventDefault()
      if (formModel.validate()) {
        formModel
          .submit()
          .then(() => {
            console.log("Submitted!")
            formModel.clear()
            setSuccessAlertVisible(true)
          })
          .catch(e => {
            console.error(e)
            setErrorAlertVisible(true)
          })
      } else {
        console.error("Form is not valid")
      }
    }
  }
  return (
    <Form
      onSubmit={handleSubmit}
      ref={formRef}
      className={props.className}
      name={contactSettings.data.contactFormNameAttribute}
      data-netlify="true"
    >
      <input
        type="hidden"
        name="form-name"
        value={contactSettings.data.contactFormNameAttribute}
      />
      {successAlertVisible && (
        <Alert
          variant="success"
          onClose={() => setSuccessAlertVisible(false)}
          dismissible
        >
          Your message has been sent.
        </Alert>
      )}
      {errorAlertVisible && (
        <Alert
          variant="danger"
          onClose={() => setErrorAlertVisible(false)}
          dismissible
        >
          Sorry, something went wrong. Please try again.
        </Alert>
      )}
      {contactFormElements}
      <Button variant="primary" type="submit" disabled={formModel.sending}>
        {!!formModel.sending && (
          <>
            <Spinner
              animation="border"
              role="status"
              size="sm"
              as="span"
              className="mr-2"
            >
              <span className="sr-only">Sending...</span>
            </Spinner>
            Sending...
          </>
        )}
        {!formModel.sending && (
          <>{contactSettings.data.contactFormControls.submitButtonText}</>
        )}
      </Button>
    </Form>
  )
}
