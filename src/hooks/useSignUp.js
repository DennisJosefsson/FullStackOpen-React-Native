import { useMutation } from '@apollo/client'
import { USER_SIGNUP } from '../graphql/mutations'

const useSignUp = ({ username, password }) => {
  const [mutate, result] = useMutation(USER_SIGNUP, {
    variables: { username, password },
  })
  const createUser = async ({ username, password }) => {
    const { data } = await mutate({
      variables: { username, password },
    })
    if (data) {
      return data
    }
  }

  return [createUser, result]
}

export default useSignUp
