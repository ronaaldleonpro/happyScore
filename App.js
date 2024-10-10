import React, { useEffect, useState } from "react";
import { View, StatusBar, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SplashScreen from "expo-splash-screen";
import StepsScreen from "./src/screens/StepsScreen";

// Evitar que la splash screen se oculte automáticamente
SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

const App = () => {
  const steps = [
    { step: 1, title: "INGRESOS" },
    { step: 2, title: "EGRESOS" },
    { step: 4, title: "ANALISIS DE CLIENTE" },
  ];

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    setAppIsReady(true);
    SplashScreen.hideAsync();
  }, []);

  if (!appIsReady) {
    return null; // Muestra pantalla en blanco mientras la splash screen está activa
  }

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="HAPPYSCORE" options={{ headerShown: false }}>
            {(props) => <StepsScreen {...props} steps={steps} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default App;