import { useCallback, useContext } from 'react';

import { ConfigContext } from '@/context/ConfigContext';
import { useMDXContentReducer } from '@/context/MDXContentContext';
import { useApiPlaygroundCallback } from '@/hooks/useApiPlaygroundCallback';
import { useGetContentWidthCallback } from '@/hooks/useGetContentWidthCallback';
import { UseMDXContentControllerOptions } from '@/hooks/useMDXContentController';
import { useParamGroupsCallback } from '@/hooks/useParamGroupsCallback';
import { ApiComponent } from '@/types/apiComponent';
import { PageMetaTags } from '@/types/metadata';
import { createUserDefinedExamples } from '@/ui/MDXContentController/createUserDefinedExamples';
import {
  getOpenApiPlaygroundProps,
  OpenApiPlaygroundProps,
} from '@/ui/MDXContentController/getOpenApiPlaygroundProps';

export const useInitialMDXContentContext = ({
  tableOfContents,
  pageMetadata,
  apiComponents,
}: UseMDXContentControllerOptions) => {
  const { mintConfig, openApiFiles } = useContext(ConfigContext);

  // Callbacks
  const getOpenApiProps = useCallback(
    (baseIndex: number) =>
      getOpenApiPlaygroundProps(baseIndex, mintConfig, openApiFiles, pageMetadata.openapi),
    [mintConfig, openApiFiles, pageMetadata.openapi]
  );
  const getIsApi = useCallback(
    ({ api }: PageMetaTags, props: OpenApiPlaygroundProps | undefined) =>
      (api?.length ?? 0) > 0 || (props?.api?.length ?? 0) > 0,
    []
  );
  const createUserExamples = useCallback((ac: ApiComponent[]) => createUserDefinedExamples(ac), []);
  const getIsBlogMode = useCallback((pmd: PageMetaTags) => pmd.mode === 'blog', []);
  const getContentWidth = useGetContentWidthCallback();
  const getParamGroups = useParamGroupsCallback();
  const getApiPlayground = useApiPlaygroundCallback();

  // Get initial values.
  const openApiProps = getOpenApiProps(0);
  const isApi = getIsApi(pageMetadata, openApiProps);
  const isBlogMode = getIsBlogMode(pageMetadata);
  const examples = createUserExamples(apiComponents);
  const paramGroups = getParamGroups({
    apiComponents,
    pageMetadata,
    openApiPlaygroundProps: openApiProps,
  });

  // Set initial values.
  const ctx = useMDXContentReducer({
    tableOfContents,
    pageMetadata,
    apiComponents,
    isApi,
    isBlogMode,
    ...examples,
    ...openApiProps,
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
      pageMetadata,
      openApiPlaygroundProps: openApiProps,
      apiPlaygroundInputs: [],
    }),
  });

  return {
    ctx,
    createUserExamples,
    getContentWidth,
    getApiPlayground,
    getIsApi,
    getIsBlogMode,
    getOpenApiProps,
    getParamGroups,
  };
};
