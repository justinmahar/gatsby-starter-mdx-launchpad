import { graphql, useStaticQuery } from 'gatsby';
import * as React from 'react';
import { Alert, Button, Form, FormControlProps, Spinner } from 'react-bootstrap';
import { BsPrefixProps, ReplaceProps } from 'react-bootstrap/helpers';
import FormSettings, { FormFieldData, FormInfo } from '../data/settings/FormSettings';
import useContactForm, { ContactFormField, FormModel } from '../hooks/useContactForm';

export interface ContactFormProps {
  formId: string;
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

  const formInfo: FormInfo | undefined = formSettings.data.forms.find((value: FormInfo) => {
    return value.formId === props.formId;
  });

  const formFields: ContactFormField[] = formInfo
    ? formInfo.formControls.fields.map((value: FormFieldData) => {
        return {
          ...value,
          validate: () => true,
        };
      })
    : [];

  const fetchInitOptions: RequestInit = formInfo ? { mode: formInfo.formAsyncRequestMode } : {};

  const formModel: FormModel = useContactForm('/', formFields, fetchInitOptions);

  const contactFormElements: JSX.Element[] = formFields.map((formField: ContactFormField) => {
    const fieldError = formModel.formErrors[formField.nameAttribute];
    let fieldValue = formModel.formValues[formField.nameAttribute];
    fieldValue = fieldValue ? fieldValue : '';
    return (
      <div key={`field-${formField.nameAttribute}`}>
        <Form.Group controlId={formField.nameAttribute}>
          <Form.Label>{formField.label}</Form.Label>
          {!!fieldError && (
            <p className="text-danger font-weight-bold">
              <small>{formModel.formErrors[formField.nameAttribute]}</small>
            </p>
          )}
          <Form.Control
            type={formField.type}
            as={formField.type === 'textarea' ? 'textarea' : 'input'}
            rows={formField.type === 'textarea' ? 3 : undefined}
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
    if (formInfo.formAsyncEnabled) {
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
    <>
      {formInfo && (
        <Form
          onSubmit={handleSubmit}
          ref={formRef}
          className={props.className}
          name={formInfo ? formInfo.formNameAttribute : 'undefined'}
          data-netlify="true"
        >
          <input type="hidden" name="form-name" value={formInfo ? formInfo.formNameAttribute : 'undefined'} />
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
            {!formModel.sending && <>{formInfo.formControls.submitButtonText}</>}
          </Button>
        </Form>
      )}
      {!formInfo && (
        <div>
          Form <code>{props.formId ? props.formId : typeof props.formId === 'undefined' ? 'undefined' : 'falsy'}</code>{' '}
          not found.
        </div>
      )}
    </>
  );
}
