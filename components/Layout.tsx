import { ReactElement } from 'react'
import { ConnectWallet } from '@thirdweb-dev/react'
import { Flex, Stack, Container, Box, Text, Center } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'

interface LayoutProps {
  children: ReactElement | ReactElement[]
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Container as={Box} maxW={'6xl'} px={'0'}>
      <Flex
        bg={'white'}
        color={'gray.600'}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={'gray.200'}
        align={'center'}
      >
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Link href={'/'}>
            <Center cursor="pointer">
              <Image
                src={'/logo.webp'}
                alt="Logo"
                width={'40px'}
                height={'40px'}
              />
              <Text fontSize={'2xl'}>Websmart NFT</Text>
            </Center>
          </Link>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}
        >
          <ConnectWallet />
        </Stack>
      </Flex>
      {children}
    </Container>
  )
}
