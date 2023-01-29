import { ConfigInterface } from '../AbstractAnalyticsImplementation';
import SegmentAnalytics from '../implementations/segment';

export default class InternalAnalytics extends SegmentAnalytics {
  init(implementationConfig: ConfigInterface, subdomain: string) {
    super.init(implementationConfig, subdomain);
  }
}
