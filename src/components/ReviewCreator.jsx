import Text from './Text'
import { Pressable, View } from 'react-native'
import FormikTextInput from './FormikTextInput'
import { Formik } from 'formik'
import * as yup from 'yup'
import useCreateReview from '../hooks/useCreateReview'
import { useNavigate } from 'react-router-native'

import theme from '../theme'
import { useState } from 'react'

const initialValues = {
  ownerName: '',
  rating: '',
  repositoryName: '',
  text: '',
}

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .min(0, 'Rating cannot be below 0')
    .max(100, 'Rating cannot be above 100')
    .required('Rating is required')
    .integer('Rating must be an integer'),
})

const ErrorMessage = ({ error }) => {
  if (!error) {
    return null
  }
  return (
    <View style={{ backgroundColor: 'white', borderRadius: 5, padding: 5 }}>
      <Text style={{ color: 'red', fontSize: 14 }}>{error}</Text>
    </View>
  )
}

const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={theme.inputContainer}>
      <FormikTextInput
        style={theme.input}
        name="ownerName"
        placeholder="Owner's name"
      />
      <FormikTextInput
        style={theme.input}
        name="repositoryName"
        placeholder="Repository's name"
      />
      <FormikTextInput
        style={theme.input}
        name="rating"
        placeholder="Rating between 0 and 100"
      />
      <FormikTextInput
        style={theme.input}
        name="text"
        placeholder="Review"
        multiline
      />
      <Pressable onPress={onSubmit}>
        <Text style={theme.button}>Create a review</Text>
      </Pressable>
    </View>
  )
}

export const ReviewFormContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

const CreateReview = () => {
  const [createReview] = useCreateReview(initialValues)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values

    try {
      const newReview = await createReview({
        ownerName,
        repositoryName,
        rating: Number(rating),
        text,
      })
      const repoId = newReview.createReview.repository.id

      navigate(`/${repoId}`)
    } catch (e) {
      console.log(e)
      setError(`Error: ${e.message}`)
      setTimeout(() => {
        setError(null)
        navigate('/createreview')
      }, 5000)
    }
  }

  return (
    <>
      <ErrorMessage error={error} />

      <ReviewFormContainer onSubmit={onSubmit} />
    </>
  )
}

export default CreateReview
