import { buildSchema } from 'graphql'

export const schema = buildSchema(`
  type Image {
    filename: String!
    captions: [String!]
  }

  type Dataset {
    images: [Image!]
  }

  type DatasetQueries {
    getIdentifiers: [String!]
    get(identifier: String!): Dataset
  }

  type Query {
    dataset: DatasetQueries!
  }

  type Mutation {
    updateImage(datasetIdentifier: String!, imageFileName: String!, captions: [String!]): Boolean!
  }
`)
