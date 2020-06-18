import React from "react";
import { StyleSheet, View } from "react-native";

/* -------------------- imported componentes and screens -------------------- */

import Header from "./components/Header";
import StartGameScreen from "./screens/StarGameScreen";

/* ------------------------------- Render APP ------------------------------- */

export default function App() {
  return (
    <View style={styles.screen}>
      <Header title="Guess A Number" />
      <StartGameScreen />
    </View>
  );
}

/* --------------------------------- styles --------------------------------- */

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
