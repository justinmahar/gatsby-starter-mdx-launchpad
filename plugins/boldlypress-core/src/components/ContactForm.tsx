import { graphql, useStaticQuery } from 'gatsby';
import * as React from 'react';
import { Alert, Button, Form, FormControlProps, Spinner } from 'react-bootstrap';
import { BsPrefixProps, ReplaceProps } from 'react-bootstrap/helpers';
import FormSettings, { FormFieldData } from '../data/settings/FormSettings';
import useContactForm, { ContactFormField } from '../hooks/useContactForm';

export interface ContactFormProps {
  className?: string;
}

export default function ContactForm(props: ContactFormProps): JSX.Element {
  const formRef = React.useRef(null);

  const [successAlertVisible, setSuccessAlertVisible] = React.useState(false);
  const [errorAlertVisible, setErrorAlertVisible] = React.useState(false);

  const data = useStaticQuery(graphql`
    query ContactFormQuery {
      formsYaml {
        ...formSettings
      }
    }
  `);

  const formSettings = new FormSettings(data.formsYaml);

  const formFields: ContactFormField[] = formSettings.data.formControls.fields.map((value: FormFieldData) => {
    return {
      ...value,
      validate: () => true,
    };
  });

  const fetchInitOptions = formSettings.asyncFetchInitOptions;

  const formModel = useContactForm('/', formFields, fetchInitOptions);

  const contactFormElements = formFields.map((formField: ContactFormField) => {
    const fieldError = formModel.formErrors[formField.nameAttribute];
    let fieldValue = formModel.formValues[formField.nameAttribute];
    fieldValue = fieldValue ? fieldValue : '';
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
            as={formField.type === 'textarea' ? 'textarea' : 'input'}
            rows="3"
            placeholder={formField.placeholder}
            name={formField.nameAttribute}
            value={fieldValue}
            required={formField.required}
            disabled={formModel.sending}
            onChange={(e: React.FormEvent<ReplaceProps<'input', BsPrefixProps<'input'> & FormControlProps>>) =>
              formModel.setFieldValue(formField.nameAttribute, e.currentTarget.value)
            }
          />
        </Form.Group>
      </div>
    );
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (formSettings.data.formAsyncEnabled) {
      e.preventDefault();
      if (formModel.validate()) {
        formModel
          .submit()
          .then(() => {
            console.log('Submitted!');
            formModel.clear();
            setSuccessAlertVisible(true);
          })
          .catch(e => {
            console.error(e);
            setErrorAlertVisible(true);
          });
      } else {
        console.error('Form is not valid');
      }
    }
  };
  return (
    <Form
      onSubmit={handleSubmit}
      ref={formRef}
      className={props.className}
      name={formSettings.data.formNameAttribute}
      data-netlify="true"
    >
      <input type="hidden" name="form-name" value={formSettings.data.formNameAttribute} />
      {successAlertVisible && (
        <Alert variant="success" onClose={() => setSuccessAlertVisible(false)} dismissible>
          Your message has been sent.
        </Alert>
      )}
      {errorAlertVisible && (
        <Alert variant="danger" onClose={() => setErrorAlertVisible(false)} dismissible>
          Sorry, something went wrong. Please try again.
        </Alert>
      )}
      {contactFormElements}
      <Button variant="primary" type="submit" disabled={formModel.sending}>
        {!!formModel.sending && (
          <>
            <Spinner animation="border" role="status" size="sm" as="span" className="mr-2">
              <span className="sr-only">Sending...</span>
            </Spinner>
            Sending...
          </>
        )}
        {!formModel.sending && <>{formSettings.data.formControls.submitButtonText}</>}
      </Button>
    </Form>
  );
}
