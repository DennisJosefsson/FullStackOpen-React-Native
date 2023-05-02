import { gql } from '@apollo/client'

export const USER_SIGNIN = gql`
  mutation userSignIn($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`
