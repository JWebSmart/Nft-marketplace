import { Flex, Box, Image, Text } from '@chakra-ui/react'

export default function Card({ nft }) {
  return (
    <Flex p={4} w="full" alignItems="center" justifyContent="center">
      <Box
        bg={'white'}
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
      >
        <Image
          src={nft.metadata.image}
          alt={`Picture of ${nft.metadata.name}`}
          roundedTop="lg"
          width={'250px'}
          height={'250px'}
          objectFit="contain"
        />

        <Box p="6">
          <Text fontSize="2xl" fontWeight="semibold" as="h4" lineHeight="tight">
            {nft.metadata.name}
          </Text>
          <Text fontSize="md" as="p" lineHeight="tight">
            {nft.metadata.description}
          </Text>

          <Flex justifyContent="space-between" alignContent="center">
            <Box fontSize="2xl" color={'gray.800'}>
              {nft.metadata.price}
              <Box as="span" color={'gray.600'} fontSize="md" ml={1}>
                MATIC
              </Box>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Flex>
  )
}
