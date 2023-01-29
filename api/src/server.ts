import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { GraphQLError } from 'graphql'
import { existsSync, writeFileSync } from 'fs'
import path from 'path'

import { get } from './resolvers/dataset/get'
import { getIdentifiers } from './resolvers/dataset/getIdentifiers'
import { schema } from './schema'

const updateImage = ({
  datasetIdentifier,
  imageFileName,
  captions,
}: {
  datasetIdentifier: string
  imageFileName: string
  captions: string[]
}) => {
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

  const baseFileName = imageFileName.substring(
    0,
    imageFileName.lastIndexOf('.')
  )
  const captionFileName = `${baseFileName}.txt`
  const data = captions.join(', ')

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

  return true
}

const root = {
  dataset: {
    getIdentifiers,
    get,
  },
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
