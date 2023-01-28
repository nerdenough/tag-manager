import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema, GraphQLError } from 'graphql'
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'fs'
import path from 'path'

const schema = buildSchema(`
  type Image {
    filename: String!
    captions: [String!]
  }

  type Dataset {
    images: [Image!]
  }

  type Query {
    loadDataset(identifier: String!): Dataset
  }

  type Mutation {
    updateImage(datasetIdentifier: String!, imageFileName: String!, captions: [String!]): Boolean!
  }
`)

const loadDataset = ({ identifier }) => {
  const images = []
  let fileNames = []

  try {
    fileNames = readdirSync(path.resolve('/datasets', identifier))
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

const updateImage = ({ datasetIdentifier, imageFileName, captions }) => {
  if (
    !existsSync(path.resolve('/datasets', datasetIdentifier, imageFileName))
  ) {
    throw new GraphQLError('the specified image does not exist', {
      extensions: {
        datasetIdentifier,
        imageFileName,
      },
    })
  }

  try {
    const baseFileName = imageFileName.substring(
      0,
      imageFileName.lastIndexOf('.')
    )
    const captionFileName = `${baseFileName}.txt`
    const data = captions.join(', ')
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

  return true
}

const root = {
  loadDataset,
  updateImage,
}

const app = express()
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
)
app.listen(4000)
console.log('Running a GraphQL API server at http://localhost:4000/graphql')
