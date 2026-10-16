import { afterEach, describe, expect, it, vi } from 'vitest'
import { isBrowserRouterEnabled } from '~/utils/env'

const state = vi.hoisted(() => ({ production: true, buildType: 'vercel' }))

vi.mock('@universe/environment', () => ({
  isProdEnv: () => state.production,
  isBetaEnv: () => false,
}))
vi.mock('~/config', () => ({ getConfig: () => ({ webBuildType: state.buildType }) }))

afterEach(() => vi.unstubAllGlobals())

describe('isBrowserRouterEnabled', () => {
  it.each([
    { hostname: 'my-swap-interface.vercel.app', buildType: 'vercel', production: true, expected: true },
    { hostname: 'my-custom-swap.example', buildType: 'vercel', production: true, expected: true },
    { hostname: 'gateway.example', buildType: 'ipfs', production: true, expected: false },
    { hostname: 'other.example', buildType: 'local', production: true, expected: false },
    { hostname: 'app.uniswap.org', buildType: 'workers', production: true, expected: true },
    { hostname: 'localhost', buildType: 'local', production: true, expected: true },
    { hostname: 'other.example', buildType: 'local', production: false, expected: true },
  ])('uses browser routing=$expected for $buildType on $hostname (production=$production)', (testCase) => {
    state.production = testCase.production
    state.buildType = testCase.buildType
    vi.stubGlobal('window', { location: { hostname: testCase.hostname } })

    expect(isBrowserRouterEnabled()).toBe(testCase.expected)
  })
})
