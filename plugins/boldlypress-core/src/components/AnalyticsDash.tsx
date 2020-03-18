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
          <div id="embed-api-auth-container"></div>
          <div id="chart-container"></div>
          <div id="main-chart-container"></div>
          <div id="breakdown-chart-container"></div>
          <ViewSelectorContainer id="view-selector-container" />
        </div>
      )}
    </>
  );
}

const ViewSelectorContainer = styled.div`
  td:first-child {
    width: 120px !important;
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

  /**
   * Create a table chart showing top browsers for users to interact with.
   * Clicking on a row in the table will update a second timeline chart with
   * data from the selected browser.
   */
  const mainChart = new gapi.analytics.googleCharts.DataChart({
    query: {
      dimensions: 'ga:browser',
      metrics: 'ga:sessions',
      sort: '-ga:sessions',
      'max-results': '6',
    },
    chart: {
      type: 'TABLE',
      container: 'main-chart-container',
      options: {
        width: '100%',
      },
    },
  });

  /**
   * Create a timeline chart showing sessions over time for the browser the
   * user selected in the main chart.
   */
  const breakdownChart = new gapi.analytics.googleCharts.DataChart({
    query: {
      dimensions: 'ga:date',
      metrics: 'ga:sessions',
      'start-date': '7daysAgo',
      'end-date': 'yesterday',
    },
    chart: {
      type: 'LINE',
      container: 'breakdown-chart-container',
      options: {
        width: '100%',
      },
    },
  });

  /**
   * Store a refernce to the row click listener variable so it can be
   * removed later to prevent leaking memory when the chart instance is
   * replaced.
   */
  let mainChartRowClickListener;

  /**
   * Update both charts whenever the selected view changes.
   */
  viewSelector.on('change', function(ids) {
    const options = { query: { ids: ids } };

    // Clean up any event listeners registered on the main chart before
    // rendering a new one.
    if (mainChartRowClickListener) {
      google.visualization.events.removeListener(mainChartRowClickListener);
    }

    mainChart.set(options).execute();
    breakdownChart.set(options);

    // Only render the breakdown chart if a browser filter has been set.
    if (breakdownChart.get().query.filters) breakdownChart.execute();
  });

  /**
   * Each time the main chart is rendered, add an event listener to it so
   * that when the user clicks on a row, the line chart is updated with
   * the data from the browser in the clicked row.
   */
  mainChart.on('success', function(response) {
    const chart = response.chart;
    const dataTable = response.dataTable;

    // Store a reference to this listener so it can be cleaned up later.
    mainChartRowClickListener = google.visualization.events.addListener(chart, 'select', function(event) {
      // When you unselect a row, the "select" event still fires
      // but the selection is empty. Ignore that case.
      if (!chart.getSelection().length) return;

      const row = chart.getSelection()[0].row;
      const browser = dataTable.getValue(row, 0);
      const options = {
        query: {
          filters: 'ga:browser==' + browser,
        },
        chart: {
          options: {
            title: browser,
          },
        },
      };

      breakdownChart.set(options).execute();
    });
  });
};
