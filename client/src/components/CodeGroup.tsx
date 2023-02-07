import {
  CodeGroup as GenericCodeGroup,
  CodeBlockProps,
  CodeGroupProps,
} from '@mintlify/components';
import { ReactElement } from 'react';

import { useColors } from '@/hooks/useColors';

export function CodeGroup({
  children,
  isSmallText,
}: {
  children?: ReactElement<CodeBlockProps>[] | ReactElement<CodeBlockProps>;
  isSmallText?: boolean;
}) {
  const colors = useColors();
  return (
    <GenericCodeGroup
      selectedColor={colors.primaryLight}
      tooltipColor={colors.primaryDark}
      copiedTooltipColor={colors.primaryDark}
      isSmallText={isSmallText}
    >
      {children}
    </GenericCodeGroup>
  );
}

// Deprecated. Do not use SnippetGroup.
export function SnippetGroup(props: CodeGroupProps) {
  return <CodeGroup {...props} />;
}
