
import { ImagePool } from '@squoosh/lib'
import fs from 'fs/promises'
import path from 'path'

const imagePool = new ImagePool()

await compression('back.png')
await compressionWithResize('tonkatsu.jpg')

imagePool.close()

async function compression(fileNamePlain) {
  const oldBasePath = './assets/old/'
  const newBasePath = './assets/new/'
  // filePath => Promise<Buffer>
  const file = await fs.readFile(oldBasePath + fileNamePlain)
  // Buffer => Image
  const image = imagePool.ingestImage(file)
  await image.decoded
  console.log('old file data:',image.decoded)

  // encode options
  const encodeOptions = {
    mozjpeg: 'auto', // auto conversion to jpg
    jxl: {
      quality: 85, // quality(max 100)
    },
  }
  await image.encode(encodeOptions)

  // back.png => back
  const fileName = fileNamePlain.substr(0, fileNamePlain.lastIndexOf("."))
  const newFilePath = newBasePath + fileName + '.jpg'
  console.log(newFilePath)
  const rawEncodedImage = (await image.encodedWith.mozjpeg).binary
  await fs.writeFile(newFilePath, rawEncodedImage)
  const newFile = await fs.readFile(newFilePath)
  const newImage = imagePool.ingestImage(newFile)
  await newImage.decoded

  console.log('new file data:',newImage.decoded)
}

async function compressionWithResize(fileNamePlain) {
  const oldBasePath = './assets/old/'
  const newBasePath = './assets/new/'
  // filePath => Promise<Buffer>
  const file = await fs.readFile(oldBasePath + fileNamePlain)
  // Buffer => Image
  const image = imagePool.ingestImage(file)
  await image.decoded
  console.log('old file data:',image.decoded)

  const preprocessOptions = {
    resize: {
      enabled: true,
      width:   200, // px
      // When either width or height is specified, the image resized to specified size keeping aspect ratio.
      // height: 'auto',
    },
  }
  await image.preprocess(preprocessOptions)

  // encode options
  const encodeOptions = {
    mozjpeg: 'auto', // auto conversion to jpg
    jxl: {
      quality: 85, // quality(max 100)
    },
  }
  await image.encode(encodeOptions)

  // back.png => back
  const fileName = fileNamePlain.substr(0, fileNamePlain.lastIndexOf("."))
  const newFilePath = newBasePath + fileName + '.jpg'
  console.log(newFilePath)
  const rawEncodedImage = (await image.encodedWith.mozjpeg).binary
  await fs.writeFile(newFilePath, rawEncodedImage)
  const newFile = await fs.readFile(newFilePath)
  const newImage = imagePool.ingestImage(newFile)
  await newImage.decoded

  console.log('new file data:',newImage.decoded)
}


