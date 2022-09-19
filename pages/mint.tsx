import { useState } from 'react'
import {
  FormControl,
  FormLabel,
  Stack,
  Input,
  FormErrorMessage,
  Textarea,
  Container,
  HStack,
  Button,
  useToast,
} from '@chakra-ui/react'
import * as Yup from 'yup'
import { Field, Formik } from 'formik'
import type { NextPage } from 'next'
import Layout from '@/components/Layout'
import FileUploader from '@/components/FileUploader'
import { ThirdwebSDK } from '@thirdweb-dev/sdk'
import { useAddress, useNFTCollection, useSigner } from '@thirdweb-dev/react'

interface NFTProps {
  image: File
  name: string
  description: string
  quantity: number
  price: number
}

const Mint: NextPage = () => {
  const signer = useSigner()
  const address = useAddress()
  const nftCollection = useNFTCollection(
    // NFT Collection contract address
    process.env.NEXT_PUBLIC_NFT_COLLECTION_ADDRESS
  )

  const toast = useToast()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const initialValues: NFTProps = {
    image: null,
    name: '',
    description: '',
    quantity: 1,
    price: 0,
  }

  const validationSchema = Yup.object({
    image: Yup.string().nullable().required('Please select a valid image'),
    name: Yup.string().required('Please enter a valid name'),
    description: Yup.string().required('Please enter a valid description'),
    quantity: Yup.number().moreThan(0, 'Please enter a valid quantity'),
    price: Yup.number().moreThan(0, 'Please enter a valid price'),
  })

  const onMint = async (values: NFTProps) => {
    try {
      setIsLoading(true)

      const tw = new ThirdwebSDK(signer)
      const upload = await tw.storage.upload(values.image)
      const url = `${upload.uris[0]}`

      // Make a request to /api/server
      const signedPayloadReq = await fetch(`/api/server`, {
        method: 'POST',
        body: JSON.stringify({
          authorAddress: address, // Address of the current user
          name: values.name,
          description: values.description,
          price: values.price,
          quantity: values.quantity,
          imagePath: url,
        }),
      })

      // Grab the JSON from the response
      const json = await signedPayloadReq.json()

      // If the request failed, we'll show an error.
      if (!signedPayloadReq.ok) {
        toast({
          title: 'Mint Failed',
          description: json.error,
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
        setIsLoading(false)
        return
      }

      /**
       * If the request succeeded, we'll get the signed payload from the response.
       * The API should come back with a JSON object containing a field called signedPayload.
       * This line of code will parse the response and store it in a variable called signedPayload.
       */
      const signedPayload = json.signedPayload

      /**
       * Now we can call signature.mint and pass in the signed payload that we received from the server.
       * This means we provided a signature for the user to mint an NFT with.
       */
      const nft = await nftCollection?.signature.mint(signedPayload)

      if (nft) {
        toast({
          title: 'Mint Success',
          description: 'Successfully minted NFT with signature',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      }
      setIsLoading(false)
    } catch (err) {
      console.error(err)
      toast({
        title: 'Mint Failed',
        description: err.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      setIsLoading(false)
    }
  }

  return (
    <Layout>
      <Container maxW="4xl" mt={{ base: 6, md: 20 }}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onMint}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <HStack>
                <Stack flex={1}>
                  <FormControl isInvalid={!!errors.image && !!touched.image}>
                    <Field
                      component={FileUploader}
                      id="image"
                      name="image"
                      accept="image/png, image/gif, image/jpeg"
                    />
                    <FormErrorMessage>
                      {errors.image as string}
                    </FormErrorMessage>
                  </FormControl>
                </Stack>
                <Stack flex={1} spacing={5}>
                  <FormControl isInvalid={!!errors.name && !!touched.name}>
                    <FormLabel>Name</FormLabel>
                    <Field as={Input} id="name" name="name" type="text" />
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={!!errors.description && touched.description}
                  >
                    <FormLabel>Description</FormLabel>
                    <Field as={Textarea} id="description" name="description" />
                    <FormErrorMessage>{errors.description}</FormErrorMessage>
                  </FormControl>
                  <HStack>
                    <FormControl
                      isInvalid={!!errors.quantity && touched.quantity}
                    >
                      <FormLabel>Quantity</FormLabel>
                      <Field
                        as={Input}
                        id="quantity"
                        name="quantity"
                        type="number"
                      />
                      <FormErrorMessage>{errors.quantity}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors.price && touched.price}>
                      <FormLabel>Price</FormLabel>
                      <Field as={Input} id="price" name="price" type="number" />
                      <FormErrorMessage>{errors.price}</FormErrorMessage>
                    </FormControl>
                  </HStack>
                  <Button
                    isLoading={isLoading}
                    loadingText="Mintting"
                    colorScheme="teal"
                    alignSelf="center"
                    type="submit"
                  >
                    Mint
                  </Button>
                </Stack>
              </HStack>
            </form>
          )}
        </Formik>
      </Container>
    </Layout>
  )
}

export default Mint
