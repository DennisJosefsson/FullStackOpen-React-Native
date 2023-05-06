import { View, Pressable, Alert } from 'react-native'
import useDeleteReview from '../hooks/useDeleteReview'
import Text from './Text'
import theme from '../theme'
import moment from 'moment'
import * as Linking from 'expo-linking'

const ButtonComponent = ({ url, id, refetch }) => {
  const [deleteReview] = useDeleteReview()
  const onPressGitHubHandle = async () => {
    try {
      await Linking.openURL(url)
    } catch (error) {
      console.log(error.message)
    }
  }

  const onPressDeleteHandle = () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Delete', onPress: () => deleteSpecificReview() },
      ]
    )
  }

  const deleteSpecificReview = async () => {
    try {
      await deleteReview(id)
      refetch({ includeReviews: true })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
      }}
    >
      <Pressable onPress={onPressGitHubHandle}>
        <Text fontWeight="bold" style={theme.button}>
          GitHub Repo
        </Text>
      </Pressable>
      <Pressable onPress={onPressDeleteHandle}>
        <Text fontWeight="bold" style={theme.buttonRed}>
          Delete Review
        </Text>
      </Pressable>
    </View>
  )
}

const ReviewItem = ({ review, myReviews, refetch }) => {
  return (
    <View style={theme.containerItem}>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <Text style={theme.reviewItem}>{review.rating}</Text>
        <View style={{ display: 'flex', padding: 5, margin: 5 }}>
          <Text fontWeight="bold" color="textPrimary" fontSize="subheading">
            {myReviews ? review.repository.fullName : review.user.username}
          </Text>
          <Text fontSize="body" color="textSecondary">
            {moment(review.createdAt).format('DD.MM.YYYY')}
          </Text>
          <Text
            fontSize="body"
            color="textPrimary"
            style={{
              marginTop: 5,
              width: 250,
              flexGrow: 1,
              flex: 1,
              margin: 1,
            }}
          >
            {review.text}
          </Text>
        </View>
      </View>
      {myReviews && (
        <ButtonComponent
          url={review.repository.url}
          id={review.id}
          refetch={refetch}
        />
      )}
    </View>
  )
}

export default ReviewItem
