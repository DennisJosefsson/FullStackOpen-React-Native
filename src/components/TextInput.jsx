import { TextInput as NativeTextInput } from 'react-native'

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style]

  return (
    <NativeTextInput
      style={[textInputStyle, { borderColor: error ? 'red' : 'blue' }]}
      {...props}
    />
  )
}

export default TextInput
