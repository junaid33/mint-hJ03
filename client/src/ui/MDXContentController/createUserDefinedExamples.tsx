import { CodeBlock } from '@/components/CodeBlock';
import { CodeGroup } from '@/components/CodeGroup';
import { Component } from '@/enums/components';
import { ApiComponent } from '@/types/apiComponent';
import { htmlToReactComponent } from '@/utils/htmlToReactComponent';

// The RequestExample and ResponseExample classes are hidden on large screens, so we need to re-assemble them here.
export function createUserDefinedExamples(apiComponents: ApiComponent[]) {
  const requestComponentSkeleton = apiComponents.find((apiComponent) => {
    return apiComponent.type === Component.RequestExample;
  });

  const responseComponentSkeleton = apiComponents.find((apiComponent) => {
    return apiComponent.type === Component.ResponseExample;
  });

  const output = {} as any;

  // Create Request Example
  if (requestComponentSkeleton) {
    output.requestExample = (
      <CodeGroup isSmallText>
        {requestComponentSkeleton.children.map((child, i) => {
          return (
            <CodeBlock filename={child.filename} key={child.filename + i}>
              {htmlToReactComponent(child.html)}
            </CodeBlock>
          );
        })}
      </CodeGroup>
    );
  }

  // Create ResponseExample
  if (responseComponentSkeleton) {
    output.responseExample = (
      <CodeGroup isSmallText>
        {responseComponentSkeleton.children.map((child, i) => {
          return (
            <CodeBlock filename={child.filename} key={child.filename + i}>
              {htmlToReactComponent(child.html)}
            </CodeBlock>
          );
        })}
      </CodeGroup>
    );
  }

  return output;
}
