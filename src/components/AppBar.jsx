import { View, StyleSheet, Text, ScrollView, Pressable } from 'react-native'
import { Link, useNavigate } from 'react-router-native'
import Constants from 'expo-constants'
import { useQuery, useApolloClient } from '@apollo/client'
import { GET_USER } from '../graphql/queries'
import { useAuthStorage } from '../hooks/useAuthStorage'

// import AppBarTab from './AppBarTab'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#19335e',
  },
  flexItem: {
    color: '#e6eaf0',
    flexGrow: 0,
    fontSize: 18,
    margin: 10,
    fontWeight: '600',
  },
})

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
    await authStorage.removeAccessToken()
    await client.resetStore()
    navigate('/')
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <Text style={styles.flexItem}>Repositories</Text>
        </Link>
        {!user && (
          <Link to="/signin">
            <Text style={styles.flexItem}>Sign in</Text>
          </Link>
        )}
        {user && (
          <Pressable onPress={signOut}>
            <Text style={styles.flexItem}>Sign out</Text>
          </Pressable>
        )}
      </ScrollView>
    </View>
  )
}

export default AppBar
