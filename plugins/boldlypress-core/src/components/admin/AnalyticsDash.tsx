import * as React from 'react';
import {
  AnalyticsDashboard,
  PageViewsPerPathChart,
  SessionsByDateChart,
  SessionsByHourChart,
  SessionsBySourceChart,
  SessionsGeoChart,
} from 'react-analytics-charts';
import { Form, Card, Button } from 'react-bootstrap';
import styled from 'styled-components';

export interface AnalyticsDashProps {}

export default function AnalyticsDash(props: AnalyticsDashProps): JSX.Element {
  const [selectedDays, setSelectedDays] = React.useState(28);
  const [days, setDays] = React.useState(28);
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      console.log('Setting days to', selectedDays);
      setDays(selectedDays);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [selectedDays]);
  return (
    <Card>
      <Card.Body>
        <Card.Title>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>Analytics</div>
            <div>
              <a href="https://analytics.google.com/analytics/web/" target="_blank" rel="noopener noreferrer">
                <Button variant="link">Analytics Home</Button>
              </a>
            </div>
          </div>
        </Card.Title>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <Form.Control
            style={{ width: '100px', marginRight: '5px' }}
            type="number"
            min={1}
            max={90}
            step={1}
            value={selectedDays + ''}
            onChange={e => setSelectedDays(parseInt(e.target.value))}
          />
          <div>days</div>
        </div>
        {days === selectedDays && (
          <ViewSelectorContainer>
            <AnalyticsDashboard
              authOptions={{ clientId: '932669268667-ptpd9g2buqb0qv56rk8ki8cpavedku83.apps.googleusercontent.com' }}
              renderCharts={(gapi, viewId) => {
                const chartStyles = {
                  margin: '15px',
                  maxWidth: 400,
                };
                return (
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <SessionsByDateChart
                      gapi={gapi}
                      viewId={viewId}
                      style={chartStyles}
                      showPageViews
                      showUsers
                      days={days}
                      options={{ title: `Sessions` }}
                    />
                    <SessionsGeoChart
                      gapi={gapi}
                      viewId={viewId}
                      style={chartStyles}
                      showPageViews
                      options={{ width: 400 }}
                      days={days}
                    />
                    <SessionsBySourceChart
                      gapi={gapi}
                      viewId={viewId}
                      style={chartStyles}
                      days={days}
                      options={{ title: `Sessions By Source` }}
                    />
                    <SessionsByHourChart
                      gapi={gapi}
                      viewId={viewId}
                      style={chartStyles}
                      days={days}
                      options={{ title: `Sessions By Hour` }}
                    />
                    <PageViewsPerPathChart
                      gapi={gapi}
                      viewId={viewId}
                      style={{ margin: '15px' }}
                      options={{ pageSize: 10 }}
                      days={days}
                    />
                  </div>
                );
              }}
            />
          </ViewSelectorContainer>
        )}
      </Card.Body>
    </Card>
  );
}

const ViewSelectorContainer = styled.div`
  .gapi-view-selector-container {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;

    table,
    td {
      width: auto !important;
      padding: 0 !important;
      margin: 0 5px 0 0 !important;
    }

    td div {
      margin: 0 !important;
    }

    td {
      border: none !important;
      &:first-child {
        display: none;
      }
    }
  }
`;
