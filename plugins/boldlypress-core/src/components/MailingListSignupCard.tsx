import { graphql, useStaticQuery } from 'gatsby';
import * as React from 'react';
import { Button, Card, Form, FormControlProps } from 'react-bootstrap';
import { BsPrefixProps, ReplaceProps } from 'react-bootstrap/helpers';
import FormSettings, { FormFieldData, FormInfo } from '../data/settings/FormSettings';
import MailingListSettings from '../data/settings/MailingListSettings';
import SiteMetadata from '../data/SiteMetadata';
import useContactForm, { ContactFormField, FormModel } from '../hooks/useContactForm';
import renderTemplateTags from '../util/render-template-tags';

export interface MailingListSignupCardProps {
  formId: string;
}

export default function MailingListSignupCard(props: MailingListSignupCardProps): JSX.Element {
  const [successAlertVisible, setSuccessAlertVisible] = React.useState(false);
  const [errorAlertVisible, setErrorAlertVisible] = React.useState(false);

  const data = useStaticQuery(graphql`
    query MailingListSignupCardQuery {
      site {
        siteMetadata {
          ...siteMetadataCommons
        }
      }
      mailingListYaml {
        ...mailingListSettings
      }
      formsYaml {
        ...formSettings
      }
    }
  `);
  const siteMetadata = new SiteMetadata(data.site.siteMetadata);
  const mailingListSettings = new MailingListSettings(data.mailingListYaml);
  const formSettings = new FormSettings(data.formsYaml);

  const templateTags: { [x: string]: string } = {
    ...siteMetadata.getTemplateTags(),
  };

  const formInfo: FormInfo | undefined = formSettings.data.forms.find((value: FormInfo) => {
    return value.formId === props.formId;
  });

  const formFields: ContactFormField[] = formInfo
    ? formInfo.formControls.fields.map((value: FormFieldData) => {
        let initialValue = value.initialValue;
        if (templateTags) {
          initialValue = renderTemplateTags(initialValue, templateTags);
        }
        return {
          ...value,
          initialValue: initialValue,
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
          {formField.type !== 'hidden' && !!fieldError && (
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
            <Form.Text className="text-muted">{mailingListSettings.data.sidebarWidget.privacyText}</Form.Text>
          )}
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
      {!successAlertVisible && (
        <Card className="secondary">
          <Card.Img variant="top" src={mailingListSettings.data.sidebarWidget.headerImage} />
          <Card.Body>
            <Card.Title>{mailingListSettings.data.sidebarWidget.titleText}</Card.Title>
            <Card.Text
              dangerouslySetInnerHTML={{
                __html: mailingListSettings.data.sidebarWidget.bodyText,
              }}
            ></Card.Text>
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
                  <Form.Text className="text-danger font-weight-bold">
                    {mailingListSettings.data.footerMailingListSection.errorSubmittingText}
                  </Form.Text>
                )}
                {contactFormElements}
                <Button variant="primary" type="submit" disabled={formModel.sending} block>
                  {formInfo.formControls.submitButtonText}
                </Button>
              </Form>
            )}
            {!formInfo && (
              <div>
                Form{' '}
                <code>{props.formId ? props.formId : typeof props.formId === 'undefined' ? 'undefined' : 'falsy'}</code>{' '}
                not found.
              </div>
            )}
          </Card.Body>
        </Card>
      )}
      {successAlertVisible && (
        <Card>
          <Card.Img variant="top" src={mailingListSettings.data.sidebarWidget.successImage} />
          <Card.Body>
            <Card.Title>{mailingListSettings.data.sidebarWidget.successTitleText}</Card.Title>
            <Card.Text
              dangerouslySetInnerHTML={{
                __html: mailingListSettings.data.sidebarWidget.successBodyText,
              }}
            ></Card.Text>
          </Card.Body>
        </Card>
      )}
    </>
  );
}
