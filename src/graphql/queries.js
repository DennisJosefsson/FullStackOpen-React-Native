import { gql } from '@apollo/client'

const REPOSITORY_ITEMS = gql`
  fragment RepositoryItems on Repository {
    description
    forksCount
    fullName
    id
    language
    ownerAvatarUrl
    ratingAverage
    reviewCount
    stargazersCount
  }
`

export const GET_REPOSITORIES = gql`
  query Node {
    repositories {
      edges {
        node {
          ...RepositoryItems
        }
      }
    }
  }
  ${REPOSITORY_ITEMS}
`

export const GET_USER = gql`
  {
    me {
      id
      username
    }
  }
`
