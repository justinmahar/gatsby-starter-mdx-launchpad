import * as React from 'react';
import { Spinner } from 'react-bootstrap';
import styled from 'styled-components';
import { useGoogleAnalyticsApi } from '../hooks/useGoogleAnalyticsApi';

export interface AnalyticsDashProps {}

// https://developers.google.com/analytics/devguides/reporting/embed/v1
// https://developers.google.com/analytics/devguides/reporting/embed/v1/getting-started
// https://ga-dev-tools.appspot.com/embed-api/third-party-visualizations/
export default function AnalyticsDash(props: AnalyticsDashProps): JSX.Element {
  const { gapi, ready } = useGoogleAnalyticsApi();
  React.useEffect(() => {
    if (ready)
      try {
        gapi.analytics.auth.authorize({
          container: 'embed-api-auth-container',
          clientid: '932669268667-ptpd9g2buqb0qv56rk8ki8cpavedku83.apps.googleusercontent.com',
        });
        createDashboard(gapi);
      } catch (e) {
        console.error(e);
      }
  }, [gapi, ready]);
  return (
    <>
      {!ready && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      {ready && (
        <div>
          <EmbedApiAuthContainer id="embed-api-auth-container" />
          <div id="chart-container" />
          <ViewSelectorContainer id="view-selector-container" />
        </div>
      )}
    </>
  );
}

const EmbedApiAuthContainer = styled.div`
  margin-bottom: 20px;
`;

const ViewSelectorContainer = styled.div`
  td:first-child {
    width: 100px !important;
  }
`;

const createDashboard = gapi => {
  /**
   * Create a new ViewSelector instance to be rendered inside of an
   * element with the id "view-selector-container".
   */
  const viewSelector = new gapi.analytics.ViewSelector({
    container: 'view-selector-container',
  });

  // Render the view selector to the page.
  viewSelector.execute();

  /**
   * Create a new DataChart instance with the given query parameters
   * and Google chart options. It will be rendered inside an element
   * with the id "chart-container".
   */
  const dataChart = new gapi.analytics.googleCharts.DataChart({
    query: {
      metrics: 'ga:sessions',
      dimensions: 'ga:date',
      'start-date': '30daysAgo',
      'end-date': 'yesterday',
    },
    chart: {
      container: 'chart-container',
      type: 'LINE',
      options: {
        width: '100%',
      },
    },
  });

  /**
   * Render the dataChart on the page whenever a new view is selected.
   */
  viewSelector.on('change', function(ids) {
    dataChart.set({ query: { ids: ids } }).execute();
  });
};
