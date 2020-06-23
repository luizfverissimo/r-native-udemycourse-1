import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";

import DefaultStyles from "../constants/default-styles";
import Colors from "../constants/colors";
import MainButton from "../components/MainButton";

const GameOverScreen = (props) => {
  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="postition" keyboardVerticalOffset={30}>
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
              <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds
              to guess the number{" "}
              <Text style={styles.highlight}>{props.userNumber}</Text>.
            </Text>
          </View>
          <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default GameOverScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },

  imageContainer: {
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").width * 0.7,
    borderRadius: (Dimensions.get("window").width * 0.7) / 2,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: Dimensions.get("window").height / 30,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  textContainer: {
    marginVertical: Dimensions.get("window").height / 60,
    marginHorizontal: 40,
  },

  highlight: {
    color: Colors.primary,
    fontFamily: "open-sans-bold",
  },
});
