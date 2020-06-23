import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";

/* -------------------- imported componentes and screens -------------------- */

import Header from "./components/Header";
import StartGameScreen from "./screens/StarGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

/* --------------------- Função para carregar as fontes --------------------- */

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

/* ------------------------------- Render APP ------------------------------- */

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  //Verifica se o conteúdo foi carregado, se sim, realiza onFinish
  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  //Configura o novo jogo
  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  };

  //adiciona o valor escolhido
  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };

  //guarda os rounds que demorou para responder
  const gameOverHandler = (numOfRounds) => {
    setGuessRounds(numOfRounds);
  };

  //conteúdo a ser renderizado
  let content = <StartGameScreen onStartGame={startGameHandler} />;

  //se não o jogo não for finalizado, continua renderizando o jogo
  if (userNumber && guessRounds <= 0) {
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    );
  } else if (guessRounds > 0) {
    //Após o fim do jogo, renderiza o gameOverScreen
    content = (
      <GameOverScreen
        roundsNumber={guessRounds}
        userNumber={userNumber}
        onRestart={configureNewGameHandler}
      />
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Guess A Number" />
      {content}
    </SafeAreaView>
  );
}

/* --------------------------------- styles --------------------------------- */

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
