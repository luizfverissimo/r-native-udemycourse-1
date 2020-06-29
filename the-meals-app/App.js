import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { enableScreens } from "react-native-screens";

/* ---------------------------------- Redux --------------------------------- */

import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import mealsReducer from "./store/reducers/meals";

/* ------------------------------ Custom fonts ------------------------------ */

import {
  useFonts,
  OpenSans_400Regular,
  OpenSans_700Bold,
} from "@expo-google-fonts/open-sans";

/* --------------------------- imported components -------------------------- */

import MealsNavigator from "./navigation/MealsNavigator";

/* --------------------- Função para importar as fontes --------------------- */

const fetchFonts = () => {
  return Font.loadAsync({
    "open-Sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-Sans-Bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

/* --------------------------------- Funções -------------------------------- */
enableScreens(); //melhora a performance - libera nativamente

/* ------------------------------ Create Store ------------------------------ */
//Combina multiplos reducers em um só para cria o armazenamento
const rootReducers = combineReducers({
  meals: mealsReducer,
});
const store = createStore(rootReducers);

/* -------------------------------- Component ------------------------------- */

export default function App() {
  /* -------------------- Verifica se a fonte foi carregada ------------------- */

  const [dataLoaded, setDataLoaded] = useState(false);
  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  /* -------------------------- Conteúdo renderizado -------------------------- */

  return (
    <Provider store={store}>
      <MealsNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({});
