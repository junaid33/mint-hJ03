import { PostHogConfigInterface } from '../AbstractAnalyticsImplementation';
import PostHogAnalytics from '../implementations/posthog';

export default class InternalAnalytics extends PostHogAnalytics {
  init(implementationConfig: PostHogConfigInterface, subdomain: string) {
    super.init(implementationConfig, subdomain);
  }
}
