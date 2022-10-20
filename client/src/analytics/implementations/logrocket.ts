// TODO: Figure out how to dynamically import
import * as Sentry from '@sentry/nextjs';
import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';

import {
  AbstractAnalyticsImplementation,
  ConfigInterface,
} from '@/analytics/AbstractAnalyticsImplementation';

export default class LogrocketAnalytics extends AbstractAnalyticsImplementation {
  initialized = false;
  trackEvent: any;

  init(implementationConfig: ConfigInterface) {
    if (implementationConfig.appId) {
      try {
        if (!this.initialized && implementationConfig.appId) {
          LogRocket.init(implementationConfig.appId);
          this.trackEvent = LogRocket.track;
          this.initialized = true;

          setupLogRocketReact(LogRocket);
        }
      } catch (e) {
        Sentry.captureException(e);
      }
    }
  }

  createEventListener(eventName: string) {
    if (this.initialized) {
      const trackEvent = this.trackEvent;
      return async function capture(eventProperties: object) {
        trackEvent(eventName, eventProperties);
      };
    }
    return async function doNothing(_: object) {};
  }
}
