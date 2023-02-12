import { existsSync, writeFileSync } from 'fs'
import { GraphQLError } from 'graphql'
import path from 'path'

import { ImageInput } from '../../types'

const updateImageCaptions = (datasetIdentifier: string, image: ImageInput) => {
  if (
    !existsSync(path.resolve('/datasets', datasetIdentifier, image.filename))
  ) {
    throw new GraphQLError('the specified image does not exist', {
      extensions: {
        datasetIdentifier,
        filename: image.filename,
      },
    })
  }

  const baseFileName = image.filename.substring(
    0,
    image.filename.lastIndexOf('.')
  )
  const captionFileName = `${baseFileName}.txt`
  const data = image.captions.join(', ')

  try {
    writeFileSync(
      path.resolve('/datasets', datasetIdentifier, captionFileName),
      data
    )
  } catch (err) {
    console.error(err)
    throw new GraphQLError('error writing caption file', {
      extensions: {
        datasetIdentifier,
        captionFileName,
        data,
      },
    })
  }
}

export const update = ({
  identifier,
  images,
}: {
  identifier: string
  images: ImageInput[]
}) => {
  if (!identifier || !existsSync(path.resolve('/datasets', identifier))) {
    throw new GraphQLError('the specified dataset does not exist', {
      extensions: {
        identifier,
      },
    })
  }

  images.forEach((image) => updateImageCaptions(identifier, image))
  return true
}
