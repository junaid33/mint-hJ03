import {
  AmplitudeConfigInterface,
  AbstractAnalyticsImplementation,
  AnalyticsMediatorInterface,
  FathomConfigInterface,
  GoogleAnalyticsConfigInterface,
  GoogleTagManagerConfigInterface,
  HotjarConfigInterface,
  KoalaConfigInterface,
  LogrocketConfigInterface,
  MixpanelConfigInterface,
  PostHogConfigInterface,
  PirschConfigInterface,
  PlausibleConfigInterface,
  SegmentConfigInterface,
} from '@/analytics/AbstractAnalyticsImplementation';
import PostHogAnalytics from '@/analytics/implementations/posthog';

import AmplitudeAnalytics from './implementations/amplitude';
import FathomAnalytics from './implementations/fathom';
import GA4Analytics from './implementations/ga4';
import HotjarAnalytics from './implementations/hotjar';
import LogrocketAnalytics from './implementations/logrocket';
import MixpanelAnalytics from './implementations/mixpanel';
import PirschAnalytics from './implementations/pirsch';
import SegmentAnalytics from './implementations/segment';
import InternalAnalytics from './internal';
import { RouteProps } from './useAnalytics';

export type AnalyticsMediatorConstructorInterface = {
  amplitude?: AmplitudeConfigInterface;
  fathom?: FathomConfigInterface;
  ga4?: GoogleAnalyticsConfigInterface;
  gtm?: GoogleTagManagerConfigInterface;
  hotjar?: HotjarConfigInterface;
  koala?: KoalaConfigInterface;
  logrocket?: LogrocketConfigInterface;
  mixpanel?: MixpanelConfigInterface;
  pirsch?: PirschConfigInterface;
  plausible?: PlausibleConfigInterface;
  posthog?: PostHogConfigInterface;
  segment?: SegmentConfigInterface;
};

export default class AnalyticsMediator implements AnalyticsMediatorInterface {
  subdomain: string;
  analyticsIntegrations: AbstractAnalyticsImplementation[] = [];

  constructor(
    subdomain: string,
    analytics?: AnalyticsMediatorConstructorInterface,
    internalAnalyticsWriteKey?: string
  ) {
    this.subdomain = subdomain;

    if (internalAnalyticsWriteKey) {
      const internalAnalytics = new InternalAnalytics();
      internalAnalytics.init({ apiKey: internalAnalyticsWriteKey }, subdomain);
      this.analyticsIntegrations.push(internalAnalytics);
    }

    const amplitudeEnabled = Boolean(analytics?.amplitude?.apiKey);
    const fathomEnabled = Boolean(analytics?.fathom?.siteId);
    const ga4Enabled = Boolean(analytics?.ga4?.measurementId);
    const hotjarEnabled = Boolean(analytics?.hotjar?.hjid && analytics?.hotjar?.hjsv);
    const logrocketEnabled = Boolean(analytics?.logrocket?.appId);
    const mixpanelEnabled = Boolean(analytics?.mixpanel?.projectToken);
    const pirschEnabled = Boolean(analytics?.pirsch?.id);
    const posthogEnabled = Boolean(analytics?.posthog?.apiKey);
    const segmentEnabled = Boolean(analytics?.segment?.writeKey);

    if (!analytics || Object.keys(analytics).length === 0) {
      return;
    }

    if (amplitudeEnabled && analytics.amplitude) {
      const amplitude = new AmplitudeAnalytics();
      amplitude.init(analytics.amplitude);
      this.analyticsIntegrations.push(amplitude);
    }

    if (fathomEnabled && analytics.fathom) {
      const fathom = new FathomAnalytics();
      fathom.init(analytics.fathom);
      this.analyticsIntegrations.push(fathom);
    }

    if (ga4Enabled && analytics.ga4) {
      const ga4 = new GA4Analytics();
      ga4.init(analytics.ga4);
      this.analyticsIntegrations.push(ga4);
    }

    if (hotjarEnabled && analytics.hotjar) {
      const hotjar = new HotjarAnalytics();
      hotjar.init(analytics.hotjar);
      this.analyticsIntegrations.push(hotjar);
    }

    if (logrocketEnabled && analytics.logrocket) {
      const logrocket = new LogrocketAnalytics();
      logrocket.init(analytics.logrocket);
      this.analyticsIntegrations.push(logrocket);
    }

    if (mixpanelEnabled && analytics.mixpanel) {
      const mixpanel = new MixpanelAnalytics();
      mixpanel.init(analytics.mixpanel);
      this.analyticsIntegrations.push(mixpanel);
    }

    if (pirschEnabled && analytics.pirsch) {
      const pirsch = new PirschAnalytics();
      pirsch.init(analytics.pirsch);
      this.analyticsIntegrations.push(pirsch);
    }

    if (posthogEnabled && analytics.posthog) {
      const posthog = new PostHogAnalytics();
      posthog.init(analytics.posthog);
      this.analyticsIntegrations.push(posthog);
    }

    if (segmentEnabled && analytics.segment) {
      const segment = new SegmentAnalytics();
      segment.init(analytics.segment);
      this.analyticsIntegrations.push(segment);
    }
  }

  createEventListener(eventName: string) {
    const listeners = this.analyticsIntegrations.map((integration) =>
      integration.createEventListener(eventName)
    );
    return async function (eventProperties: object) {
      listeners.forEach((track) => track(eventProperties));
    };
  }

  onRouteChange(url: string, routeProps: RouteProps) {
    this.analyticsIntegrations.forEach((integration) => integration.onRouteChange(url, routeProps));
  }
}
