import { getHostingLocation } from '@/data-fetching/getHostingLocation';

const successHeaders = {
  'Cache-control': 'public, s-maxage=31536000, stale-while-revalidate',
};

async function generateRobotsTxt(subdomain: string) {
  if (!process.env.IS_MULTI_TENANT || process.env.IS_MULTI_TENANT === 'false') {
    return new Response('', {
      status: 404,
      headers: successHeaders,
    });
  }

  const hostingLocation = await getHostingLocation(subdomain);

  // TO DO: Populate the robots.txt with hidden pages
  const body = `User-agent: *
Sitemap: ${hostingLocation}/sitemap.xml`;
  return new Response(body, {
    status: 200,
    headers: successHeaders,
  });
}

export async function GET(request: Request, context: { params: { subdomain: string } }) {
  return await generateRobotsTxt(context.params.subdomain);
}

export function HEAD() {
  // Based off of https://google.com/robots.txt which returns 200, no body, and headers when you make a HEAD request
  return new Response('', {
    status: 200,
    headers: successHeaders,
  });
}
