import React, {useState} from "react";
import { AppLoading } from 'expo'
import * as Font from 'expo-font'

import { composeWithDevTools } from 'redux-devtools-extension' //DELETE TO BUILD

import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import productsReducer from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";

import ShopNavigator from './navigation/ShopNavigator'




const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer
});

const store = createStore(rootReducer, composeWithDevTools()); //REMOVE COMPOSE TO BUILD

const fetchFonts = () => {
  return Font.loadAsync({
    'openSans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'openSansBold': require('./assets/fonts/OpenSans-Bold.ttf'),
  })
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false)
  if(!fontLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoaded(true)} />
  }

  return (
    <Provider store={store} >
      <ShopNavigator />
    </Provider>
  );
}
