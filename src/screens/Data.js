import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";

const Data = ({ route, navigation }) => {
  // Asegúrate de que estamos recibiendo los datos correctamente
  const { savedData = [], savedEgresos = [] } = route.params || {};

  // Calcular la suma de los ingresos
  const totalIngresos = savedData.reduce((acc, item) => acc + parseFloat(item.amount), 0);
  
  // Calcular la suma de los egresos
  const totalEgresos = savedEgresos.reduce((acc, item) => acc + parseFloat(item.amount), 0);

  const handleContinue = () =>{
    navigation.navigate("Service", { totalIngresos, totalEgresos });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumen de Ingresos y Egresos</Text>

      {/* Mostrar lista de Ingresos */}
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

      {/* Mostrar el total de ingresos */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total Ingresos:</Text>
        <Text style={styles.totalAmount}>${totalIngresos.toFixed(2)}</Text>
      </View>

      {/* Mostrar lista de Egresos */}
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

      {/* Mostrar el total de egresos */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total Egresos:</Text>
        <Text style={styles.totalAmount}>${totalEgresos.toFixed(2)}</Text>
      </View>

      <TouchableOpacity onPress={handleContinue} style={styles.btnContinuarContainer}>
        <Text style={styles.btnContinuar}>Continuar</Text>
      </TouchableOpacity>
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
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#BFA77A",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
  btnContinuarContainer: {
    backgroundColor: "#BFA77A",
    height: 45,
    borderRadius: 10,
    width: 350,
    alignItems: "center",
    justifyContent: "center",
  },
  btnContinuar: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default Data;
