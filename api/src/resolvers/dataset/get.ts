import { GraphQLError } from 'graphql'
import { readdirSync, readFileSync } from 'fs'
import path from 'path'
import { Dataset, Image } from '../../types'

export const get = ({ identifier }: { identifier: string }): Dataset => {
  const images: Image[] = []
  let fileNames = []

  try {
    const files = readdirSync(path.resolve('/datasets', identifier), {
      withFileTypes: true,
    })
    fileNames = files
      .filter((dirent) => dirent.isFile())
      .map((dirent) => dirent.name)
  } catch (err) {
    console.error(err)
    throw new GraphQLError('the specified path does not exist', {
      extensions: {
        identifier,
      },
    })
  }

  const imageFileRegex = new RegExp(/\.(png|jpe?g|bmp|webp|avif)$/)
  const imageFileNames = fileNames.filter((file) => imageFileRegex.test(file))
  const captionFileNames = fileNames.filter((file) => file.endsWith('.txt'))

  imageFileNames.forEach((imageFileName) => {
    const baseFileName = imageFileName.substring(
      0,
      imageFileName.lastIndexOf('.')
    )
    const captionFileName = captionFileNames.find((captionFileName) =>
      captionFileName.startsWith(baseFileName)
    )

    if (!captionFileName) {
      return images.push({
        filename: imageFileName,
      })
    }

    const filePath = path.resolve('/datasets', identifier, captionFileName)
    let captions = []
    try {
      const file = readFileSync(filePath)
      captions = file
        .toString()
        .split(',')
        .map((str) => str.trim())
    } catch (err) {
      console.error(err)
      throw new GraphQLError('error reading caption file for image', {
        extensions: {
          filePath,
        },
      })
    }

    return images.push({
      filename: imageFileName,
      captions,
    })
  })

  return {
    images,
  }
}
