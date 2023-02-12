import test from 'ava'
import { GraphQLError } from 'graphql'
import { readFileSync } from 'fs'
import { ImageInput } from '../../src/types'
import { update } from '../../src/resolvers/dataset/update'
import path from 'path'

const mockfs = require('mock-fs')

type TestCase = {
  name: string
  identifier: string
  images: ImageInput[]
  error?: Error
  expected?: {
    filename: string
    captions: string
  }[]
}

const testCases: TestCase[] = [
  {
    name: 'throws a graphql error if the dataset does not exist',
    identifier: 'some-invalid-identifier',
    images: [],
    error: new GraphQLError('the specified dataset does not exist', {
      extensions: {
        identifier: 'some-invalid-identifier',
      },
    }),
  },
  {
    name: 'throws a graphql error if an image does not exist',
    identifier: 'mushrooms',
    images: [
      {
        filename: 'cyclocybe-parasitica.png',
        captions: ['cyclocybe parasitica', 'tawaka', 'poplar mushroom'],
      },
    ],
    error: new GraphQLError('the specified image does not exist', {
      extensions: {
        datasetIdentifier: 'mushrooms',
        filename: 'cyclocybe-parasitica.png',
      },
    }),
  },
  {
    name: 'updates caption files for images with captions',
    identifier: 'mushrooms',
    images: [
      {
        filename: 'amanita-muscaria.png',
        captions: ['amanita muscaria', 'fly agaric', 'red cap'],
      },
      {
        filename: 'boletus-edulis.png',
        captions: [],
      },
      {
        filename: 'pleurotus-parsonsiae.png',
        captions: ['pleurotus parsonsiae', 'velvet oyster', 'saprotrophic'],
      },
    ],
    expected: [
      {
        filename: 'amanita-muscaria.txt',
        captions: 'amanita muscaria, fly agaric, red cap',
      },
      {
        filename: 'boletus-edulis.txt',
        captions: '',
      },
      {
        filename: 'pleurotus-parsonsiae.txt',
        captions: 'pleurotus parsonsiae, velvet oyster, saprotrophic',
      },
    ],
  },
]

test.beforeEach(() => {
  mockfs({
    '/datasets': {
      mushrooms: {
        'amanita-muscaria.png': 'some png image',
        'amanita-muscaria.txt':
          'amanita muscaria, fly agaric, red cap, white spots, white spores, white gills, mycorrhizal',
        'boletus-edulis.png': 'some png image',
        'pleurotus-parsonsiae.png': 'some png image',
      },
    },
  })
})

test.afterEach(() => {
  mockfs.restore()
})

testCases.forEach((tc) =>
  test(tc.name, (t) => {
    try {
      update({ identifier: tc.identifier, images: tc.images })
      if (tc.error) {
        t.fail('test case should throw an error')
      }
      tc.expected?.forEach(({ filename, captions }) => {
        const data = readFileSync(
          path.resolve('/datasets', tc.identifier, filename)
        )
        t.is(data.toString(), captions)
      })
    } catch (err) {
      if (!tc.error) {
        t.fail('test case should not throw an error')
      }

      t.deepEqual(err, tc.error)
    }
  })
)
