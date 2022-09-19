import Card from '@/components/Card'
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  Image,
  Grid,
  GridItem,
  Spinner,
  Center,
} from '@chakra-ui/react'
import { useNFTCollection, useNFTs } from '@thirdweb-dev/react'
import type { NextPage } from 'next'
import Link from 'next/link'
import Layout from '../components/Layout'

const Home: NextPage = () => {
  const nftCollection = useNFTCollection(
    // Replace this with your NFT Collection contract address
    process.env.NEXT_PUBLIC_NFT_COLLECTION_ADDRESS
  )
  const { data: nfts, isLoading: loadingNfts } = useNFTs(nftCollection)

  return (
    <Layout>
      <Container maxW="6xl">
        <Stack
          align="center"
          spacing={{ base: 8, md: 10 }}
          py={{ base: 10, md: 20 }}
          direction={{ base: 'column', md: 'row' }}
        >
          <Stack flex={1} spacing={{ base: 5, md: 10 }}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
            >
              <Text
                as="span"
                position="relative"
                _after={{
                  content: "''",
                  width: 'full',
                  height: '30%',
                  position: 'absolute',
                  bottom: 1,
                  left: 0,
                  bg: 'teal.500',
                  zIndex: -1,
                }}
              >
                Mint, Collections
              </Text>
              <br />
              <Text as="span" color="teal.500">
                to get Rewards
              </Text>
            </Heading>
            <Text color="gray.500">
              NFT is powered by BSC and we highly focus on creating a
              marketplace with faster, easier, and low-priced gas fees.
            </Text>
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={{ base: 'column', sm: 'row' }}
            >
              <Link href={'/mint'}>
                <Button
                  rounded="full"
                  size="lg"
                  fontWeight="normal"
                  px={6}
                  colorScheme="teal"
                >
                  Create
                </Button>
              </Link>
            </Stack>
          </Stack>
          <Flex
            flex={1}
            justify="center"
            align="center"
            position="relative"
            w="full"
          >
            <Box width="full">
              <Image
                alt="Hero Image"
                fit="cover"
                align="center"
                w="100%"
                h="100%"
                src="/women-with-vr.png"
              />
            </Box>
          </Flex>
        </Stack>

        <Stack mb={10}>
          <Text fontSize="4xl" align="center">
            Minted NFTs in this collection
          </Text>
          {loadingNfts ? (
            <Center>
              <Spinner color="teal" size="xl" />
            </Center>
          ) : (
            <>
              <Grid
                templateColumns={{
                  base: 'repeat(1, 1fr)',
                  md: 'repeat(3, 1fr)',
                }}
                gap={6}
              >
                {nfts.map((nft, index) => (
                  <GridItem key={index}>
                    <Card nft={nft} />
                  </GridItem>
                ))}
              </Grid>
            </>
          )}
        </Stack>
      </Container>
    </Layout>
  )
}

export default Home
