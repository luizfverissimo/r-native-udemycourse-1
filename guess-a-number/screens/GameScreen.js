import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";

const generateRandomBetwenn = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetwenn(min, max, exclude);
  } else {
    return rndNum;
  }
};

const GameScreen = (props) => {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetwenn(1, 100, props.userChoice)
  );
  const [rounds, setRounds] = useState(0);

  //useRef armazena dados que sobrevivem a cada rerender
  const currentLow = useRef(1);
  const currentHight = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(rounds);
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
      currentLow.current = currentGuess; //set o valor falado como valor mínimo
    }

    const nextNumber = generateRandomBetwenn(
      currentLow.current,
      currentHight.current,
      currentGuess
    );

    setCurrentGuess(nextNumber);
    setRounds((curRounds) => curRounds + 1);
  };

  return (
    <View style={styles.screen}>
      <Text>Opponet's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title="LOWER" onPress={() => nextGuessHandler("lower")} />
        <Button title="GREATER" onPress={() => nextGuessHandler("greater")} />
      </Card>
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
    marginTop: 20,
    width: 300,
    maxWidth: "80%",
  },
});
