import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";
import React from "react";
import { Dimensions, View } from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store } from "../redux/store";
export default function RootLayout() {
  const insets = useSafeAreaInsets();
  const usableHeight = Dimensions.get("window").height - insets.top - insets.bottom;
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
    <SafeAreaProvider>
      <Provider store={store}>
      <View style={{ flex:1,height: usableHeight,marginBottom:insets.bottom,marginTop:insets.top}}>
        <Slot />
       </View>
      </Provider>
    </SafeAreaProvider> 
    </QueryClientProvider>
  );
}