import { isBetaEnv, isProdEnv } from '@universe/environment'
import { getConfig } from '~/config'

function isAppUniswapOrg({ hostname }: { hostname: string }): boolean {
  return hostname === 'app.uniswap.org'
}

function isAppUniswapStagingOrg({ hostname }: { hostname: string }): boolean {
  return hostname === 'staging.app.uniswap.org'
}

export function isBrowserRouterEnabled(): boolean {
  // Vercel serves deep links through the SPA function, including on fork/custom domains.
  // Keep hash routing for IPFS builds, which do not provide those rewrites.
  if (getConfig().webBuildType === 'vercel') {
    return true
  }
  if (isProdEnv()) {
    if (
      isAppUniswapOrg(window.location) ||
      isAppUniswapStagingOrg(window.location) ||
      isLocalhost(window.location) // playwright tests
    ) {
      return true
    }
    return false // production builds *not* served through our domains or localhost, eg IPFS
  }
  return true // local dev builds
}

function isLocalhost({ hostname }: { hostname: string }): boolean {
  return hostname === 'localhost'
}

export function isRemoteReportingEnabled(): boolean {
  // Disable in e2e test environments
  if (isBetaEnv() && !isAppUniswapStagingOrg(window.location)) {
    return false
  }
  if (isProdEnv() && !isAppUniswapOrg(window.location)) {
    return false
  }
  return getConfig().analyticsEnabled
}
