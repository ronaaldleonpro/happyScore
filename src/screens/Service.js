import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const DataScreen = ({ route, navigation }) => {
  const { savedData } = route.params; // Obtener los datos guardados

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Servicios</Text>
      {savedData && savedData.length > 0 ? (
        savedData.map((data, index) => (
          <Text key={index} style={styles.item}>
            {data.type}: {data.amount}
          </Text>
        ))
      ) : (
        <Text>No hay datos guardados</Text>
      )}
      <TouchableOpacity
        onPress={() => navigation.navigate("StepsScreen")}
        style={styles.btnContinuarContainer}
      >
        <Text style={styles.btnContinuar}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  item: {
    fontSize: 18,
    marginVertical: 5,
  },
});

export default DataScreen;
