import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";

const Service = ({ route, navigation }) => {
  const { totalIngresos = 0, totalEgresos = 0 } = route.params || {};

  // Comparar los ingresos con los rangos
  const rangos = [
    { rango: "Rango 1: Ingresos inferiores a 360 dólares. Producto ofrecidos:- Apertura de cuenta", condition: totalIngresos <= 360 },
    { rango: "Rango 2: Ingresos superiores a 360 e inferiores a 700 dólares. Producto ofrecidos:-Apertura de cuenta-Tarjera de crédito clásica-Crédito personal hasta $2,0000", condition: totalIngresos >= 360 && totalIngresos < 700 },
    { rango: "Rango 3: Ingresos superiores a 700 e inferiores a 1200 dólares. Producto ofrecidos:-Apertura de cuenta-Tarjeta de Crédito Clásica-Tarjeta de Crédito Oro-Crédito personal hasta $8,000", condition: totalIngresos >= 700 && totalIngresos < 1200 },
    { rango: "Rango 4: Ingresos superiores a 1200 e inferiores a 3000 dólares. Producto ofrecidos:-Apertura de cuenta-Tarjeta de Crédito Clásica-Tarjeta de Crédito Oro-Tarjeta de crédito Platinum-Crédito personal hasta $25,000", condition: totalIngresos >= 1200 && totalIngresos < 3000 },
    { rango: "Rango 5: Ingresos superiores a 3000 dólares. Producto ofrecidos:-Apertura de cuenta-Tarjeta de Crédito Clásica-Tarjeta de Crédito Oro-Tarjeta de crédito Platinum-Tarjeta de crédito Black-Crédito personal hasta $50,000", condition: totalIngresos >= 3000 },
  ];

  // Filtrar los rangos en los que se encuentra el ingreso
  const rangosValidos = rangos.filter((rango) => rango.condition);

  // Verificar si los egresos son mayores que los ingresos
  const asesoramientoFinanciero = totalEgresos > totalIngresos
    ? [{ rango: "Los egresos son superiores a los ingresos:. Servicios adicionales:-Financiamiento-Consolidación de deudas-Contactar con un asesor financiero." }]
    : [];

    const handleContinue = () =>{
      navigation.navigate("Registrar");
    }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rango de Ingresos</Text>

      {/* Mostrar los rangos válidos */}
      <FlatList
        data={rangosValidos}
        keyExtractor={(item) => item.rango}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
          <Text style={styles.itemText}>{item.rango.split('.').join('\n\n').split('-').join('\n\t\t')}</Text>
          </View>
        )}
      />

      {/* Mostrar el asesoramiento financiero si aplica */}
      {asesoramientoFinanciero.length > 0 && (
        <FlatList
          data={asesoramientoFinanciero}
          keyExtractor={(item) => item.rango}
          renderItem={({ item }) => (
            <View style={styles.itemContainerWarning}>
              <Text style={styles.itemText}>{item.rango.split('.').join('\n\n').split('-').join('\n\t\t')}</Text>
            </View>
          )}
        />
      )}


      <TouchableOpacity onPress={handleContinue} style={styles.btnContinuarContainer}>
        <Text style={styles.btnContinuar}>Registrar producto</Text>
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
  itemContainer: {
    padding: 15,
    //backgroundColor: "#BFA77A",
    marginVertical: 5,
    borderRadius: 10,
  },
  itemContainerWarning: {
    padding: 15,
    //backgroundColor: "#FF4C4C", // Color de advertencia
    marginVertical: 5,
    borderRadius: 10,
  },
  itemText: {
    fontSize: 18,
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

export default Service;
