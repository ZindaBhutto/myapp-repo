import React from "react";
import { View, StyleSheet, Image, StatusBar } from "react-native";

const InitialScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#87CEEB" barStyle="light-content" />
      <Image
        source={require("../../assets/images/app-logo.png")} // Corrected path
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#87CEEB", // Light blue color
  },
  logo: {
    width: 150, // Adjust the size as needed
    height: 150,
  },
});

export default InitialScreen;





