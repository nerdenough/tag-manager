import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import cors from 'cors'

import { get } from './resolvers/dataset/get'
import { getIdentifiers } from './resolvers/dataset/getIdentifiers'
import { schema } from './schema'
import { update } from './resolvers/dataset/update'

const root = {
  dataset: {
    getIdentifiers,
    get,
    update,
  },
}

const app = express()
app.use(cors())
app.use('/datasets', express.static('/datasets'))
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
