import { useCallback, useContext, useEffect } from 'react';

import { ConfigContext } from '@/context/ConfigContext';
import { MDXContentContextType, useMDXContentReducer } from '@/context/MDXContentContext';
import { MDXContentActionEnum } from '@/enums/MDXContentActionEnum';
import { useApiPlayground } from '@/hooks/useApiPlayground';
import { useApiPlaygroundCallback } from '@/hooks/useApiPlaygroundCallback';
import { useContentWidth } from '@/hooks/useContentWidth';
import { useCurrentPath } from '@/hooks/useCurrentPath';
import { useCurrentTableOfContentsSection } from '@/hooks/useCurrentTableOfContentsSection';
import { useGetContentWidthCallback } from '@/hooks/useGetContentWidthCallback';
import { useParamGroups } from '@/hooks/useParamGroups';
import { useParamGroupsCallback } from '@/hooks/useParamGroupsCallback';
import { usePrevNext } from '@/hooks/usePrevNext';
import { MDXContentControllerProps } from '@/ui/MDXContentController/MDXContentController';
import { createUserDefinedExamples } from '@/ui/MDXContentController/createUserDefinedExamples';
import {
  getOpenApiPlaygroundProps,
  OpenApiPlaygroundProps,
} from '@/ui/MDXContentController/getOpenApiPlaygroundProps';

/**
 * Manages MDXContentController state.
 */
export const useMDXContentController = ({
  tableOfContents,
  pageMetadata,
  apiComponents,
}: Omit<MDXContentControllerProps, 'children'>) => {
  const currentPath = useCurrentPath();
  const { prev, next } = usePrevNext();
  const { mintConfig, openApiFiles } = useContext(ConfigContext);

  // Callbacks
  const getOpenApiProps = useCallback(
    (baseIndex: number) =>
      getOpenApiPlaygroundProps(baseIndex, mintConfig, openApiFiles, pageMetadata.openapi),
    [mintConfig, openApiFiles, pageMetadata.openapi]
  );
  const getIsApi = useCallback(
    (props: OpenApiPlaygroundProps) =>
      (pageMetadata.api?.length ?? 0) > 0 || (props.api?.length ?? 0) > 0,
    [pageMetadata.api]
  );
  const createUserExamples = useCallback(
    () => createUserDefinedExamples(apiComponents),
    [apiComponents]
  );

  const getIsBlogMode = useCallback(() => pageMetadata.mode === 'blog', [pageMetadata.mode]);
  const getContentWidth = useGetContentWidthCallback();
  const getParamGroups = useParamGroupsCallback();
  const getApiPlayground = useApiPlaygroundCallback();

  // Get initial values.
  const openApiPlaygroundProps = getOpenApiProps(0);
  const isApi = getIsApi(openApiPlaygroundProps);
  const isBlogMode = getIsBlogMode();
  const examples = createUserExamples();
  const paramGroups = getParamGroups({
    mintConfig,
    apiComponents,
    pageMetadata,
    openApiPlaygroundProps,
  });

  // Set initial values.
  const ctx = useMDXContentReducer({
    mintConfig,
    tableOfContents,
    pageMetadata,
    apiComponents,
    currentPath,
    prev,
    next,
    isApi,
    isBlogMode,
    ...examples,
    ...openApiPlaygroundProps,
    ...getContentWidth({
      pageMetadata,
      isApi,
      ...examples,
    }),
    ...paramGroups,
    ...getApiPlayground({
      apiBaseIndex: 0,
      isApi,
      ...paramGroups,
      mintConfig,
      pageMetadata,
      ...examples,
      openApiPlaygroundProps,
      apiPlaygroundInputs: [],
    }),
  });

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
        payload: getIsApi(state.openApiPlaygroundProps),
      });
    }
  }, [dispatch, getIsApi, state.openApiPlaygroundProps, state.pageMetadata.api]);

  // Gets isBlogMode and dispatches state update.
  useEffect(() => {
    dispatch({
      type: MDXContentActionEnum.SET_IS_BLOG_MODE,
      payload: getIsBlogMode(),
    });
  }, [dispatch, getIsBlogMode]);

  // Gets UserDefinedExamples and dispatches state update.
  useEffect(() => {
    dispatch({
      type: MDXContentActionEnum.SET_USER_DEFINED_EXAMPLES,
      payload: createUserExamples(),
    });
  }, [createUserExamples, dispatch]);

  // Other hooks
  useCurrentTableOfContentsSection(ctx);
  useContentWidth(ctx);
  useParamGroups(ctx);
  useApiPlayground(ctx);

  return [state, dispatch] as MDXContentContextType;
};
