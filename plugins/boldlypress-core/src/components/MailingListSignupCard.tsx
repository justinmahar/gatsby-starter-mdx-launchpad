import { graphql, useStaticQuery } from 'gatsby';
import * as React from 'react';
import { Button, Card, Form, FormControlProps } from 'react-bootstrap';
import { BsPrefixProps, ReplaceProps } from 'react-bootstrap/helpers';
import MailingListSettings from '../data/settings/MailingListSettings';
import { MailingList } from '../hooks/useMailingList';

export interface MailingListSignupCardProps {
  mailingList: MailingList;
}

export default function MailingListSignupCard(props: MailingListSignupCardProps): JSX.Element {
  const mailingList = props.mailingList;

  const data = useStaticQuery(graphql`
    query MailingListSignupCardQuery {
      mailingListYaml {
        ...mailingListSettings
      }
    }
  `);

  const mailingListSettings = new MailingListSettings(data.mailingListYaml);
  const formName = mailingListSettings.data.mailingListFormNameAttribute;
  const formActionUrl = mailingListSettings.data.mailingListFormActionUrl;
  const formMethod = mailingListSettings.data.mailingListFormMethod;
  const emailAddressFieldName = mailingListSettings.data.mailingListEmailAddressFieldNameAttribute;
  const emailAddressFieldPlaceholder = mailingListSettings.data.mailingListEmailAddressFieldPlaceholder;

  return (
    <>
      {!mailingList.mailingListSubmitSuccess && (
        <Card className="secondary">
          <Card.Img variant="top" src={mailingListSettings.data.sidebarWidget.headerImage} />
          <Card.Body>
            <Card.Title>{mailingListSettings.data.sidebarWidget.titleText}</Card.Title>
            <Card.Text
              dangerouslySetInnerHTML={{
                __html: mailingListSettings.data.sidebarWidget.bodyText,
              }}
            ></Card.Text>
            <Form
              id="subscribe-form"
              name={formName}
              action={formActionUrl}
              method={formMethod}
              onSubmit={mailingList.handleMailingListSubmit}
              data-netlify="true"
            >
              <input type="hidden" name="form-name" value={formName} />
              <Form.Group controlId="formBasicEmail">
                {mailingList.mailingListSubmitError && (
                  <Form.Text className="text-danger font-weight-bold">
                    {mailingListSettings.data.sidebarWidget.errorSubmittingText}
                  </Form.Text>
                )}
                <Form.Control
                  type="email"
                  name={emailAddressFieldName}
                  placeholder={emailAddressFieldPlaceholder}
                  value={mailingList.mailingListEmail}
                  onChange={(e: React.FormEvent<ReplaceProps<'input', BsPrefixProps<'input'> & FormControlProps>>) =>
                    mailingList.setMailingListEmail(e.currentTarget.value)
                  }
                  required
                />
                <Form.Text className="text-muted">{mailingListSettings.data.sidebarWidget.privacyText}</Form.Text>
              </Form.Group>
              <Button variant="primary" type="submit" disabled={mailingList.mailingListSubmitting} block>
                {mailingListSettings.data.sidebarWidget.buttonText}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}
      {mailingList.mailingListSubmitSuccess && (
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
