import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

const Data = ({ route }) => {
  // Asegúrate de que estamos recibiendo los datos correctamente
  const { savedData = [], savedEgresos = [] } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumen de Ingresos y Egresos</Text>

      <Text style={styles.sectionTitle}>Ingresos</Text>
      <FlatList
        data={savedData}
        keyExtractor={(item) => item.label}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemLabel}>{item.label}:</Text>
            <Text style={styles.itemAmount}>${item.amount}</Text>
          </View>
        )}
      />

      <Text style={styles.sectionTitle}>Egresos</Text>
      <FlatList
        data={savedEgresos}
        keyExtractor={(item) => item.label}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemLabel}>{item.label}:</Text>
            <Text style={styles.itemAmount}>${item.amount}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#161F26",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#BFA77A",
    marginVertical: 10,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  itemLabel: {
    fontSize: 18,
    color: "#FFF",
  },
  itemAmount: {
    fontSize: 18,
    color: "#FFF",
  },
});

export default Data;
