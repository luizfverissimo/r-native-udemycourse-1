import React from "react";
import { StyleSheet, Image, View } from "react-native";

import { API_KEY } from "react-native-dotenv";

const MapPreview = (props) => {
  let imagePreviewUrl 

  if (props.location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${props.location.lat},${props.location.lng}&key=${API_KEY}`;
  }

  return (
    <View style={{...styles.mapPreview, ...props.style}}>
        {props.location ? <Image style={styles.mapImage} source={{uri: imagePreviewUrl }}/> : props.children}
      </View>
  )
}

export default MapPreview;

const styles = StyleSheet.create({
  mapPreview: {
    alignItems: "center",
    justifyContent: "center",
  },
  mapImage: {
    width: '100%',
    height: '100%'
  }
});
