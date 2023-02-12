import { Image } from './gql/graphql'

export type State = {
  status: 'saved' | 'unsaved'
  images: Image[]
}
