import { MDXRemoteSerializeResult } from 'next-mdx-remote/dist/types';

import type { Config } from '@/types/config';
import { FaviconsProps } from '@/types/favicons';
import { Groups, PageMetaTags } from '@/types/metadata';
import { OpenApiFile } from '@/types/openApi';

export interface PageProps {
  mdxSource: MDXRemoteSerializeResult;
  pageData: PageDataProps;
  favicons: FaviconsProps;
  subdomain?: string;
  internalAnalyticsWriteKey?: string;
}

export interface PageDataProps {
  navWithMetadata: Groups;
  pageMetadata: PageMetaTags;
  title: string;
  mintConfig: Config;
  openApiFiles?: OpenApiFile[];
}
