import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { enableScreens } from "react-native-screens";

/* --------------------------- imported components -------------------------- */

import MealsNavigator from "./navigation/MealsNavigator";

/* --------------------- Função para importar as fontes --------------------- */

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

/* --------------------------------- Funções -------------------------------- */
enableScreens(); //melhora a performance - libera nativamente

/* -------------------------------- Component ------------------------------- */

export default function App() {
  /* -------------------- Verifica se a fonte foi carregada ------------------- */

  const [fontLoaded, setFontLoaded] = useState(false);
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  /* -------------------------- Conteúdo renderizado -------------------------- */

  return <MealsNavigator />;
}

const styles = StyleSheet.create({});
