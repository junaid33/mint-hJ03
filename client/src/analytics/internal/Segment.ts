import { AnalyticsBrowser } from '@segment/analytics-next';

const SEGMENT_WRITE_KEY = 'PqRXFGXckkpLI3dphj6IwgEGcrjSg83H';

const analytics = AnalyticsBrowser.load({ writeKey: SEGMENT_WRITE_KEY });

export const segmentTrack = (subdomain: string, eventName: string, properties?: object) => {
  const propertiesWithSubdomain = {
    ...properties,
    subdomain,
  };
  analytics.track(eventName, propertiesWithSubdomain);
};

export const segmentPage = (
  subdomain: string,
  category?: string,
  name?: string,
  properties?: object
) => {
  const propertiesWithSubdomain = {
    ...properties,
    subdomain,
  };
  analytics.page(category, name, propertiesWithSubdomain);
};
