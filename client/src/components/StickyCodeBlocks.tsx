import { ReactNode } from 'react';

import { CodeGroup } from './CodeGroup';

export function RequestExample({ children }: { children: ReactNode }) {
  return (
    <div className="block xl:hidden mt-8">
      <CodeGroup isSmallText>{children}</CodeGroup>
    </div>
  );
}

export function ResponseExample({ children }: { children: ReactNode }) {
  return (
    <div className="block xl:hidden mt-8">
      <CodeGroup isSmallText>{children}</CodeGroup>
    </div>
  );
}
