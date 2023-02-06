/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import { MDXRemote } from 'next-mdx-remote';
import Head from 'next/head';
import Router from 'next/router';
import Script from 'next/script';
import { useState, useEffect } from 'react';

import AnalyticsContext from '@/analytics/AnalyticsContext';
import GA4Script from '@/analytics/GA4Script';
import GTMScript from '@/analytics/GTMScript';
import KoalaScript from '@/analytics/KoalaScript';
import PlausibleScript from '@/analytics/PlausibleScript';
import { useAnalytics } from '@/analytics/useAnalytics';
import components from '@/components';
import { ConfigContext } from '@/context/ConfigContext';
import { VersionContextController } from '@/context/VersionContext';
import { useColors } from '@/hooks/useColors';
import { useCurrentPath } from '@/hooks/useCurrentPath';
import useProgressBar from '@/hooks/useProgressBar';
import Intercom from '@/integrations/Intercom';
import { DocumentationLayout } from '@/layouts/DocumentationLayout';
import { PageProps } from '@/types/page';
import { ColorVariables } from '@/ui/ColorVariables';
import { FeedbackProvider } from '@/ui/Feedback';
import { SearchProvider } from '@/ui/search/Search';
import { getAllMetaTags } from '@/utils/getAllMetaTags';
import { getAnalyticsConfig } from '@/utils/getAnalyticsConfig';
import { getOGImageEndpoint } from '@/utils/getOGImageEndpoint';

// First Layout used by every page inside [[..slug]]
export default function SupremePageLayout({
  mdxSource,
  pageData,
  favicons,
  subdomain,
  internalAnalyticsWriteKey,
}: PageProps) {
  const { mintConfig, navWithMetadata, pageMetadata, openApiFiles } = pageData;

  const [navIsOpen, setNavIsOpen] = useState(false);
  const [origin, setOrigin] = useState('');
  const analyticsConfig = getAnalyticsConfig(mintConfig);
  const analyticsMediator = useAnalytics(analyticsConfig, subdomain, internalAnalyticsWriteKey);
  useProgressBar(mintConfig?.colors?.primary);

  useEffect(() => {
    if (!navIsOpen) return;
    function handleRouteChange() {
      setNavIsOpen(false);
    }
    Router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [navIsOpen]);

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const metaTagsDict = getAllMetaTags(
    pageMetadata,
    mintConfig,
    getOGImageEndpoint(origin, pageMetadata, mintConfig)
  );
  const currentUrl = origin + useCurrentPath();

  return (
    <Intercom appId={mintConfig.integrations?.intercom} autoBoot>
      <VersionContextController versionOptions={mintConfig?.versions}>
        <ConfigContext.Provider
          value={{ mintConfig, navWithMetadata, openApiFiles: openApiFiles ?? [], subdomain }}
        >
          <AnalyticsContext.Provider value={analyticsMediator}>
            <ColorVariables />
            <Head>
              {favicons?.icons?.map((favicon) => (
                <link
                  rel={favicon.rel}
                  type={favicon.type}
                  sizes={favicon.sizes}
                  href={favicon.href}
                  key={favicon.href}
                />
              ))}
              <meta name="msapplication-config" content={favicons?.browserconfig} />
              <meta name="apple-mobile-web-app-title" content={mintConfig.name} />
              <meta name="application-name" content={mintConfig.name} />
              <meta name="theme-color" content="#ffffff" />
              <meta name="msapplication-TileColor" content={mintConfig?.colors?.primary} />
              <meta name="theme-color" content="#ffffff" />
              {Object.entries(metaTagsDict).map(([key, value]) => (
                <meta key={key} name={key} content={value} />
              ))}
              <title>{metaTagsDict['og:title']}</title>
              <meta key="og:url" name="og:url" content={currentUrl} />
              <link rel="canonical" href={currentUrl} />
            </Head>
            <Script
              id="dark-mode-toggle"
              strategy="beforeInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                try {
                  if (localStorage.isDarkMode === 'true' || (${(
                    mintConfig.modeToggle?.default == null
                  ).toString()} && !('isDarkMode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches) || ${(
                  mintConfig.modeToggle?.default === 'dark'
                ).toString()}) {
                    document.documentElement.classList.add('dark')
                  } else {
                    document.documentElement.classList.remove('dark')
                  }
                } catch (_) {}
              `,
              }}
            />
            <GA4Script ga4={analyticsConfig.ga4} />
            <GTMScript gtm={analyticsConfig.gtm} />
            <KoalaScript koala={analyticsConfig.koala} />
            <PlausibleScript plausible={analyticsConfig.plausible} />
            <FeedbackProvider subdomain={subdomain}>
              <SearchProvider subdomain={subdomain}>
                <div className="relative antialiased text-slate-500 dark:text-slate-400">
                  <span className="fixed inset-0 bg-background-light dark:bg-background-dark" />
                  <span
                    className="z-0 fixed inset-0"
                    {...(mintConfig.backgroundImage && {
                      style: {
                        backgroundImage: `url('${mintConfig.backgroundImage}')`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'top right',
                        backgroundAttachment: 'fixed',
                      },
                    })}
                  />
                  <DocumentationLayout
                    navWithMetadata={navWithMetadata}
                    navIsOpen={navIsOpen}
                    setNavIsOpen={setNavIsOpen}
                    pageMetadata={pageMetadata}
                  >
                    <MDXRemote components={components} {...(mdxSource as any)} />
                  </DocumentationLayout>
                </div>
              </SearchProvider>
            </FeedbackProvider>
          </AnalyticsContext.Provider>
        </ConfigContext.Provider>
      </VersionContextController>
    </Intercom>
  );
}
