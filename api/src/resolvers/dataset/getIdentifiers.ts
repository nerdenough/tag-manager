import { GraphQLError } from 'graphql'
import { readdirSync } from 'fs'
import path from 'path'

export const getIdentifiers = (): string[] => {
  try {
    const folders = readdirSync(path.resolve('/datasets'), {
      withFileTypes: true,
    })
    return folders
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name)
  } catch (err) {
    console.error(err)
    throw new GraphQLError('error reading datasets folder')
  }
}
