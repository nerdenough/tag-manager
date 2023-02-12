import test from 'ava'
import { GraphQLError } from 'graphql'
import { Dataset } from '../../types'
import { get } from './get'

const mockfs = require('mock-fs')

type TestCase = {
  name: string
  identifier: string
  expected?: Dataset
  error?: Error
}

const testCases: TestCase[] = [
  {
    name: 'throws a graphql error if the dataset does not exist',
    identifier: 'some-invalid-identifier',
    error: new GraphQLError('the specified path does not exist', {
      extensions: {
        identifier: 'some-invalid-identifier',
      },
    }),
  },
  {
    name: 'returns a dataset with images and captions',
    identifier: 'testing-mushrooms',
    expected: {
      images: [
        {
          filename: 'amanita-muscaria.png',
          url: 'http://localhost:4000/datasets/testing-mushrooms/amanita-muscaria.png',
          captions: [
            'amanita muscaria',
            'fly agaric',
            'red cap',
            'white spots',
            'white spores',
            'white gills',
            'mycorrhizal',
          ],
        },
        {
          filename: 'boletus-edulis.png',
          url: 'http://localhost:4000/datasets/testing-mushrooms/boletus-edulis.png',
        },
        {
          filename: 'pleurotus-parsonsiae.png',
          url: 'http://localhost:4000/datasets/testing-mushrooms/pleurotus-parsonsiae.png',
          captions: ['pleurotus parsonsiae', 'velvet oyster', 'saprotrophic'],
        },
      ],
    },
  },
]

test.beforeEach(() => {
  mockfs({
    '/datasets/testing-mushrooms': {
      'amanita-muscaria.png': 'some png image',
      'amanita-muscaria.txt':
        'amanita muscaria, fly agaric, red cap, white spots, white spores, white gills, mycorrhizal',
      'boletus-edulis.png': 'some png image',
      'pleurotus-parsonsiae.png': 'some png image',
      'pleurotus-parsonsiae.txt':
        'pleurotus parsonsiae, velvet oyster, saprotrophic',
    },
  })
})

test.afterEach(() => {
  mockfs.restore()
})

testCases.forEach((tc) =>
  test(tc.name, (t) => {
    try {
      const dataset = get({ identifier: tc.identifier })
      if (tc.error) {
        t.fail('test case should throw an error')
      }
      t.deepEqual(dataset, tc.expected)
    } catch (err) {
      if (!tc.error) {
        t.fail('test case should not throw an error')
      }

      t.deepEqual(err, tc.error)
    }
  })
)
