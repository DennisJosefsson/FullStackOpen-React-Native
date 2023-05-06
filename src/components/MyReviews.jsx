import { useQuery } from '@apollo/client'
import { GET_USER } from '../graphql/queries'
import { FlatList, View } from 'react-native'
import Text from './Text'
import ReviewItem from './ReviewItem'
import theme from '../theme'

const ItemSeparator = () => <View style={theme.separator} />

const MyReviews = () => {
  const { data, loading, error, refetch } = useQuery(GET_USER, {
    variables: { includeReviews: true },
  })

  if (loading) {
    return <Text>Loading...</Text>
  }

  if (error) {
    return <Text>There was an error: {error.message}</Text>
  }

  const reviews = data.me.reviews
  const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : []

  return (
    <View style={theme.container}>
      <FlatList
        data={reviewNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <ReviewItem review={item} refetch={refetch} myReviews />
        )}
        keyExtractor={({ id }) => id}
      />
    </View>
  )
}

export default MyReviews
