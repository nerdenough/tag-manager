/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Dataset = {
  __typename?: 'Dataset';
  images?: Maybe<Array<Image>>;
};

export type DatasetQueries = {
  __typename?: 'DatasetQueries';
  get?: Maybe<Dataset>;
  getIdentifiers?: Maybe<Array<Scalars['String']>>;
};


export type DatasetQueriesGetArgs = {
  identifier: Scalars['String'];
};

export type Image = {
  __typename?: 'Image';
  captions?: Maybe<Array<Scalars['String']>>;
  filename: Scalars['String'];
  url: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  updateImage: Scalars['Boolean'];
};


export type MutationUpdateImageArgs = {
  captions?: InputMaybe<Array<Scalars['String']>>;
  datasetIdentifier: Scalars['String'];
  imageFileName: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  dataset: DatasetQueries;
};

export type GetDatasetQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDatasetQuery = { __typename?: 'Query', dataset: { __typename?: 'DatasetQueries', getIdentifiers?: Array<string> | null } };

export type GetDatasetImagesQueryVariables = Exact<{
  identifier: Scalars['String'];
}>;


export type GetDatasetImagesQuery = { __typename?: 'Query', dataset: { __typename?: 'DatasetQueries', get?: { __typename?: 'Dataset', images?: Array<{ __typename?: 'Image', filename: string, url: string, captions?: Array<string> | null }> | null } | null } };


export const GetDatasetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getDataset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dataset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getIdentifiers"}}]}}]}}]} as unknown as DocumentNode<GetDatasetQuery, GetDatasetQueryVariables>;
export const GetDatasetImagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getDatasetImages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"identifier"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dataset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"get"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"identifier"},"value":{"kind":"Variable","name":{"kind":"Name","value":"identifier"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"captions"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetDatasetImagesQuery, GetDatasetImagesQueryVariables>;