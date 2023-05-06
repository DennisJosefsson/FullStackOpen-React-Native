import { useMutation, useApolloClient } from '@apollo/client'
import { CREATE_REVIEW } from '../graphql/mutations'

const useCreateReview = ({ ownerName, repositoryName, rating, text }) => {
  const client = useApolloClient()

  const [mutate, result] = useMutation(CREATE_REVIEW, {
    variables: { ownerName, repositoryName, rating, text },
  })
  const createReview = async ({ ownerName, repositoryName, rating, text }) => {
    const { data } = await mutate({
      variables: { ownerName, repositoryName, rating, text },
    })
    if (data) {
      await client.resetStore()
      return data
    }
  }

  return [createReview, result]
}

export default useCreateReview
