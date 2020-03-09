import * as React from 'react';
import { useDelayEffect } from '../useDelayEffect';

export interface MockQueryResult<TData> {
  data: TData | undefined;
  loading: boolean;
  called: boolean;
}

export function useMockQuery<TMockQueryData>(
  mockData: TMockQueryData,
  restartTrigger: null | string | number | boolean = null,
  delayInMillis: number = randomDelay()
): MockQueryResult<TMockQueryData> {
  const [data, setData] = React.useState<TMockQueryData | undefined>(undefined);
  const [firstRun, setFirstRun] = React.useState<boolean>(true);
  const [called, setCalled] = React.useState<boolean>(false);
  const [prevRestartTrigger, setPrevRestartTrigger] = React.useState<null | string | number | boolean>(restartTrigger);

  const loading: boolean = firstRun || prevRestartTrigger !== restartTrigger;

  useDelayEffect(loading, delayInMillis, restartTrigger, () => {
    setCalled(true);
    setData(mockData);
    setFirstRun(false);
    setPrevRestartTrigger(restartTrigger);
  });

  return {
    data,
    loading,
    called: called,
  };
}

const randomDelay = (): number => {
  const MAX = 1000;
  const MIN = 50;
  return (MAX - MIN) * Math.random() + MIN;
};
