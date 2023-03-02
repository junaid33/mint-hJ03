import { useEffect } from 'react';

import { MDXContentContextType } from '@/context/MDXContentContext';
import { MDXContentActionEnum } from '@/enums/MDXContentActionEnum';
import { useApiPlayground } from '@/hooks/useApiPlayground';
import { useContentWidth } from '@/hooks/useContentWidth';
import { useCurrentTableOfContentsSection } from '@/hooks/useCurrentTableOfContentsSection';
import { useInitialMDXContentContext } from '@/hooks/useInitialMDXContentContext';
import { useParamGroups } from '@/hooks/useParamGroups';
import { MDXContentControllerProps } from '@/ui/MDXContentController/MDXContentController';

export type UseMDXContentControllerOptions = Omit<MDXContentControllerProps, 'children'>;

/**
 * Manages MDXContentController state.
 */
export const useMDXContentController = (options: UseMDXContentControllerOptions) => {
  const { ctx, getIsApi, createUserExamples, getIsBlogMode, getOpenApiProps } =
    useInitialMDXContentContext(options);
  const [state, dispatch] = ctx;

  // Gets OpenApiPlaygroundProps and dispatches state update.
  useEffect(() => {
    dispatch({
      type: MDXContentActionEnum.SET_OPEN_API_PLAYGROUND_PROPS,
      payload: getOpenApiProps(state.apiBaseIndex),
    });
  }, [dispatch, getOpenApiProps, state.apiBaseIndex]);

  // Gets isApi and dispatches state update.
  useEffect(() => {
    if (state.pageMetadata.api || state.openApiPlaygroundProps.api) {
      dispatch({
        type: MDXContentActionEnum.SET_IS_API,
        payload: getIsApi(state.pageMetadata, state.openApiPlaygroundProps),
      });
    }
  }, [dispatch, getIsApi, state.openApiPlaygroundProps, state.pageMetadata]);

  // Gets isBlogMode and dispatches state update.
  useEffect(() => {
    dispatch({
      type: MDXContentActionEnum.SET_IS_BLOG_MODE,
      payload: getIsBlogMode(state.pageMetadata),
    });
  }, [dispatch, getIsBlogMode, state.pageMetadata]);

  // Gets UserDefinedExamples and dispatches state update.
  useEffect(() => {
    dispatch({
      type: MDXContentActionEnum.SET_USER_DEFINED_EXAMPLES,
      payload: createUserExamples(state.apiComponents),
    });
  }, [createUserExamples, dispatch, state.apiComponents]);

  // Other hooks
  useCurrentTableOfContentsSection(ctx);
  useContentWidth(ctx);
  useParamGroups(ctx);
  useApiPlayground(ctx);

  return [state, dispatch] as MDXContentContextType;
};
