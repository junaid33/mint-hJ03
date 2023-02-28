import { StaticContent, StaticContentProps } from './StaticContent';

export const StaticCode = (props: StaticContentProps<'code'>) => (
  <StaticContent as={'code'} {...props} />
);
