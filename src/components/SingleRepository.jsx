import { View, FlatList } from 'react-native'
import Text from './Text'
import { useParams } from 'react-router-native'
import useGetSingleRepository from '../hooks/useGetSingleRepository'

import RepositoryItem from './RepositoryItem'

import theme from '../theme'
import ReviewItem from './ReviewItem'

const ItemSeparator = () => <View style={theme.separator} />

const SingleRepository = () => {
  const id = useParams()
  const variables = { id: id.id, first: 3 }
  const { data, loading, fetchMore } = useGetSingleRepository(variables)

  const onEndReach = () => {
    fetchMore()
  }

  if (loading) {
    return <Text>Loading...</Text>
  }

  const repository = data?.repository
  const reviews = data?.repository.reviews

  const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : []

  return (
    <View style={theme.container}>
      <FlatList
        data={reviewNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={() => (
          <RepositoryItem
            fullName={repository.fullName}
            description={repository.description}
            forksCount={repository.forksCount}
            reviewCount={repository.reviewCount}
            ratingAverage={repository.ratingAverage}
            language={repository.language}
            stars={repository.stargazersCount}
            imageUrl={repository.ownerAvatarUrl}
            url={repository.url}
            showLinkButton
          />
        )}
      />
    </View>
  )
}

export default SingleRepository
