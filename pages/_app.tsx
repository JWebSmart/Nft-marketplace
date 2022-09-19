import type { AppProps } from 'next/app'
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react'
import { ChakraProvider } from '@chakra-ui/react'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider desiredChainId={ChainId.Mumbai}>
      <ChakraProvider resetCSS>
        <Component {...pageProps} />
      </ChakraProvider>
    </ThirdwebProvider>
  )
}

export default MyApp
