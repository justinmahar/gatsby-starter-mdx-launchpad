import { ApolloError } from 'apollo-client';
import * as React from 'react';

export type MockMutationResult<TMockMutationData, TMockMutationVariables> = [
  (
    mockData: TMockMutationData,
    options?: MockMutationOptions<TMockMutationData, TMockMutationVariables>
  ) => Promise<TMockMutationData>,
  {
    data: TMockMutationData | undefined;
    loading: boolean;
    called: boolean;
  }
];

export interface MockMutationOptions<TMockMutationData, TMockMutationVariables> {
  onCompleted: ((data: TMockMutationData) => void) | undefined;
  onError: ((error: ApolloError) => void) | undefined;
  variables: TMockMutationVariables;
}

export function useMockMutation<TMockMutationData, TMockMutationVariables>(
  delayInMillis: number = randomDelay()
): MockMutationResult<TMockMutationData, TMockMutationVariables> {
  const [data, setData] = React.useState<TMockMutationData | undefined>(undefined);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [called, setCalled] = React.useState<boolean>(false);

  const mockMutateFunction = (
    mockData: TMockMutationData,
    options?: MockMutationOptions<TMockMutationData, TMockMutationVariables>
  ): Promise<TMockMutationData> => {
    setLoading(true);
    setCalled(true);
    return new Promise((resolve: (data: TMockMutationData) => void) => {
      setTimeout(() => {
        setData(mockData);
        setLoading(false);
        if (!!options && !!options.onCompleted) {
          options.onCompleted(mockData);
        }
        resolve(mockData);
      }, delayInMillis);
    });
  };

  return [
    mockMutateFunction,
    {
      data,
      loading,
      called,
    },
  ];
}

const randomDelay = (): number => {
  const MAX = 2000;
  const MIN = 50;
  return (MAX - MIN) * Math.random() + MIN;
};
