import React, { useEffect, useState } from "react";
import { View, StatusBar, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SplashScreen from "expo-splash-screen";
import Ingresos from "./src/screens/Ingresos.js";
import Egresos from "./src/screens/Egresos.js";
import StepsScreen from "./src/screens/StepsScreen.js";
import DataScreen from "./src/screens/Data.js";
import Service from "./src/screens/Service.js";
import Registrar from "./src/screens/Registrar.js";

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

const App = () => {
  const steps = [
    { step: 1, title: "Ingresos" },
    { step: 2, title: "Egresos" },
    { step: 3, title: "Data" },
    { step: 4, title: "Service" },
    { step: 5, title: "Registrar" },
  ];

  const [appIsReady, setAppIsReady] = useState(false);
  const [savedData, setSavedData] = useState([]); // Inicializar savedData como un array vacío

  useEffect(() => {
    const prepareApp = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    };

    prepareApp();
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
          <Stack.Screen name="Ingresos">
            {(props) => <Ingresos {...props} savedData={savedData} />}
          </Stack.Screen>
          <Stack.Screen name="Egresos" component={Egresos} />
          <Stack.Screen name="Data" component={DataScreen} />
          <Stack.Screen name="Service" component={Service} />
          <Stack.Screen name="Registrar" component={Registrar} />
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
