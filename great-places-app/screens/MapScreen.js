import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = (props) => {
  const initialLocation = props.navigation.getParam("initialLocation");
  const readOnly = props.navigation.getParam("readOnly");

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const mapRegion = {
    latitude:  initialLocation ? initialLocation.lat : 37.78,
    longitude:  initialLocation ? initialLocation.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectionLocationHandler = (event) => {
    if (readOnly) {
      return;
    }
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });
  };

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      //could show an alert
      return;
    }
    props.navigation.navigate("NewPlace", {
      pickedLocation: selectedLocation,
    });
  }, [selectedLocation]);

  useEffect(() => {
    props.navigation.setParams({ savedLocation: savePickedLocationHandler });
  }, [savePickedLocationHandler]);

  let markedCoordinates;
  if (selectedLocation) {
    markedCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    };
  }

  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={selectionLocationHandler}
    >
      {markedCoordinates && (
        <Marker title="Picked Location" coordinate={markedCoordinates}></Marker>
      )}
    </MapView>
  );
};

MapScreen.navigationOptions = (navData) => {
  const saveFn = navData.navigation.getParam("savedLocation");
  const readOnly = navData.navigation.getParam("readOnly");
  return {
    headerTitle: readOnly ? 'Location' : "Pick on Map",
    headerRight: () => {
      if (readOnly) {
        return;
      }

      return (
        <TouchableOpacity style={styles.headerButton} onPress={saveFn}>
          <Text style={styles.headerButtonText}>SAVE</Text>
        </TouchableOpacity>
      );
    },
  };
};

export default MapScreen;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },

  headerButton: {
    marginHorizontal: 20,
  },
  headerButtonText: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
  },
});
