import * as React from 'react';
import { AdminOnly, NetlifyCMSButton, NonAdminOnly, useAdmin } from 'react-authless-admin';
import { Button } from 'react-bootstrap';
import { useScrollTo } from 'react-use-window-scroll';
import SiteBuildStatusBadge from '../configured/SiteBuildStatusBadge';
import AnalyticsDash from './AnalyticsDash';
import LoginForm from './LoginForm';

export interface DashboardProps {}

export default function Dashboard(props: DashboardProps): JSX.Element {
  const [, setIsAdmin] = useAdmin();
  const scrollTo = useScrollTo();
  return (
    <div>
      <NonAdminOnly>
        <div className="mb-2">
          <LoginForm />
        </div>
      </NonAdminOnly>

      <AdminOnly>
        <div className="mb-2">
          <SiteBuildStatusBadge />
        </div>
        <div className="mb-2">
          <div>
            <div style={{ marginBottom: '10px' }}>
              <NetlifyCMSButton
                openInNewWindow
                component={Button}
                componentProps={{ variant: 'primary', style: { marginRight: '5px' } }}
              >
                Admin
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
            </div>
          </div>
        </div>
        <div className="mb-2">
          <AnalyticsDash />
        </div>
        <div className="mb-2">
          <Button
            onClick={e => {
              setIsAdmin(false);
              scrollTo(0, 0);
            }}
            variant="link"
          >
            Logout
          </Button>
        </div>
      </AdminOnly>
    </div>
  );
}
