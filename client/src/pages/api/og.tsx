import { ImageResponse } from '@vercel/og';
import clsx from 'clsx';
import { NextRequest } from 'next/server';

import { truncateThumbnailDescription } from '@/utils/getOGImageEndpoint';

export const config = {
  runtime: 'experimental-edge', // Can likely switch to "edge" in Next 14
};

const interFontBoldImport = fetch(new URL('../../../assets/Inter-Bold.ttf', import.meta.url)).then(
  (res) => res.arrayBuffer()
);
const interFontMediumImport = fetch(
  new URL('../../../assets/Inter-Medium.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler(req: NextRequest) {
  try {
    const [interFontMedium, interFontBold] = await Promise.all([
      interFontMediumImport,
      interFontBoldImport,
    ]);
    const { searchParams } = new URL(req.url);

    const title = searchParams.get('title');
    const description = searchParams.get('description');
    const rightGradientColor = searchParams.get('leftGradientColor');
    const leftGradientColor = searchParams.get('rightGradientColor');
    const isDark = searchParams.get('isDark');
    const logo = searchParams.get('logo');
    const backgroundColor = searchParams.get('backgroundColor');

    if (!backgroundColor) {
      throw 'No background color provided';
    }

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor,
            fontFamily: 'Inter var',
          }}
        >
          <div tw="relative flex flex-col w-full px-26 pt-26 pb-28 h-full">
            <svg
              width="862"
              height="450"
              viewBox="0 0 862 450"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                position: 'absolute',
                bottom: '3rem',
                left: '6.5rem',
                width: '68rem',
                height: '35rem',
              }}
            >
              <g clip-path="url(#clip0_1542_215)">
                <rect width="862" height="450" fill="url(#paint0_radial_1542_215)" />
                <path
                  d="M0 112.5H862M0 225H862M0 337.5H862M107.75 0V450M215.5 0V450M323.25 0V450M431 0V450M538.75 0V450M646.5 0V450M754.25 0V450M0 0H862V450H0V0Z"
                  stroke={isDark ? '#41444B' : '#DDDFE1'}
                />
                <rect width="862" height="450" fill="url(#paint1_radial_1542_215)" />
              </g>
              <defs>
                <radialGradient
                  id="paint0_radial_1542_215"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(431 225) rotate(90) scale(225 431)"
                >
                  <stop offset="1" stop-color={backgroundColor} stop-opacity="0" />
                </radialGradient>
                <radialGradient
                  id="paint1_radial_1542_215"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(431 225) rotate(90) scale(203 388.858)"
                >
                  <stop stop-color={backgroundColor} stop-opacity="0" />
                  <stop offset="1" stop-color={backgroundColor} />
                </radialGradient>
                <clipPath id="clip0_1542_215">
                  <rect width="862" height="450" fill={backgroundColor} />
                </clipPath>
              </defs>
            </svg>

            <div tw="flex flex-1">{logo && <img tw="h-10" src={logo} alt="Logo" />}</div>
            <div tw="flex flex-col tracking-tight text-base text-left">
              <span
                tw="w-24 h-1"
                style={{
                  backgroundImage: `linear-gradient(to right, ${leftGradientColor}, ${rightGradientColor})`,
                }}
              ></span>
              <span
                tw={clsx('mt-14 text-7xl font-bold', isDark ? 'text-slate-100' : 'text-slate-800')}
              >
                {title}
              </span>
              <span
                tw={clsx(
                  'mt-8 text-4xl font-medium leading-normal',
                  isDark ? 'text-slate-400' : 'text-slate-500'
                )}
              >
                {truncateThumbnailDescription(description)}
              </span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        headers: {
          'Cache-Control': 's-maxage=300',
        },
        fonts: [
          {
            name: 'Inter',
            data: interFontBold,
            style: 'normal',
            weight: 700,
          },
          {
            name: 'Inter',
            data: interFontMedium,
            style: 'normal',
            weight: 500,
          },
        ],
      }
    );
  } catch (e) {
    console.error(e);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
