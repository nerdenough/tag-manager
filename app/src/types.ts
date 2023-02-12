import { Image } from './gql/graphql'

export type State = {
  status: 'saved' | 'unsaved' | 'error'
  dataset: {
    identifier: string
    images: Image[]
  }
}
