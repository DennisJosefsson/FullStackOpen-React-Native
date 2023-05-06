import Text from './Text'
import { Pressable, View } from 'react-native'
import FormikTextInput from './FormikTextInput'
import { Formik } from 'formik'
import * as yup from 'yup'
import useSignUp from '../hooks/useSignUp'
import useSignIn from '../hooks/useSignIn'
import { useNavigate } from 'react-router-native'

import theme from '../theme'
import { useState } from 'react'

const initialValues = {
  username: '',
  password: '',
  passwordConfirm: '',
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, 'Must be at least 1 character')
    .max(30, 'Cannot have more than 30 characters')
    .required('Username is required'),
  password: yup
    .string(5, 'Must be at least 5 characters')
    .max(30, 'Cannot have more than 50 characters')
    .required('Password is required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null])
    .required('Password confirmation is required'),
})

const ErrorMessage = ({ error }) => {
  if (!error) {
    return null
  }
  return (
    <View style={{ backgroundColor: 'white', borderRadius: 5, padding: 5 }}>
      <Text style={{ color: 'red', fontSize: 14, fontWeight: 600 }}>
        {error}
      </Text>
    </View>
  )
}

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={theme.inputContainer}>
      <FormikTextInput
        style={theme.input}
        name="username"
        placeholder="Username"
      />
      <FormikTextInput
        style={theme.input}
        name="password"
        placeholder="Password"
      />
      <FormikTextInput
        style={theme.input}
        name="passwordConfirm"
        placeholder="Confirm password"
      />

      <Pressable onPress={onSubmit}>
        <Text style={theme.button}>Create user</Text>
      </Pressable>
    </View>
  )
}

export const SignUpFormContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

const SignUp = () => {
  const [createUser] = useSignUp(initialValues)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const [signIn] = useSignIn(initialValues)

  const onSubmit = async (values) => {
    const { username, password } = values

    try {
      await createUser({
        username,
        password,
      })
      await signIn({ username, password })
      navigate('/')
    } catch (e) {
      console.log(e)
      setError(`Error: ${e.message}`)
      setTimeout(() => {
        setError(null)
        navigate('/')
      }, 5000)
    }
  }

  return (
    <>
      <ErrorMessage error={error} />

      <SignUpFormContainer onSubmit={onSubmit} />
    </>
  )
}

export default SignUp
