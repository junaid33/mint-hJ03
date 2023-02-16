import { useEffect } from 'react';

import { MDXContentContextType } from '@/context/MDXContentContext';
import { MDXContentActionEnum } from '@/enums/MDXContentActionEnum';

/**
 * Gets `contentWidth` and `isWideSize` and dispatches state update.
 */
export const useContentWidth = (ctx: MDXContentContextType) => {
  const [state, dispatch] = ctx;
  const { pageMetadata, responseExample, requestExample, isApi } = state;
  useEffect(() => {
    // The user can hide the table of contents by marking the size as wide, but the API
    // overrides that to show request and response examples on the side.
    // TODO: Remove meta.size
    const isWideSize = pageMetadata.mode === 'wide' || pageMetadata.size === 'wide';
    let contentWidth = 'max-w-3xl xl:max-w-[49rem]';
    if (isApi || requestExample || responseExample) {
      contentWidth = 'max-w-3xl xl:max-w-[min(100% - 31rem, 44rem)]';
    } else if (isWideSize) {
      contentWidth = 'max-w-3xl';
    }
    dispatch({
      type: MDXContentActionEnum.SET_CONTENT_WIDTH,
      payload: {
        contentWidth,
        isWideSize,
      },
    });
  }, [dispatch, isApi, pageMetadata.mode, pageMetadata.size, requestExample, responseExample]);
  return [state, dispatch] as MDXContentContextType;
};
