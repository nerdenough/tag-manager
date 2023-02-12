import { buildSchema } from 'graphql'

export const schema = buildSchema(`
  type Image {
    filename: String!
    url: String!
    captions: [String!]
  }

  type Dataset {
    images: [Image!]
  }

  type DatasetQueries {
    getIdentifiers: [String!]
    get(identifier: String!): Dataset
  }

  input ImageInput {
    filename: String!
    captions: [String!]!
  }

  type DatasetMutations {
    update(identifier: String!, images: [ImageInput!]!): Boolean!
  }

  type Query {
    dataset: DatasetQueries!
  }

  type Mutation {
    dataset: DatasetMutations!
  }
`)
