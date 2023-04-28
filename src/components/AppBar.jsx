import { View, StyleSheet, Text, ScrollView } from 'react-native'
import { Link } from 'react-router-native'
import Constants from 'expo-constants'

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
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <Text style={styles.flexItem}>Repositories</Text>
        </Link>
        <Link to="/signin">
          <Text style={styles.flexItem}>Sign in</Text>
        </Link>
      </ScrollView>
    </View>
  )
}

export default AppBar
