import Router from 'next/router';
import posthog from 'posthog-js';

import PostHogAnalytics from '../services/posthog';

export default class InternalAnalytics extends PostHogAnalytics {
  initialized = false;
  subdomain: string;

  constructor(subdomain: string) {
    super();
    this.subdomain = subdomain;
  }

  trackPageViews() {
    const handleRouteChange = () => posthog.capture('$pageview', { subdomain: this.subdomain });
    Router.events.on('routeChangeComplete', handleRouteChange);
  }

  captureEvent(eventName: string) {
    return async (eventProperties: object) => {
      posthog.capture(eventName, {
        ...eventProperties,
        subdomain: this.subdomain,
      });
    };
  }
}
