import * as React from 'react';
import { AdminOnly, NetlifyCMSButton, NonAdminOnly, useAdmin } from 'react-authless-admin';
import { Button, Card } from 'react-bootstrap';
import { useScrollTo } from 'react-use-window-scroll';
import SiteBuildStatusBadge from '../SiteBuildStatusBadge';
import AnalyticsDash from './AnalyticsDash';
import LoginForm from './LoginForm';
import { useSettings } from '../../../data/useSettings';

export interface DashboardProps {}

export default function Dashboard(props: DashboardProps): JSX.Element {
  const settings = useSettings();
  const [, setIsAdmin] = useAdmin();
  const scrollTo = useScrollTo();

  const formListItems = settings.data.formsYaml.forms.map((form, index) => {
    return (
      <li key={`form-${index}`}>
        <a href={form.formResponsesUrl} target="_blank" rel="noopener noreferrer">
          {form.formLabel}
        </a>
      </li>
    );
  });
  return (
    <div>
      <NonAdminOnly>
        <div className="mb-2">
          <LoginForm />
        </div>
      </NonAdminOnly>

      <AdminOnly>
        <h1>Dashboard</h1>
        <div className="mb-2 mt-4" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className="mb-2">
            <div>
              <div style={{ marginBottom: '10px' }}>
                <NetlifyCMSButton
                  openInNewWindow
                  component={Button}
                  componentProps={{ variant: 'primary', style: { marginRight: '5px' } }}
                >
                  CMS
                </NetlifyCMSButton>
                <NetlifyCMSButton
                  openInNewWindow
                  collection="settings"
                  component={Button}
                  componentProps={{ variant: 'outline-primary', style: { marginRight: '5px' } }}
                >
                  Settings
                </NetlifyCMSButton>
                <NetlifyCMSButton
                  openInNewWindow
                  collection="pages"
                  component={Button}
                  componentProps={{ variant: 'outline-primary', style: { marginRight: '5px' } }}
                >
                  Pages
                </NetlifyCMSButton>
                <NetlifyCMSButton
                  openInNewWindow
                  collection="posts"
                  component={Button}
                  componentProps={{ variant: 'outline-primary', style: { marginRight: '5px' } }}
                >
                  Posts
                </NetlifyCMSButton>
                <Button
                  onClick={(e) => {
                    setIsAdmin(false);
                    scrollTo(0, 0);
                  }}
                  variant="link"
                  style={{ marginRight: '5px' }}
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
          <div className="mb-2">
            <SiteBuildStatusBadge />
          </div>
        </div>
        <div className="mb-2">
          <Card>
            <Card.Body>
              <Card.Title>Form Responses</Card.Title>
              <Card.Text>
                <ul>{formListItems}</ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="mb-2">
          <AnalyticsDash />
        </div>
      </AdminOnly>
    </div>
  );
}
