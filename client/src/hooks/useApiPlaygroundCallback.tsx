import { ReactNode, useCallback, useContext } from 'react';

import { ConfigContext } from '@/context/ConfigContext';
import { GeneratedRequestExamples } from '@/layouts/ApiSupplemental';
import { MDXContentState } from '@/types/mdxContentController';

export const useApiPlaygroundCallback = () => {
  const { mintConfig } = useContext(ConfigContext);
  return useCallback(
    (
      state: Pick<
        MDXContentState,
        | 'isApi'
        | 'openApiPlaygroundProps'
        | 'pageMetadata'
        | 'requestExample'
        | 'paramGroupDict'
        | 'apiPlaygroundInputs'
        | 'apiBaseIndex'
      >
    ) => {
      const {
        isApi,
        openApiPlaygroundProps,
        apiPlaygroundInputs,
        apiBaseIndex,
        paramGroupDict,
        requestExample,
        pageMetadata,
      } = state;
      // TODO - make this undefined when nothing exists
      const api = openApiPlaygroundProps?.api ?? pageMetadata.api ?? '';
      const showApiPlayground = isApi && !mintConfig?.api?.hidePlayground;
      const authMethod = pageMetadata.auth ?? mintConfig?.api?.auth?.method;
      const authName = mintConfig?.api?.auth?.name;
      let generatedRequestExamples: ReactNode = null;
      if (!requestExample && api !== '' && showApiPlayground) {
        generatedRequestExamples = (
          <GeneratedRequestExamples
            paramGroupDict={paramGroupDict}
            apiPlaygroundInputs={apiPlaygroundInputs}
            apiBaseIndex={apiBaseIndex}
            endpointStr={api}
            authMethod={authMethod}
            authName={authName}
          />
        );
      }
      return { showApiPlayground, api, generatedRequestExamples };
    },
    [mintConfig?.api?.auth?.method, mintConfig?.api?.auth?.name, mintConfig?.api?.hidePlayground]
  );
};
