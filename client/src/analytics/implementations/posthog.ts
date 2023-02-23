import Router from 'next/router';
import posthog from 'posthog-js';

import {
  AbstractAnalyticsImplementation,
  ConfigInterface,
} from '@/analytics/AbstractAnalyticsImplementation';

export default class PostHogAnalytics extends AbstractAnalyticsImplementation {
  initialized = false;
  subdomain?: string; // used for internal analytics

  init(implementationConfig: ConfigInterface, subdomain?: string) {
    if (!implementationConfig.apiKey || process.env.NODE_ENV !== 'production') {
      return;
    }

    this.initialized = true;
    // apiHost only has to be passed in if the user is self-hosting PostHog
    posthog.init(implementationConfig.apiKey, {
      api_host: implementationConfig.apiHost || 'https://app.posthog.com',
      loaded: (posthogInstance) => {
        if (process.env.NODE_ENV !== 'production') posthogInstance.opt_out_capturing();
      },
    });

    this.subdomain = subdomain;

    // Track page views
    const handleRouteChange = () => posthog.capture('$pageview', { subdomain: this.subdomain });
    Router.events.on('routeChangeComplete', handleRouteChange);
  }

  createEventListener(eventName: string) {
    if (this.initialized) {
      const subdomain = this?.subdomain;
      return async function capture(eventProperties: object) {
        posthog.capture(eventName, {
          ...eventProperties,
          subdomain,
        });
      };
    }
    return async function doNothing(_: object) {
      return;
    };
  }
}
