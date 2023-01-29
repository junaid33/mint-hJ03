// Not dynamically importing because it's required
import { AnalyticsBrowser } from '@segment/analytics-next';

import {
  AbstractAnalyticsImplementation,
  ConfigInterface,
} from '@/analytics/AbstractAnalyticsImplementation';

export default class SegmentAnalytics extends AbstractAnalyticsImplementation {
  initialized = false;
  analytics: any;
  subdomain?: string; // Use for internal analytics from InternalAnalytics

  init(implementationConfig: ConfigInterface, subdomain?: string) {
    if (!implementationConfig?.writeKey || process.env.NODE_ENV !== 'production') {
      return;
    }

    if (!this.initialized && implementationConfig.writeKey) {
      this.analytics = AnalyticsBrowser.load({
        writeKey: implementationConfig.writeKey,
      });
      this.initialized = true;
      this.subdomain = subdomain;
    }
  }

  createEventListener(eventName: string) {
    if (this.initialized && this.analytics) {
      const subdomain = this.subdomain;
      const func = async function capture(this: SegmentAnalytics, eventProperties: object) {
        this.analytics.track(eventName, {
          ...eventProperties,
          subdomain,
        });
      };
      return func.bind(this);
    }
    return async function doNothing(_: object) {
      return;
    };
  }

  onRouteChange(url: string, routeProps: any) {
    if (this.initialized && this.analytics && !routeProps.shallow) {
      this.analytics.page(undefined, undefined, {
        ...routeProps,
        subdomain: this.subdomain,
      });
    }
  }
}
