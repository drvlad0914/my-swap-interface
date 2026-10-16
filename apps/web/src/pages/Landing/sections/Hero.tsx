import { Flex, Text } from '@universe/mycelium'
import { ENTER_PRESET_CLASSES } from '@universe/mycelium/compat'
import { RotatableChevron } from '@universe/mycelium/icons/RotatableChevron'
import { useMedia, useSporeColors } from '@universe/mycelium/theme-hooks-compat'
import { useCallback } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { INTERFACE_NAV_HEIGHT } from 'ui/src/theme'
import { useEnabledChains } from 'uniswap/src/features/chains/hooks/useEnabledChains'
import { SwapRedirectFn } from 'uniswap/src/features/transactions/components/TransactionModal/TransactionModalContext'
import { useCurrency } from '~/hooks/Tokens'
import { Hover, RiseIn } from '~/pages/Landing/components/animations'
import { TokenCloud } from '~/pages/Landing/components/TokenCloud'
import { useScrollParallax } from '~/pages/Landing/sections/useScrollParallax'
import { Swap } from '~/pages/Swap'
import { FrogSwapScene } from '~/pages/Swap/FrogSwapScene'
import { serializeSwapStateToURLParameters } from '~/pages/Swap/Swap/state/tradeQueryParams'

interface HeroProps {
  scrollToRef: () => void
  transition?: boolean
}

export function Hero({ scrollToRef, transition }: HeroProps) {
  const media = useMedia()
  const colors = useSporeColors()
  const { defaultChainId, chains } = useEnabledChains()
  const { outerRef, innerRef, chevronRef } = useScrollParallax(!media.sm)
  const initialInputCurrency = useCurrency({
    address: 'ETH',
    chainId: defaultChainId,
  })
  const navigate = useNavigate()
  const { t } = useTranslation()

  const swapRedirectCallback = useCallback(
    ({ inputCurrency, outputCurrency, typedValue, independentField, chainId }: Parameters<SwapRedirectFn>[0]) => {
      navigate(
        `/swap${serializeSwapStateToURLParameters({
          inputCurrency,
          outputCurrency,
          typedValue,
          independentField,
          chainId,
        })}`,
      )
    },
    [navigate],
  )

  return (
    <Flex
      ref={outerRef}
      position="relative"
      justifyContent="center"
      width="100%"
      minWidth="100%"
      className="pond-landing-hero min-h-screen supports-[height:100svh]:min-h-svh"
      height="min-content"
      pt={INTERFACE_NAV_HEIGHT}
      pointerEvents="none"
    >
      {!media.sm && <TokenCloud />}

      <Flex
        ref={innerRef}
        alignSelf="center"
        width="100%"
        maxWidth="100%"
        alignItems="center"
        pointerEvents="none"
        pt={48}
        gap="$gap20"
        $lg={{ pt: 24 }}
        $sm={{ pt: 8 }}
        $platform-web={{
          transition: transition ? 'shrinkAndFade 1s ease-in-out forwards' : undefined,
        }}
      >
        <FrogSwapScene>
          <RiseIn delay={0.4}>
            <Flex
              pointerEvents="auto"
              width={480}
              p="$padding8"
              borderRadius="$rounded24"
              backgroundColor="$surface1"
              maxWidth="100%"
              className={ENTER_PRESET_CLASSES.fadeIn}
            >
              <Swap
                hideHeader
                hideFooter
                syncTabToUrl={false}
                initialInputChainId={defaultChainId}
                initialInputCurrency={initialInputCurrency}
                swapRedirectCallback={swapRedirectCallback}
              />
            </Flex>
          </RiseIn>
        </FrogSwapScene>

        <RiseIn delay={0.3}>
          <Text variant="body1" textAlign="center" maxWidth={430} color="$neutral2" $short={{ variant: 'body2' }}>
            <Trans
              i18nKey="hero.subtitle"
              values={{ amount: chains.length }}
              components={{ highlight: <Text variant="body1" $short={{ variant: 'body2' }} color="$accent1" /> }}
            />
          </Text>
        </RiseIn>
      </Flex>

      <Flex flex={1} />

      <Flex
        ref={chevronRef}
        position="absolute"
        width="100%"
        centered
        pointerEvents="none"
        bottom={48}
        style={{ transition: 'opacity 0.3s ease-out' }}
        $lgHeight={{ display: 'none' }}
      >
        <RiseIn delay={2}>
          <Flex
            alignItems="center"
            justifyContent="flex-start"
            onPress={() => scrollToRef()}
            cursor="pointer"
            width={500}
            maxWidth="100%"
          >
            <Hover>
              <Flex width="100%" alignItems="center">
                <Text variant="body2">{t('hero.scroll')}</Text>
                <RotatableChevron direction="down" />
              </Flex>
            </Hover>
          </Flex>
        </RiseIn>
      </Flex>

      <Flex
        position="absolute"
        bottom={0}
        width="100%"
        height={200}
        pointerEvents="none"
        style={{
          background: `linear-gradient(to bottom, transparent 100%, ${colors.surface1.val} 100%)`,
        }}
      />
    </Flex>
  )
}
