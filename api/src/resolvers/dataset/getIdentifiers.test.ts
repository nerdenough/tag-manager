import test from 'ava'
import { GraphQLError } from 'graphql'
import { getIdentifiers } from './getIdentifiers'

const mockfs = require('mock-fs')

type TestCase = {
  name: string
  expected?: string[]
  error?: Error
  before?: () => void
}

const testCases: TestCase[] = [
  {
    name: 'throws a graphql error if the dataset directory does not exist',
    error: new GraphQLError('error reading datasets folder'),
    before: () => mockfs({}),
  },
  {
    name: 'returns a list of dataset identifiers',
    expected: ['animals', 'cars', 'mushrooms'],
    before: () =>
      mockfs({
        '/datasets': {
          mushrooms: {},
          animals: {},
          cars: {},
        },
      }),
  },
]

test.afterEach(() => {
  mockfs.restore()
})

testCases.forEach((tc) =>
  test(tc.name, (t) => {
    if (tc.before) {
      tc.before()
    }

    try {
      const identifiers = getIdentifiers()
      if (tc.error) {
        t.fail('test case should throw an error')
      }
      t.deepEqual(identifiers, tc.expected)
    } catch (err) {
      if (!tc.error) {
        t.fail('test case should not throw an error')
      }

      t.deepEqual(err, tc.error)
    }
  })
)
