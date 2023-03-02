import { useEffect } from 'react';

import { MDXContentContextType } from '@/context/MDXContentContext';
import { MDXContentActionEnum } from '@/enums/MDXContentActionEnum';
import { useParamGroupsCallback } from '@/hooks/useParamGroupsCallback';

/**
 * Gets param groups from api components and dispatches state update.
 */
export const useParamGroups = (ctx: MDXContentContextType) => {
  const [state, dispatch] = ctx;
  const { pageMetadata, openApiPlaygroundProps, apiComponents } = state;
  const getParamGroups = useParamGroupsCallback();
  useEffect(() => {
    dispatch({
      type: MDXContentActionEnum.SET_PARAM_GROUPS,
      payload: getParamGroups({
        pageMetadata,
        openApiPlaygroundProps,
        apiComponents,
      }),
    });
  }, [apiComponents, dispatch, getParamGroups, openApiPlaygroundProps, pageMetadata]);
  return [state, dispatch] as MDXContentContextType;
};
