import { graphql, useStaticQuery } from 'gatsby';
import * as React from 'react';
import { Button, Col, Container, Form, FormControlProps, Row } from 'react-bootstrap';
import { BsPrefixProps, ReplaceProps } from 'react-bootstrap/helpers';
import MailingListSettings from '../data/settings/MailingListSettings';
import { MailingList } from '../hooks/useMailingList';
import FormSettings, { FormInfo, FormFieldData } from '../data/settings/FormSettings';
import useContactForm, { ContactFormField, FormModel } from '../hooks/useContactForm';

export interface MailingListSignupContainerProps {
  formId: string;
}

export default function MailingListSignupContainer(props: MailingListSignupContainerProps): JSX.Element {
  const [successAlertVisible, setSuccessAlertVisible] = React.useState(false);
  const [errorAlertVisible, setErrorAlertVisible] = React.useState(false);

  const data = useStaticQuery(graphql`
    query MailingListSignupContainerQuery {
      mailingListYaml {
        ...mailingListSettings
      }
      formsYaml {
        ...formSettings
      }
    }
  `);
  const mailingListSettings = new MailingListSettings(data.mailingListYaml);
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

  const formModel: FormModel = useContactForm(formInfo.formActionUrl, formFields, fetchInitOptions);

  const contactFormElements: JSX.Element[] = formFields.map((formField: ContactFormField) => {
    const fieldError = formModel.formErrors[formField.nameAttribute];
    let fieldValue = formModel.formValues[formField.nameAttribute];
    fieldValue = fieldValue ? fieldValue : '';
    return (
      <div key={`field-${formField.nameAttribute}`}>
        <Form.Group controlId={formField.nameAttribute}>
          {/* <Form.Label>{formField.label}</Form.Label> */}
          {!!fieldError && (
            <Form.Text className="text-warning font-weight-bold mb-2">
              {formModel.formErrors[formField.nameAttribute]}
            </Form.Text>
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
          {formField.type === 'email' && (
            <Form.Text>{mailingListSettings.data.footerMailingListSection.privacyText}</Form.Text>
          )}
        </Form.Group>
      </div>
    );
  });

  const coverOpacity: number = 1 - mailingListSettings.data.footerMailingListSection.backgroundImageBrightness / 100;

  const containerStyles = {
    paddingTop: '6rem',
    paddingBottom: '6rem',
    borderBottom: 'solid 0.1rem #666666',
    borderTop: 'solid 0.3rem #666666',
    background: `linear-gradient(
      rgba(0, 0, 0, ${coverOpacity}), 
      rgba(0, 0, 0, ${coverOpacity})
        ), url('${
          !successAlertVisible
            ? mailingListSettings.data.footerMailingListSection.backgroundImage
            : mailingListSettings.data.footerMailingListSection.successImage
        }') no-repeat center center /cover`,
  };

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
    <Container fluid style={containerStyles} className="primary section">
      {!successAlertVisible && (
        <Row>
          <Col
            xs={{ span: 10, offset: 1 }}
            sm={{ span: 8, offset: 2 }}
            md={{ span: 6, offset: 3 }}
            lg={{ span: 4, offset: 4 }}
            style={{ textAlign: 'center', color: 'white' }}
          >
            <h4
              className="text-uppercase"
              style={{
                color: 'white',
                textDecoration: 'none',
              }}
            >
              {mailingListSettings.data.footerMailingListSection.titleText}
            </h4>
            <p
              className="my-4 font-weight-bold"
              dangerouslySetInnerHTML={{
                __html: mailingListSettings.data.footerMailingListSection.bodyText,
              }}
            ></p>
            <div className="my-5">
              {!!formInfo && (
                <Form
                  id={formInfo.formNameAttribute}
                  name={formInfo.formNameAttribute}
                  action={formInfo.formActionUrl}
                  method={formInfo.formMethod}
                  onSubmit={handleSubmit}
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                >
                  {errorAlertVisible && (
                    <Form.Text className="text-warning font-weight-bold mb-2">
                      {mailingListSettings.data.footerMailingListSection.errorSubmittingText}
                    </Form.Text>
                  )}
                  {contactFormElements}
                  <Button variant="primary" type="submit" size="lg" disabled={formModel.sending}>
                    {formInfo.formControls.submitButtonText}
                  </Button>
                </Form>
              )}
              {!formInfo && (
                <div>
                  Form{' '}
                  <code>
                    {props.formId ? props.formId : typeof props.formId === 'undefined' ? 'undefined' : 'falsy'}
                  </code>{' '}
                  not found.
                </div>
              )}
            </div>
          </Col>
        </Row>
      )}
      {successAlertVisible && (
        <Row>
          <Col md={{ span: 6, offset: 3 }} lg={{ span: 4, offset: 4 }} style={{ textAlign: 'center', color: 'white' }}>
            <h4
              className="text-uppercase"
              style={{
                color: 'white',
                textDecoration: 'none',
              }}
            >
              {mailingListSettings.data.footerMailingListSection.successTitleText}
            </h4>
            <p
              dangerouslySetInnerHTML={{
                __html: mailingListSettings.data.footerMailingListSection.successBodyText,
              }}
            ></p>
          </Col>
        </Row>
      )}
    </Container>
  );
}
