import React, { useEffect, useState } from "react";
import { View, StatusBar, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SplashScreen from "expo-splash-screen";
import StepsScreen from "./src/screens/StepsScreen.js";
import DataScreen from "./src/screens/Data.js";

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

const App = () => {
  const steps = [
    { step: 1, title: "INGRESOS" },
    { step: 2, title: "EGRESOS" },
    { step: 4, title: "ANALISIS DE CLIENTE" },
  ];

  const [appIsReady, setAppIsReady] = useState(false);
  const [savedData, setSavedData] = useState([]); // Inicializar savedData como un array vacío

  useEffect(() => {
    setAppIsReady(true);
    SplashScreen.hideAsync();
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="HAPPYSCORE" options={{ headerShown: false }}>
            {(props) => (
              <StepsScreen
                {...props}
                steps={steps}
                savedData={savedData} // Pasar savedData como prop
                setSavedData={setSavedData} // Pasar el setter como prop
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Data">
            {(props) => <DataScreen {...props} savedData={savedData} />}
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
