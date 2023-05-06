import { View, Text, ScrollView, Pressable } from 'react-native'
import { Link, useNavigate } from 'react-router-native'

import { useQuery, useApolloClient } from '@apollo/client'
import { GET_USER } from '../graphql/queries'
import { useAuthStorage } from '../hooks/useAuthStorage'
import theme from '../theme'

const AppBar = () => {
  const client = useApolloClient()
  const navigate = useNavigate()
  const authStorage = useAuthStorage()
  const { data, error, loading } = useQuery(GET_USER)

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }
  if (error) {
    return (
      <View>
        <Text>There was a problem: {error.message}</Text>
      </View>
    )
  }

  const user = data.me

  const signOut = async () => {
    navigate('/')
    await authStorage.removeAccessToken()
    await client.resetStore()
  }

  return (
    <View style={theme.appBarContainer}>
      <ScrollView horizontal>
        <Link to="/">
          <Text style={theme.appBarFlexItem}>Repositories</Text>
        </Link>
        {!user && (
          <Link to="/signin">
            <Text style={theme.appBarFlexItem}>Sign in</Text>
          </Link>
        )}
        {!user && (
          <Link to="/signup">
            <Text style={theme.appBarFlexItem}>Sign up</Text>
          </Link>
        )}
        {user && (
          <Link to="/createreview">
            <Text style={theme.appBarFlexItem}>Create a review</Text>
          </Link>
        )}
        {user && (
          <Link to="/myreviews">
            <Text style={theme.appBarFlexItem}>My reviews</Text>
          </Link>
        )}
        {user && (
          <Pressable onPress={signOut}>
            <Text style={theme.appBarFlexItem}>Sign out</Text>
          </Pressable>
        )}
      </ScrollView>
    </View>
  )
}

export default AppBar
