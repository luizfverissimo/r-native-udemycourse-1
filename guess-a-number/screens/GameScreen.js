import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

/* -------------------- imported components and screens -------------------- */

import DefaultStyles from "../constants/default-styles";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import MainButton from "../components/MainButton";
import Colors from "../constants/colors";

/* ---------------------------- funções externas ---------------------------- */

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const renderListItem = (value, numOfRound) => {
  return (
    <View key={value} style={styles.listItem}>
      <Text style={DefaultStyles.bodyText}>#{numOfRound}</Text>
      <Text style={DefaultStyles.bodyText}>{value}</Text>
    </View>
  );
};

const GameScreen = (props) => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);

  //useRef armazena dados que sobrevivem a cada rerender
  const currentLow = useRef(1);
  const currentHight = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction) => {
    //valida se a dica é verdadeira
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "greater" && currentGuess > props.userChoice)
    ) {
      Alert.alert(`Don't lie!`, "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      currentHight.current = currentGuess; //set o valor falado como valor máximo
    } else {
      currentLow.current = currentGuess + 1; //set o valor falado como valor mínimo
    }

    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHight.current,
      currentGuess
    );

    setCurrentGuess(nextNumber);
    //setRounds((curRounds) => curRounds + 1);
    setPastGuesses((curPastGuesses) => [nextNumber, ...curPastGuesses]);
  };

  /* --------------------------------- render --------------------------------- */

  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.title}>Opponet's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={() => nextGuessHandler("lower")}>
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <MainButton onPress={() => nextGuessHandler("greater")}>
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) =>
            renderListItem(guess, pastGuesses.length - index)
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: Dimensions.get("window").height > 600 ? 20 : 5,
    width: 300,
    maxWidth: "80%",
  },

  listContainer: {
    width: Dimensions.get("window").width > 350 ? "60%" : "80%",
    flex: 1,
  },

  list: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },

  listItem: {
    flexDirection: "row",
    borderColor: Colors.accent,
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    justifyContent: "space-around",
    width: "100%",
  },
});
