import React from 'react'
import { Platform, Text } from 'react-native'
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { Ionicons } from '@expo/vector-icons'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

import CatecoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import FavoritesScreen from '../screens/FavoriteScreen'
import FiltersScreen from '../screens/FiltersScreen'

import Colors from "../constants/Colors";


/* ------------------------------ Header style ------------------------------ */

const defautStackNavOptions = {
    headerStyle: {
      backgroundColor: Colors.primaryColor,
    },
    headerTitleStyle: {
      fontFamily: 'open-Sans-Bold'
    },
    headerBackTitleStyle: {
      fontFamily: 'open-Sans'
    },
    headerTintColor: "white",
}

/* ---------------------- Navegador da Stack Principal ---------------------- */

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
      tabBarColor: Colors.primaryColor,
      tabBarLabel: Platform.OS === 'android'? <Text style={{fontFamily: 'open-Sans-Bold'}} >Meals</Text> : <Text>Meals</Text>
    }
  },
  Favorites: {
    screen: FavNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor}/>
      },
      tabBarColor: Colors.accentColor,
      tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-Sans-Bold'}} >Favorites</Text> : <Text>Favorites</Text>
    }
  }
}

const MealsFavTabNavigator = Platform.OS === 'android' ? createMaterialBottomTabNavigator(tabScreenConfig, {
  activeColor: 'white',
  shifting: true
})
: createBottomTabNavigator(tabScreenConfig ,{
  tabBarOptions: {
    labelStyle: {
      fontFamily: 'open-Sans-Bold'
    },
    activeTintColor: Colors.accentColor
  }
})

/* ------------------------- Filter Stack Navigator ------------------------- */

const FiltersNavigator = createStackNavigator({
  Filters: FiltersScreen
}, {
  navigationOptions: {
    drawerLabel: 'Filter'
  },
  defaultNavigationOptions: defautStackNavOptions
})


/* ---------------------------- Drawer navigator ---------------------------- */

const MainNavigator = createDrawerNavigator({
  MealsFavs: {
    screen: MealsFavTabNavigator,
    navigationOptions: {
      drawerLabel: 'Meals'
    }
  },
  Filters: FiltersNavigator
}, {
  contentOptions: {
    activeTintColor: Colors.accentColor,
    labelStyle: {
      fontFamily: 'open-Sans-Bold'
    }
  }
})

export default createAppContainer(MainNavigator);
