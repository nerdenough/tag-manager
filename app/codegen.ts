import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'http://api:4000/graphql',
  documents: ['src/**/*.vue'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './src/gql/': {
      preset: 'client',
      config: {
        useTypeImports: true,
      },
      plugins: [],
    },
  },
}

export default config
