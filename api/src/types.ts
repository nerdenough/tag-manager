export type Image = {
  filename: string
  url: string
  captions?: string[]
}

export type Dataset = {
  images: Image[]
}
