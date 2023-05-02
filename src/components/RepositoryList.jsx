import { FlatList, View, StyleSheet } from 'react-native'
import useRepositories from '../hooks/useRepositories'
import RepositoryItem from './RepositoryItem'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    display: 'flex',
    backgroundColor: '#c3dfe0',
  },
  containerItem: {
    padding: 5,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 6,
    backgroundColor: 'white',
    borderRadius: 5,
  },
})

const ItemSeparator = () => <View style={styles.separator} />

const RepositoryList = () => {
  const { repositories } = useRepositories()

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : []

  return (
    <View style={styles.container}>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <RepositoryItem
            fullName={item.fullName}
            description={item.description}
            forksCount={item.forksCount}
            reviewCount={item.reviewCount}
            ratingAverage={item.ratingAverage}
            language={item.language}
            stars={item.stargazersCount}
            imageUrl={item.ownerAvatarUrl}
            styles={styles}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}

export default RepositoryList
