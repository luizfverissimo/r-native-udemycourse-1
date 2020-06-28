import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import DefaultText from '../components/DefaultText'
import Colors from '../constants/Colors'

const MealItem = (props) => {
  return (
    <View style={styles.mealItem}>
      <TouchableOpacity onPress={props.onSelectMeal}>
        <View>
          <View style={{ ...styles.mealRow, ...styles.mealHeader }}>
            <ImageBackground
              source={{ uri: props.image }}
              style={styles.bgImage}
            >
              <View style={styles.titleContainer}>
                <Text style={styles.title} numberOfLines={1}>
                  {props.title}
                </Text>
              </View>
            </ImageBackground>
          </View>
          <View style={{ ...styles.mealRow, ...styles.mealDetail }}>
            <DefaultText>{props.duration} m</DefaultText>
            <DefaultText>{props.complexity.toUpperCase()}</DefaultText>
            <DefaultText>{props.affordability.toUpperCase()}</DefaultText>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default MealItem;

const styles = StyleSheet.create({
  mealItem: {
    marginVertical: 10,
    height: 200,
    width: "100%",
    backgroundColor: "#ebebeb",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 4,
  },

  bgImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },

  titleContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  title: {
    fontFamily: "open-Sans-Bold",
    fontSize: 20,
    color: "white",
    paddingVertical: 5,
    paddingHorizontal: 12,
    textAlign: "center",
  },

  mealRow: {
    flexDirection: "row",
  },

  mealHeader: {
    height: "85%",
  },

  mealDetail: {
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
    height: "15%",
  },
});
