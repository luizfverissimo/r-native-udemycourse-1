import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const PlaceDetailScreen = (props) => {
  return (
    <View>
      <Text>PlacesDetailScreen</Text>
    </View>
  )
}

PlaceDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('placeTitle')
  }
}

export default PlaceDetailScreen

const styles = StyleSheet.create({})
