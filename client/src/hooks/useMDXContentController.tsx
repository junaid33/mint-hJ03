import { useContext, useEffect } from 'react';

import { ConfigContext } from '@/context/ConfigContext';
import { MDXContentContextType, useMDXContentReducer } from '@/context/MDXContentContext';
import { MDXContentActionEnum } from '@/enums/MDXContentActionEnum';
import { useApiPlayground } from '@/hooks/useApiPlayground';
import { useContentWidth } from '@/hooks/useContentWidth';
import { useCurrentPath } from '@/hooks/useCurrentPath';
import { useCurrentTableOfContentsSection } from '@/hooks/useCurrentTableOfContentsSection';
import { useParamGroups } from '@/hooks/useParamGroups';
import { usePrevNext } from '@/hooks/usePrevNext';
import { MDXContentControllerProps } from '@/ui/MDXContentController/MDXContentController';
import { createUserDefinedExamples } from '@/ui/MDXContentController/createUserDefinedExamples';
import { getOpenApiPlaygroundProps } from '@/ui/MDXContentController/getOpenApiPlaygroundProps';

/**
 * Manages MDXContentController state.
 */
export const useMDXContentController = ({
  tableOfContents,
  pageMetadata,
  apiComponents,
}: Omit<MDXContentControllerProps, 'children'>) => {
  const ctx = useMDXContentReducer({
    tableOfContents,
    pageMetadata,
    apiComponents,
  });
  const [state, dispatch] = ctx;
  const { mintConfig, openApiFiles } = useContext(ConfigContext);

  const currentPath = useCurrentPath();
  const { prev, next } = usePrevNext();

  // Populates state with values from params/hooks.
  useEffect(() => {
    dispatch({
      type: MDXContentActionEnum.SET_STATE,
      payload: {
        currentPath,
        mintConfig,
        prev,
        next,
      },
    });
  }, [currentPath, dispatch, mintConfig, next, prev]);

  // Gets OpenApiPlaygroundProps and dispatches state update.
  useEffect(() => {
    const openApiPlaygroundProps = getOpenApiPlaygroundProps(
      state.apiBaseIndex,
      mintConfig,
      openApiFiles,
      pageMetadata.openapi
    );
    dispatch({
      type: MDXContentActionEnum.SET_OPEN_API_PLAYGROUND_PROPS,
      payload: openApiPlaygroundProps,
    });
  }, [dispatch, mintConfig, openApiFiles, pageMetadata.openapi, state.apiBaseIndex]);

  // Gets isApi and dispatches state update.
  useEffect(() => {
    const isApi =
      (pageMetadata.api?.length ?? 0) > 0 || (state.openApiPlaygroundProps?.api?.length ?? 0) > 0;
    dispatch({
      type: MDXContentActionEnum.SET_IS_API,
      payload: isApi,
    });
  }, [dispatch, pageMetadata.api?.length, state.openApiPlaygroundProps?.api?.length]);

  // Gets isBlogMode and dispatches state update.
  useEffect(() => {
    const isBlogMode = pageMetadata.mode === 'blog';
    dispatch({
      type: MDXContentActionEnum.SET_IS_BLOG_MODE,
      payload: isBlogMode,
    });
  }, [dispatch, pageMetadata.mode]);

  // Gets UserDefinedExamples and dispatches state update.
  useEffect(() => {
    const { requestExample, responseExample } = createUserDefinedExamples(apiComponents);
    dispatch({
      type: MDXContentActionEnum.SET_USER_DEFINED_EXAMPLES,
      payload: {
        requestExample,
        responseExample,
      },
    });
  }, [apiComponents, dispatch]);

  useCurrentTableOfContentsSection(ctx);
  useContentWidth(ctx);
  useParamGroups(ctx);
  useApiPlayground(ctx);

  return [state, dispatch] as MDXContentContextType;
};
