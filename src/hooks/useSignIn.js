import { useMutation, useApolloClient } from '@apollo/client'
import { USER_SIGNIN } from '../graphql/mutations'
import { useAuthStorage } from '../hooks/useAuthStorage'

const useSignIn = ({ username, password }) => {
  const authStorage = useAuthStorage()
  const client = useApolloClient()
  const [mutate, result] = useMutation(USER_SIGNIN, {
    variables: { username, password },
  })

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({ variables: { username, password } })
    if (data) {
      await authStorage.setAccessToken(data.authenticate.accessToken)
      await client.resetStore()
    }
  }
  return [signIn, result]
}

export default useSignIn
