import Text from './Text'
import { Pressable, View } from 'react-native'
import FormikTextInput from './FormikTextInput'
import { Formik } from 'formik'
import * as yup from 'yup'

import theme from '../theme'

const initialValues = {
  username: '',
  password: '',
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'Username must be at least five letters.')
    .required('Username is required'),
  password: yup
    .string()
    .min(7, 'Password must be at least seven letters.')
    .required('Password is required'),
})

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={theme.inputContainer}>
      <FormikTextInput
        style={theme.input}
        name="username"
        placeholder="Username"
      />
      <FormikTextInput
        style={theme.input}
        secureTextEntry
        name="password"
        placeholder="Password"
      />
      <Pressable onPress={onSubmit}>
        <Text style={theme.button}>Submit</Text>
      </Pressable>
    </View>
  )
}

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values)
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

export default SignIn
