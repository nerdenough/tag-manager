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

export type DatasetMutations = {
  __typename?: 'DatasetMutations';
  update: Scalars['Boolean'];
};


export type DatasetMutationsUpdateArgs = {
  identifier: Scalars['String'];
  images: Array<ImageInput>;
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

export type ImageInput = {
  captions: Array<Scalars['String']>;
  filename: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  dataset: DatasetMutations;
};

export type Query = {
  __typename?: 'Query';
  dataset: DatasetQueries;
};

export type GetDatasetIdentifiersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDatasetIdentifiersQuery = { __typename?: 'Query', dataset: { __typename?: 'DatasetQueries', getIdentifiers?: Array<string> | null } };

export type GetDatasetQueryVariables = Exact<{
  identifier: Scalars['String'];
}>;


export type GetDatasetQuery = { __typename?: 'Query', dataset: { __typename?: 'DatasetQueries', get?: { __typename?: 'Dataset', images?: Array<{ __typename?: 'Image', filename: string, url: string, captions?: Array<string> | null }> | null } | null } };

export type UpdateDatasetMutationVariables = Exact<{
  identifier: Scalars['String'];
  images: Array<ImageInput> | ImageInput;
}>;


export type UpdateDatasetMutation = { __typename?: 'Mutation', dataset: { __typename?: 'DatasetMutations', update: boolean } };


export const GetDatasetIdentifiersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getDatasetIdentifiers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dataset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getIdentifiers"}}]}}]}}]} as unknown as DocumentNode<GetDatasetIdentifiersQuery, GetDatasetIdentifiersQueryVariables>;
export const GetDatasetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getDataset"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"identifier"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dataset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"get"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"identifier"},"value":{"kind":"Variable","name":{"kind":"Name","value":"identifier"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"captions"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetDatasetQuery, GetDatasetQueryVariables>;
export const UpdateDatasetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateDataset"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"identifier"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"images"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ImageInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dataset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"identifier"},"value":{"kind":"Variable","name":{"kind":"Name","value":"identifier"}}},{"kind":"Argument","name":{"kind":"Name","value":"images"},"value":{"kind":"Variable","name":{"kind":"Name","value":"images"}}}]}]}}]}}]} as unknown as DocumentNode<UpdateDatasetMutation, UpdateDatasetMutationVariables>;