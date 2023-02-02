import { ReactElement } from 'react';

import { CodeGroup } from './CodeGroup';
import { CodeBlockProps } from "@mintlify/components";


export function RequestExample({ children }: { children?: ReactElement<CodeBlockProps>[] | ReactElement<CodeBlockProps> }) {
  return (
    <div className="block xl:hidden mt-8">
      <CodeGroup>{children}</CodeGroup>
    </div>
  );
}

export function ResponseExample({ children }: { children?: ReactElement<CodeBlockProps>[] | ReactElement<CodeBlockProps> }) {
  return (
    <div className="block xl:hidden mt-8">
      <CodeGroup>{children}</CodeGroup>
    </div>
  );
}
