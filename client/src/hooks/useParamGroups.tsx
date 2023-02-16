import { useEffect } from 'react';

import { MDXContentContextType } from '@/context/MDXContentContext';
import { MDXContentActionEnum } from '@/enums/MDXContentActionEnum';
import { getParamGroupsFromApiComponents } from '@/utils/api';

/**
 * Gets param groups from api components and dispatches state update.
 */
export const useParamGroups = (ctx: MDXContentContextType) => {
  const [state, dispatch] = ctx;
  const { pageMetadata, openApiPlaygroundProps, apiComponents, mintConfig } = state;
  useEffect(() => {
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
    dispatch({
      type: MDXContentActionEnum.SET_PARAM_GROUPS,
      payload: {
        paramGroups,
        paramGroupDict,
      },
    });
  }, [
    apiComponents,
    dispatch,
    mintConfig?.api?.auth?.method,
    mintConfig?.api?.auth?.name,
    openApiPlaygroundProps?.apiComponents,
    pageMetadata.authMethod,
  ]);
  return [state, dispatch] as MDXContentContextType;
};
