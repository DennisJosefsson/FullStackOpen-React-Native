import { View, Image, Pressable } from 'react-native'
import * as Linking from 'expo-linking'
import theme from '../theme'
import Text from './Text'

const RepositoryItem = ({
  fullName,
  description,
  language,
  stars,
  forksCount,
  ratingAverage,
  reviewCount,
  imageUrl,
  url,
  showLinkButton,
}) => {
  const onPressHandle = async () => {
    try {
      await Linking.openURL(url)
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <View testID="repositoryItem" style={theme.containerItem}>
      <View style={theme.itemMainContainer}>
        <View style={theme.itemDividerContainer}>
          <View style={{ margin: 3 }}>
            <Image
              style={theme.img}
              source={{
                uri: imageUrl,
                method: 'POST',
                headers: {
                  Pragma: 'no-cache',
                },
                body: 'Your Body goes here',
              }}
            />
          </View>
          <View style={{ margin: 3, display: 'flex' }}>
            <Text
              style={{ flexWrap: 'wrap', margin: 1 }}
              fontSize="subheading"
              fontWeight="bold"
              color="textPrimary"
            >
              {fullName}
            </Text>
            <View
              style={{
                width: 275,
                flexGrow: 1,
                flex: 1,
                margin: 1,
              }}
            >
              <Text fontSize="body" color="textSecondary">
                {description}
              </Text>
            </View>
            <Text
              style={{
                alignSelf: 'flex-start',
                color: 'white',
                backgroundColor: 'blue',
                borderRadius: 5,
                padding: 5,
              }}
              fontSize="body"
            >
              {language}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          padding: 2,
          margin: 2,
          display: 'flex',
          justifyContent: 'space-evenly',
        }}
      >
        <View
          style={{
            display: 'flex',
          }}
        >
          <Text
            fontSize="body"
            color="textSecondary"
            style={{ textAlign: 'center' }}
          >
            Stars
          </Text>
          <Text
            fontSize="subheading"
            fontWeight="bold"
            color="textPrimary"
            style={{ textAlign: 'center' }}
          >
            {(stars / 1000).toFixed(1)}k
          </Text>
        </View>
        <View style={{ display: 'flex' }}>
          <Text
            fontSize="body"
            color="textSecondary"
            style={{ textAlign: 'center' }}
          >
            Forks
          </Text>
          <Text
            fontSize="subheading"
            fontWeight="bold"
            color="textPrimary"
            style={{ textAlign: 'center' }}
          >
            {(forksCount / 1000).toFixed(1)}k
          </Text>
        </View>
        <View style={{ display: 'flex' }}>
          <Text
            fontSize="body"
            color="textSecondary"
            style={{ textAlign: 'center' }}
          >
            Reviews
          </Text>
          <Text
            fontSize="subheading"
            fontWeight="bold"
            color="textPrimary"
            style={{ textAlign: 'center' }}
          >
            {reviewCount}
          </Text>
        </View>
        <View style={{ display: 'flex' }}>
          <Text
            fontSize="body"
            color="textSecondary"
            style={{ textAlign: 'center' }}
          >
            Rating
          </Text>
          <Text
            fontSize="subheading"
            fontWeight="bold"
            color="textPrimary"
            style={{ textAlign: 'center' }}
          >
            {ratingAverage}
          </Text>
        </View>
      </View>
      {showLinkButton && (
        <Pressable onPress={onPressHandle}>
          <Text fontSize="subheading" fontWeight="bold" style={theme.button}>
            GitHub Repo
          </Text>
        </Pressable>
      )}
    </View>
  )
}

export default RepositoryItem
