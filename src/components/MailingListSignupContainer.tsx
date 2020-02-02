import { graphql, useStaticQuery } from 'gatsby';
import * as React from 'react';
import { Button, Col, Container, Form, FormControlProps, Row } from 'react-bootstrap';
import { BsPrefixProps, ReplaceProps } from 'react-bootstrap/helpers';
import MailingListSettings from '../data/settings/MailingListSettings';
import { MailingList } from '../hooks/useMailingList';

export interface MailingListSignupContainerProps {
  mailingList: MailingList;
}

export default function MailingListSignupContainer(props: MailingListSignupContainerProps): JSX.Element {
  const mailingList = props.mailingList;

  const data = useStaticQuery(graphql`
    query MailingListSignupContainerQuery {
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
          !mailingList.mailingListSubmitSuccess
            ? mailingListSettings.data.footerMailingListSection.backgroundImage
            : mailingListSettings.data.footerMailingListSection.successImage
        }') no-repeat center center /cover`,
  };

  return (
    <Container fluid style={containerStyles} className="primary section">
      {!mailingList.mailingListSubmitSuccess && (
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
                    <Form.Text className="text-warning font-weight-bold mb-2">
                      {mailingListSettings.data.footerMailingListSection.errorSubmittingText}
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
                  <Form.Text>{mailingListSettings.data.footerMailingListSection.privacyText}</Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit" size="lg" disabled={mailingList.mailingListSubmitting}>
                  {mailingListSettings.data.footerMailingListSection.buttonText}
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      )}
      {mailingList.mailingListSubmitSuccess && (
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
