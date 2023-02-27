import { useContext } from 'react';

import GA4Script from '@/analytics/scripts/GA4Script';
import GTMScript from '@/analytics/scripts/GTMScript';
import KoalaScript from '@/analytics/scripts/KoalaScript';
import PlausibleScript from '@/analytics/scripts/PlausibleScript';
import { ConfigContext } from '@/context/ConfigContext';
import { getAnalyticsConfig } from '@/utils/getAnalyticsConfig';

const AnalyticsScripts = () => {
  const { mintConfig } = useContext(ConfigContext);
  let analyticsConfig: AnalyticsMediatorConstructorInterface = {};
  if (mintConfig) {
    analyticsConfig = getAnalyticsConfig(mintConfig);
  }
  if (process.env.NODE_ENV !== 'production') return null;
  return (
    <>
      <GA4Script ga4={analyticsConfig.ga4} />
      <GTMScript gtm={analyticsConfig.gtm} />
      <KoalaScript koala={analyticsConfig.koala} />
      <PlausibleScript plausible={analyticsConfig.plausible} />
    </>
  );
};

export default AnalyticsScripts;
