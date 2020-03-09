// import * as React from 'react';
// import { QueryParamConfig, useQueryParam } from 'use-query-params';

// /**
//  * Use this hook to synchronize state with a query parameter in the URL.
//  * Normally, updates to query params are invisible to React, so this hook
//  * will allow changes to a particular query param to be visible to your
//  * components.
//  *
//  * This state hook retrieves its initial state from the query params and replaces
//  * all set state values in the query params thereafter, keeping them in sync.
//  *
//  * If no query parameter exits, state will be the default state provided to the hook,
//  * or undefined if no default is provided.
//  *
//  * Depends on `use-query-params` module.
//  *
//  * @param paramName Name of the query parameter (shown in URL).
//  * @param paramConfig The config for this parameter. Specifies if it's a string, number, etc. See: https://github.com/pbeshai/use-query-params#param-types
//  * @param defaultState Optional. Provide a default state if no query parameter is found. Default is undefined.
//  */
// export function useQueryParamState<StateType>(
//   paramName: string,
//   paramConfig: QueryParamConfig<StateType | undefined, StateType | undefined>,
//   defaultState: StateType | undefined = undefined
// ): [StateType | undefined, (value: StateType | undefined) => void] {
//   const [firstRender, setFirstRender] = React.useState<boolean>(true);
//   const [internalState, setInternalState] = React.useState<StateType | undefined>(undefined);
//   const [paramState, setParamState] = useQueryParam<StateType | undefined, StateType | undefined>(
//     paramName,
//     paramConfig
//   );

//   const updateType: QueryParamUpdateType = 'replaceIn';

//   const setState = (newState: StateType | undefined): void => {
//     setInternalState(newState);
//     setParamState(newState, updateType);
//   };

//   React.useEffect(() => {
//     return () => {
//       if (firstRender) {
//         setFirstRender(false);
//         // If on first render we actually have a param, use it.
//         if (typeof paramState !== 'undefined') {
//           setInternalState(paramState);
//         }
//         // Else if we don't have a param state but a default state exists, use it.
//         else if (typeof defaultState !== 'undefined') {
//           setInternalState(defaultState);
//           setParamState(defaultState, updateType);
//         }
//       }
//     };
//   });

//   return [internalState, setState];
// }

// type QueryParamUpdateType = 'replaceIn' | 'replace' | 'push' | 'pushIn' | undefined;
