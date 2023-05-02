import { useQuery } from '@apollo/client'
import { GET_REPOSITORIES } from '../graphql/queries'
import { View, Text } from 'react-native'

const useRepositories = () => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  })

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
        <Text>There was an error, {error.message}</Text>
      </View>
    )
  }

  const repositories = data

  return repositories
}

export default useRepositories
