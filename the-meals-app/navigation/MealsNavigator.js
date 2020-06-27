import React from 'react'
import { Platform } from 'react-native'
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Ionicons } from '@expo/vector-icons'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

import CatecoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import FavoritesScreen from '../screens/FavoriteScreen'
import Colors from "../constants/Colors";
import CategoriesScreen from '../screens/CategoriesScreen';

/* ---------------------- Navegador da Stack Principal ---------------------- */

const defautStackNavOptions = {
    headerStyle: {
      backgroundColor: Colors.primaryColor,
    },
    headerTintColor: "white",
}

const MealsNavigator = createStackNavigator(
  {
    Categories: {
      screen: CatecoriesScreen,
    },
    CategoryMeals: {
      screen: CategoryMealsScreen,
    },
    MealDetail: {
      screen: MealDetailScreen,
    },
  }, {
    defaultNavigationOptions: defautStackNavOptions
  });

/* -------------------- Navegador da stack dos Favoritos -------------------- */

const FavNavigator = createStackNavigator({
  Favorites: FavoritesScreen,
  MealDetail: {screen: MealDetailScreen}
}, {
  defaultNavigationOptions: defautStackNavOptions
})

/* -------------------------- Navegador Tab Bottom -------------------------- */

const tabScreenConfig = {
  Meals: {
    screen: MealsNavigator, 
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor}/>
      },
      tabBarColor: Colors.primaryColor
    }
  },
  Favorites: {
    screen: FavNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor}/>
      },
      tabBarColor: Colors.accentColor
    }
  }
}

const MealsFavTabNavigator = Platform.OS === 'android' ? createMaterialBottomTabNavigator(tabScreenConfig, {
  activeColor: 'white',
  shifting: true
})
: createBottomTabNavigator(tabScreenConfig ,{
  tabBarOptions: {
    activeTintColor: Colors.accentColor
  }
})

export default createAppContainer(MealsFavTabNavigator);
