import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import MapPreview from "../components/MapPreview";

import Colors from "../constants/Colors";

const LocationPicker = (props) => {
  const [isFecthingState, setIsFecthingState] = useState(false);
  const [pickedLocation, setPickedLocation] = useState();
  
  const mapPickedLocation = props.navigation.getParam('pickedLocation')

  const {onLocationPicked} = props

  useEffect(() => {
    if (mapPickedLocation) {
      setPickedLocation(mapPickedLocation)
      props.onLocationPicked(mapPickedLocation)
    }
  }, [mapPickedLocation, onLocationPicked])

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== "granted") {
      Alert.alert(
        "Insuficient permissions!",
        "You need to grant location permissions to use this app.",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };
  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    try {
      setIsFecthingState(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });
      console.log(location);
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
      
      props.onLocationPicked({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      })
    } catch (err) {
      Alert.alert(
        "Could not fetch location!",
        "Please try again or pick a location on the map",
        [{ text: "Okay" }]
      );
    }
    setIsFecthingState(false);
  };

  const pickOnMapHandle = () => {
    props.navigation.navigate('Map')
  }

  return (
    <View style={styles.locationPicker}>
      <MapPreview style={styles.mapPreview} location={pickedLocation} onPress={pickOnMapHandle} >
        {isFecthingState ? (
          <ActivityIndicator size="small" color={Colors.accent} />
        ) : (
          <Text>No location chosen yet.</Text>
        )}
      </MapPreview>
      <View  style={styles.actions}>
      <Button
        title="Get User Location"
        color={Colors.accent}
        onPress={getLocationHandler}
      />
      <Button
        title="Pick on Map"
        color={Colors.accent}
        onPress={pickOnMapHandle}
      />
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  }
});
