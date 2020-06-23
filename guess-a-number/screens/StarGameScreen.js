import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
} from "react-native";

/* -------------------- imported components and screens -------------------- */

import DefaultStyles from "../constants/default-styles";
import Card from "../components/Card";
import Colors from "../constants/colors";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import MainButton from "../components/MainButton";

const StarGameScreen = (props) => {
  /* ---------------------------------- State --------------------------------- */

  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  /* --------- portabilidade para diferentes tamanhos de dispositivos --------- */
  const [buttonWidth, setButtonWidth] = useState(
    Dimensions.get("window").width / 4
  );

  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get("window").width / 4);
    };

    Dimensions.addEventListener("change", updateLayout);

    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });

  /* -------------------------------- Functions ------------------------------- */
  //adiciona o valor no state
  const numberInputHandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };

  //Apaga o valor do input e do state
  const resetInputHandler = () => {
    setEnteredValue("");
    setConfirmed(false);
  };

  //confirma o valor para iniciar o jogo e realiza uma validação do valor
  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        "Invalid number!",
        "Number has to be a number between 1 and 99",
        [{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
      );
      return;
    }

    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue("");
    Keyboard.dismiss();
  };

  //se foi confirmado, surge o card com o número selecionado e o botão para inciar o jogo
  let confirmedOutput;
  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text style={DefaultStyles.bodyText}>You Selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton onPress={() => props.onStartGame(selectedNumber)}>
          START GAME
        </MainButton>
      </Card>
    );
  }

  return (
    <ScrollView>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.screen}>
          <Text style={styles.title}>Start a New Game!</Text>
          <Card style={styles.inputContainer}>
            <Text style={DefaultStyles.bodyText}>Select a Number</Text>
            <Input
              style={styles.input}
              blurOnSubmit
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="number-pad"
              maxLength={2}
              onChangeText={numberInputHandler}
              value={enteredValue}
            />
            <View style={styles.buttonContainer}>
              <View style={{ width: buttonWidth }}>
                <Button
                  title="Reset"
                  color={Colors.accent}
                  onPress={resetInputHandler}
                />
              </View>
              <View style={{ width: buttonWidth }}>
                <Button
                  title="Confirm"
                  color={Colors.primary}
                  onPress={confirmInputHandler}
                />
              </View>
            </View>
          </Card>
          {confirmedOutput}
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default StarGameScreen;

/* --------------------------------- Styles --------------------------------- */

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },

  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: "open-sans-bold",
  },

  inputContainer: {
    width: "80%",
    maxWidth: "95%",
    minWidth: 300,
    alignItems: "center",
  },

  input: {
    width: 50,
    textAlign: "center",
    fontFamily: "open-sans",
  },

  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },

  /* button: {
    width: Dimensions.get("window").width / 4,
  }, */

  summaryContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});
