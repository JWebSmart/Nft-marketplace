import { ThirdwebSDK } from '@thirdweb-dev/sdk'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function server(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // De-structure the arguments we passed in out of the request body
    const {
      authorAddress,
      name: nftName,
      description,
      price,
      quantity,
      imagePath,
    } = JSON.parse(req.body)

    // You'll need to add your private key in a .env.local file in the root of your project
    // !!!!! NOTE !!!!! NEVER LEAK YOUR PRIVATE KEY to anyone!
    if (!process.env.PRIVATE_KEY) {
      throw new Error("You're missing PRIVATE_KEY in your .env.local file.")
    }

    // Initialize the Thirdweb SDK on the serverside
    const sdk = ThirdwebSDK.fromPrivateKey(
      // Your wallet private key (read it in from .env.local file)
      process.env.PRIVATE_KEY as string,
      'mumbai'
    )

    // Load the NFT Collection via it's contract address using the SDK
    const nftCollection = sdk.getNFTCollection(
      // Replace this with your NFT Collection contract address
      process.env.NEXT_PUBLIC_NFT_COLLECTION_ADDRESS as string
    )

    // Generate the signature for the page NFT
    const signedPayload = await nftCollection.signature.generate({
      to: authorAddress,
      metadata: {
        name: nftName as string,
        image: imagePath as string,
        description,
        properties: {
          // Add any properties you want to store on the NFT
        },
        price,
        quantity,
      },
      price,
      quantity,
    })

    // Return back the signedPayload to the client.
    res.status(200).json({
      signedPayload: JSON.parse(JSON.stringify(signedPayload)),
    })
  } catch (e) {
    res.status(500).json({ error: `Server error ${e}` })
  }
}
