import { useEffect } from 'react';

import { MDXContentContextType } from '@/context/MDXContentContext';
import { MDXContentActionEnum } from '@/enums/MDXContentActionEnum';
import { useApiPlaygroundCallback } from '@/hooks/useApiPlaygroundCallback';

/**
 * Gets ApiPlayground options with examples, creates generated examples and dispatches state update.
 */
export const useApiPlayground = (ctx: MDXContentContextType) => {
  const [state, dispatch] = ctx;
  const {
    pageMetadata,
    openApiPlaygroundProps,
    apiPlaygroundInputs,
    isApi,
    paramGroupDict,
    requestExample,
    apiBaseIndex,
  } = state;
  const getApiPlayground = useApiPlaygroundCallback();
  useEffect(() => {
    if (pageMetadata.api || openApiPlaygroundProps.api) {
      dispatch({
        type: MDXContentActionEnum.SET_API_PLAYGROUND,
        payload: getApiPlayground({
          isApi,
          openApiPlaygroundProps,
          apiPlaygroundInputs,
          apiBaseIndex,
          pageMetadata,
          requestExample,
          paramGroupDict,
        }),
      });
    }
  }, [
    apiBaseIndex,
    apiPlaygroundInputs,
    dispatch,
    getApiPlayground,
    isApi,
    openApiPlaygroundProps,
    pageMetadata,
    paramGroupDict,
    requestExample,
  ]);
  return [state, dispatch] as MDXContentContextType;
};
