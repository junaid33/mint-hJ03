import { CodeBlock as GenericCodeBlock } from '@mintlify/components';
import { ReactNode, useContext } from 'react';

import AnalyticsContext from '@/analytics/AnalyticsContext';
import { Event } from '@/enums/events';
import { useColors } from '@/hooks/useColors';

export function CodeBlock({ filename, children }: { filename?: string; children?: ReactNode }) {
  const analyticsMediator = useContext(AnalyticsContext);
  const colors = useColors();
  const trackCodeBlockCopy = analyticsMediator.createEventListener(Event.CodeBlockCopy);

  return (
    <GenericCodeBlock
      filename={filename}
      filenameColor={colors.primaryLight}
      tooltipColor={colors.primaryDark}
      onCopied={(_, textToCopy) => trackCodeBlockCopy({ code: textToCopy })}
    >
      {children}
    </GenericCodeBlock>
  );
}
