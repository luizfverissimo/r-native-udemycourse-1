import React from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";

import DefaultStyles from "../constants/default-styles";
import Colors from "../constants/colors";
import MainButton from "../components/MainButton";

const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.title}>The Game is Over!</Text>
      <View style={styles.imageContainer}>
        <Image
          //source={require("../assets/success.png")} localmente
          source={{
            uri:
              "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
          }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={DefaultStyles.bodyText}>
          Your phone needed{" "}
          <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to
          guess the number{" "}
          <Text style={styles.highlight}>{props.userNumber}</Text>.
        </Text>
      </View>
      <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
    </View>
  );
};

export default GameOverScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: 30,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  textContainer: {
    marginVertical: 20,
    marginHorizontal: 40,
  },

  highlight: {
    color: Colors.primary,
    fontFamily: "open-sans-bold",
  },
});
