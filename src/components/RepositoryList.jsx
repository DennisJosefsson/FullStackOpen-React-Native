import { FlatList, View, Pressable } from 'react-native'
import { useNavigate } from 'react-router-native'
import useRepositories from '../hooks/useRepositories'
import RepositoryItem from './RepositoryItem'
import React, { useState } from 'react'
import Text from './Text'
import { Picker } from '@react-native-picker/picker'
import { Searchbar } from 'react-native-paper'
import { useDebounce } from 'use-debounce'
import theme from '../theme'

const ItemSeparator = () => <View style={theme.separator} />

const OrderMenu = ({ setOrder, order, searchKeyword, setSearchKeyword }) => {
  const menuItems = [
    {
      label: 'Latest repositories',
      value: 'latest',
    },
    {
      label: 'Highest average rating',
      value: 'highest',
    },
    {
      label: 'Lowest average rating',
      value: 'lowest',
    },
  ]

  const handleChange = (itemValue) => {
    if (itemValue === 'latest') {
      setOrder({
        orderDirection: 'DESC',
        orderBy: 'CREATED_AT',
      })
    } else if (itemValue === 'highest') {
      setOrder({
        orderDirection: 'DESC',
        orderBy: 'RATING_AVERAGE',
      })
    } else if (itemValue === 'lowest') {
      setOrder({
        orderDirection: 'ASC',
        orderBy: 'RATING_AVERAGE',
      })
    }
  }

  return (
    <View style={theme.container}>
      <View style={theme.containerItem}>
        <Searchbar
          placeholder="Filter"
          onChangeText={(query) => setSearchKeyword(query)}
          value={searchKeyword}
        />
        <Text fontWeight="bold">Select order</Text>
        <Picker
          selectedValue={order}
          onValueChange={(itemValue) => handleChange(itemValue)}
          style={theme.pickerStyle}
        >
          <Picker.Item key="default" label="Select" value="none" />
          {menuItems.map((item) => {
            return (
              <Picker.Item
                key={item.label}
                label={item.label}
                value={item.value}
              />
            )
          })}
        </Picker>
      </View>
    </View>
  )
}

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { setOrder, order, searchKeyword, setSearchKeyword } = this.props
    return (
      <OrderMenu
        setOrder={setOrder}
        order={order}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />
    )
  }

  render() {
    const repositories = this.props.repositories
    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : []
    const navigate = this.props.navigate
    const onEndReach = this.props.onEndReach
    const onPressHandle = (id) => {
      navigate(`/${id}`)
    }

    return (
      <View style={theme.container}>
        <FlatList
          data={repositoryNodes}
          ListHeaderComponent={this.renderHeader}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item }) => (
            <Pressable onPress={() => onPressHandle(item.id)}>
              <RepositoryItem
                fullName={item.fullName}
                description={item.description}
                forksCount={item.forksCount}
                reviewCount={item.reviewCount}
                ratingAverage={item.ratingAverage}
                language={item.language}
                stars={item.stargazersCount}
                imageUrl={item.ownerAvatarUrl}
              />
            </Pressable>
          )}
          keyExtractor={(item) => item.id}
          onEndReached={onEndReach}
          onEndReachedThreshold={0.5}
        />
      </View>
    )
  }
}

const RepositoryList = () => {
  const [order, setOrder] = useState({
    orderDirection: 'DESC',
    orderBy: 'CREATED_AT',
  })
  const [searchKeyword, setSearchKeyword] = useState('')
  const [search] = useDebounce(searchKeyword, 500)
  const navigate = useNavigate()
  const variables = {
    orderBy: order.orderBy,
    orderDirection: order.orderDirection,
    search,
    first: 3,
  }
  const { repositories, fetchMore } = useRepositories(variables)
  const onEndReach = () => {
    fetchMore()
    console.log('fetching more')
  }

  return (
    <RepositoryListContainer
      repositories={repositories}
      order={order}
      setOrder={setOrder}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
      navigate={navigate}
      onEndReach={onEndReach}
    />
  )
}

export default RepositoryList
