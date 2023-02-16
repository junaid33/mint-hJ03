import { ReactNode, useEffect } from 'react';

import { MDXContentContextType } from '@/context/MDXContentContext';
import { MDXContentActionEnum } from '@/enums/MDXContentActionEnum';
import { GeneratedRequestExamples } from '@/layouts/ApiSupplemental';

/**
 * Gets ApiPlayground options with examples, creates generated examples and dispatches state update.
 */
export const useApiPlayground = (ctx: MDXContentContextType) => {
  const [state, dispatch] = ctx;

  const {
    pageMetadata,
    openApiPlaygroundProps,
    mintConfig,
    apiPlaygroundInputs,
    isApi,
    paramGroupDict,
    requestExample,
    apiBaseIndex,
  } = state;
  useEffect(() => {
    // TODO - make this undefined when nothing exists
    const api = openApiPlaygroundProps?.api ?? pageMetadata.api ?? '';

    const showApiPlayground = isApi && !mintConfig?.api?.hidePlayground;
    let generatedRequestExamples: ReactNode = null;
    if (!requestExample && api !== '' && showApiPlayground) {
      generatedRequestExamples = (
        <GeneratedRequestExamples
          paramGroupDict={paramGroupDict}
          apiPlaygroundInputs={apiPlaygroundInputs}
          apiBaseIndex={apiBaseIndex}
          endpointStr={api}
        />
      );
    }
    dispatch({
      type: MDXContentActionEnum.SET_API_PLAYGROUND,
      payload: {
        showApiPlayground,
        api,
        generatedRequestExamples,
      },
    });
  }, [
    apiBaseIndex,
    apiPlaygroundInputs,
    dispatch,
    isApi,
    mintConfig?.api?.hidePlayground,
    openApiPlaygroundProps?.api,
    pageMetadata.api,
    paramGroupDict,
    requestExample,
  ]);
  return [state, dispatch] as MDXContentContextType;
};
