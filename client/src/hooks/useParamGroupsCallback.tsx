import { useCallback, useContext } from 'react';

import { ConfigContext } from '@/context/ConfigContext';
import { MDXContentState } from '@/types/mdxContentController';
import { getParamGroupsFromApiComponents } from '@/utils/api';

export const useParamGroupsCallback = () => {
  const { mintConfig } = useContext(ConfigContext);
  return useCallback(
    (state: Pick<MDXContentState, 'openApiPlaygroundProps' | 'apiComponents' | 'pageMetadata'>) => {
      const { pageMetadata, openApiPlaygroundProps, apiComponents } = state;
      const paramGroupDict = getParamGroupsFromApiComponents(
        openApiPlaygroundProps?.apiComponents ?? apiComponents,
        pageMetadata.authMethod || mintConfig?.api?.auth?.method,
        mintConfig?.api?.auth?.name
      );
      const paramGroups = Object.entries(paramGroupDict).map(([groupName, params]) => {
        return {
          name: groupName,
          params,
        };
      });
      return { paramGroupDict, paramGroups };
    },
    [mintConfig?.api?.auth?.method, mintConfig?.api?.auth?.name]
  );
};
