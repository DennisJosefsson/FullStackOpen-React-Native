import { Pressable, Text } from 'react-native'

const AppBarTab = ({ text, styled }) => {
  return (
    <>
      <Pressable>
        <Text style={styled}>{text}</Text>
      </Pressable>
    </>
  )
}

export default AppBarTab
