import { useMutation } from '@apollo/client'
import { DELETE_REVIEW } from '../graphql/mutations'

const useDeleteReview = (id) => {
  const [mutate, result] = useMutation(DELETE_REVIEW, {
    variables: { id },
  })
  const deleteReview = async (id) => {
    const { data, error } = await mutate({
      variables: { deleteReviewId: id },
    })
    if (data) {
      return data
    } else if (error) {
      return error
    }
  }

  return [deleteReview, result]
}

export default useDeleteReview
