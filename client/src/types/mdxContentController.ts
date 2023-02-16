import { ReactNode } from 'react';

import { Config } from '@/types/config';
import { PageMetaTags } from '@/types/metadata';
import { TableOfContentsSection } from '@/types/tableOfContentsSection';
import { ApiComponent } from '@/ui/ApiPlayground';
import { OpenApiPlaygroundProps } from '@/ui/MDXContentController/getOpenApiPlaygroundProps';
import { Param } from '@/utils/api';

export type ContentWidthType = { contentWidth: string; isWideSize: boolean };

export type TableOfContentsType = {
  unregisterHeading?: (id: string) => void;
  registerHeading?: (id: string, top: number) => void;
  currentTableOfContentsSection: string | undefined;
  tableOfContents: TableOfContentsSection[];
};

export type ApiPlaygroundType = {
  showApiPlayground: boolean;
  generatedRequestExamples: any;
  api: string;
};

export type ParamGroupsType = {
  paramGroupDict: Record<string, Param[]>;
  paramGroups: { name: string; params: Param[] }[];
};

export type MDXContentControllerState = {
  apiBaseIndex: number;
  apiComponents: ApiComponent[];
  openApiPlaygroundProps: OpenApiPlaygroundProps;
  currentPath: string;
  pageMetadata: PageMetaTags;
  prev: PageMetaTags | null | undefined;
  next: PageMetaTags | null | undefined;
  mintConfig?: Config;
  isApi: boolean;
  isBlogMode: boolean;
  requestExample?: ReactNode;
  responseExample?: ReactNode;
  apiPlaygroundInputs: Record<string, any>;
};

export type MDXContentState = MDXContentControllerState &
  ApiPlaygroundType &
  ParamGroupsType &
  ContentWidthType &
  TableOfContentsType;
