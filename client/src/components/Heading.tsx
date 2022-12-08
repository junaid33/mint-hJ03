import clsx from 'clsx';
import { useEffect, useContext, useState } from 'react';
import { Rect, useRect } from 'react-use-rect';

import { useTop } from '@/hooks/useTop';
import { ContentsContext } from '@/ui/MDXContentController/MDXContentController';

type HeadingProps = {
  level: string;
  id: string;
  children: any;
  className?: string;
  hidden?: boolean;
  ignore?: boolean;
  style?: Object;
  nextElementDepth?: number | string;
};

export function Heading({
  level,
  id,
  children,
  className = '',
  hidden = false,
  ignore = false,
  style = {},
  nextElementDepth = -1,
  ...props
}: HeadingProps | any) {
  let Component = `h${level}`;
  const context: any = useContext(ContentsContext);
  const [rect, setRect] = useState<Rect | null>(null);
  const [rectRef] = useRect(setRect);
  let top = useTop(rect);

  // We cannot include context in the dependency array because it changes every render.
  const hasContext = Boolean(context);
  const registerHeading = context?.registerHeading;
  const unregisterHeading = context?.unregisterHeading;
  useEffect(() => {
    if (!hasContext) return;
    if (typeof top !== 'undefined') {
      registerHeading(id, top);
    }
    return () => {
      unregisterHeading(id);
    };
  }, [top, id, registerHeading, unregisterHeading, hasContext]);
  return (
    <Component
      className={clsx('group flex whitespace-pre-wrap', className, {
        '-ml-4 pl-4': !hidden,
        'text-2xl sm:text-3xl': level === '1',
        'mb-2 text-sm leading-6 text-primary font-semibold tracking-normal dark:!text-primary-light':
          level === '2' && nextElementDepth > level,
      })}
      id={id}
      ref={rectRef}
      style={{ ...(hidden ? { marginBottom: 0 } : {}), ...style }}
      {...props}
    >
      <span className={hidden ? 'sr-only' : undefined}>{children}</span>
      {!hidden && (
        <a
          href={`#${id}`}
          className="ml-2 flex items-center opacity-0 border-0 group-hover:opacity-100"
          aria-label="Direct link to heading"
        >
          &#8203;
          <div className="fill-slate-500 hover:fill-slate-700 dark:fill-slate-300 dark:hover:fill-slate-100 w-6 h-6 ring-1 ring-slate-900/5 rounded-md shadow-sm flex items-center justify-center hover:ring-slate-900/10 hover:shadow dark:bg-slate-700 dark:shadow-none dark:ring-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 484 512"
              width="12"
              height="12"
              aria-hidden="true"
            >
              <path d="M181.3 32.4c17.4 2.9 29.2 19.4 26.3 36.8L197.8 128h95.1l11.5-69.3c2.9-17.4 19.4-29.2 36.8-26.3s29.2 19.4 26.3 36.8L357.8 128H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H347.1L325.8 320H384c17.7 0 32 14.3 32 32s-14.3 32-32 32H315.1l-11.5 69.3c-2.9 17.4-19.4 29.2-36.8 26.3s-29.2-19.4-26.3-36.8l9.8-58.7H155.1l-11.5 69.3c-2.9 17.4-19.4 29.2-36.8 26.3s-29.2-19.4-26.3-36.8L90.2 384H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h68.9l21.3-128H64c-17.7 0-32-14.3-32-32s14.3-32 32-32h68.9l11.5-69.3c2.9-17.4 19.4-29.2 36.8-26.3zM187.1 192L165.8 320h95.1l21.3-128H187.1z" />
            </svg>
          </div>
        </a>
      )}
    </Component>
  );
}
