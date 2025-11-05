import { Slot } from "expo-router";
import React from "react";
import { Dimensions, View } from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store } from "../redux/store";

export default function RootLayout() {
  const insets = useSafeAreaInsets();
  console.log(insets);
  const usableHeight = Dimensions.get("window").height - insets.top - insets.bottom;
  return (
    <SafeAreaProvider>
      <Provider store={store}>
      <View style={{ flex:1,height: usableHeight,marginBottom:insets.bottom,marginTop:insets.top,backgroundColor:'red'}}>
        <Slot />
       </View>
      </Provider>
    </SafeAreaProvider> 
  );
}