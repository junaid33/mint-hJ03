import {
  CardGroup,
  Info,
  Warning,
  Note,
  Tip,
  Check,
  Tabs,
  Tab,
  Tooltip,
  Frame,
} from '@mintlify/components';
import { ApiPlayground } from '@mintlify/components';
import Link from 'next/link';

import { Accordion, AccordionGroup } from '@/components/Accordion';
import { Card } from '@/components/Card';
import { CodeBlock } from '@/components/CodeBlock';
import { CodeGroup, SnippetGroup } from '@/components/CodeGroup';
import { Expandable } from '@/components/Expandable';
import { Heading } from '@/components/Heading';
import { Param, ParamField } from '@/components/Param';
import { ResponseField } from '@/components/ResponseField';
import { RequestExample, ResponseExample } from '@/components/StickyCodeBlocks';
import { MDXContentController } from '@/ui/MDXContentController/MDXContentController';

const components: any = {
  ApiPlayground,
  Accordion,
  AccordionGroup,
  Heading,
  Card,
  CardGroup,
  Check,
  CodeGroup,
  CodeBlock,
  Expandable,
  Frame,
  Info,
  Link,
  MDXContentController,
  Note,
  Param,
  ParamField,
  RequestExample,
  ResponseExample,
  ResponseField,
  Tab,
  Tabs,
  Tip,
  Tooltip,
  SnippetGroup,
  Warning,
};

export const allowedComponents = [
  'ApiPlayground',
  'Accordion',
  'AccordionGroup',
  'CodeGroup',
  'CodeBlock',
  'SnippetGroup',
  'RequestExample',
  'ResponseExample',
  'Param',
  'ParamField',
  'Card',
  'CardGroup',
  'Expandable',
  'Frame',
  'Heading',
  'Info',
  'Link',
  'MDXContentController',
  'ResponseField',
  'Warning',
  'Note',
  'Tip',
  'Check',
  'Tabs',
  'Tab',
  'Tooltip',
  'img',
  'iframe',
  'video',
  'h1',
  'h2',
  'h3',
  'h4',
  'div',
  'span',
  'section',
  'source',
  'sup',
  'sub',
  'p',
  'b',
  'a',
  'li',
  'br',
  'ol',
  'ul',
  'head',
  'script',
  'link',
  'svg',
  'path',
  'button',
  // Custom tags
  'zapier-zap-templates',
];

export default components;
