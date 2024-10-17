import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert, // Importar el componente Alert
  ScrollView,
} from "react-native";

const Registrar = ({
  route,
  step,
  title,
  description,
  onNextStep,
  navigation,
}) => {
  const { savedData } = route.params || {}; // Asegúrate de que savedIngresos exista
  const [savedEgresos, setSavedEgresos] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Alquiler/Hipoteca", value: "alquilerHipoteca" },
    { label: "Canasta básica", value: "canastaBasica" },
    { label: "Financiamiento", value: "financiamiento" },
    { label: "Transporte", value: "transporte" },
    { label: "Servicios públicos", value: "serviciosPublicos" },
    { label: "Salud y seguro", value: "saludSeguro" },
    { label: "Egresos varios", value: "egresosVarios" },
  ]);
  const [number, onChangeNumber] = useState("");
  const [shouldNavigate, setShouldNavigate] = useState(false);

  const handleContinue = () => {
    if (!value || !number) {
      Alert.alert("Error", "Por favor selecciona una opción y coloca un monto");
      return;
    }

    // Buscar el item seleccionado por su value
    const selectedItem = items.find((item) => item.value === value);

    if (selectedItem) {
      // Guardar el label en lugar del value
      const newEntry = { label: selectedItem.label, amount: number };

      const existingEntryIndex = savedEgresos.findIndex(
        (item) => item.label === selectedItem.label
      );

      if (existingEntryIndex !== -1) {
        const updatedData = [...savedEgresos];
        updatedData[existingEntryIndex] = newEntry;
        setSavedEgresos(updatedData);
      } else {
        setSavedEgresos([...savedEgresos, newEntry]);
      }

      Alert.alert(
        "Confirmar",
        "¿Deseas llenar otro campo?",
        [
          {
            text: "Sí",
            onPress: () => {
              setValue(null); // Restablece el valor seleccionado
              onChangeNumber(""); // Restablece el input numérico
            },
          },
          {
            text: "No",
            onPress: () => setShouldNavigate(true),
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
    }
  };

  useEffect(() => {
    if (shouldNavigate) {
      navigation.navigate("Data", { savedData, savedEgresos });
      setShouldNavigate(false);
    }
  }, [shouldNavigate, savedEgresos]);

  return (
    <View style={styles.containerView}>
      <Text style={styles.stepText}>Registro</Text>
      <ScrollView style={styles.scrollContainer}>
      <View style={styles.registroContainer}>
        <View style={styles.inputElements}>
          <Text style={styles.inputTitles}>Detalle del producto</Text>
          <TextInput
            style={styles.inputDetails}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="Detalle del producto"
            placeholderTextColor="#808080"
            keyboardType="text"
          />

          <Text style={styles.inputTitles}>Nombre completo</Text>
          <TextInput
            style={styles.inputDetails}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="Nombre completo"
            placeholderTextColor="#808080"
            keyboardType="text"
          />

          <Text style={styles.inputTitles}>
            Fotografía de carné de la persona
          </Text>
          <TextInput
            style={styles.inputDetails}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="Fotografía de carné de la persona"
            placeholderTextColor="#808080"
            keyboardType="text"
          />

          <Text style={styles.inputTitles}>
            Fotografía selfie de la persona
          </Text>
          <TextInput
            style={styles.inputDetails}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="Fotografía selfie de la persona"
            placeholderTextColor="#808080"
            keyboardType="text"
          />

          <Text style={styles.inputTitles}>Dirección</Text>
          <TextInput
            style={styles.inputDetails}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="Dirección"
            placeholderTextColor="#808080"
            keyboardType="text"
          />

          <Text style={styles.inputTitles}>Teléfono</Text>
          <TextInput
            style={styles.inputDetails}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="Teléfono"
            placeholderTextColor="#808080"
            keyboardType="text"
          />

          <Text style={styles.inputTitles}>ID de notificación push</Text>
          <TextInput
            style={styles.inputDetails}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="ID de notificación push"
            placeholderTextColor="#808080"
            keyboardType="text"
          />
        </View>
      </View>
      </ScrollView>
      <Text style={styles.descriptionText}>{description}</Text>
      <TouchableOpacity
        onPress={handleContinue}
        style={styles.btnContinuarContainer}
      >
        <Text style={styles.btnContinuar}>Continuar</Text>
      </TouchableOpacity>
      {/*<TouchableOpacity onPress={onNextStep} style={styles.btnSalirContainer}>
        <Text style={styles.btnSalir}>Salir</Text>
      </TouchableOpacity>*/}
    </View>
  );
};

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    height: "100%",
    backgroundColor: "#161F26",
    alignItems: "center",
    justifyContent: "space-around",
  },
  scrollContainer:{
    flex: 2,
    width: "90%",
  },
  registroContainer: {
    width: "100%",
    alignItems: "center",
  },
  stepText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFF",
  },
  descriptionText: {
    textAlign: "center",
    color: "#FFF",
  },
  inputElements: {
    width: "100%",
    height: "auto",
    alignItems: "center",
    marginTop: 0,
  },
  inputTitles: {
    color: "#FFF",
    marginBottom: 5,
    marginTop: 15,
    fontSize: 20,
    fontWeight: "bold",
  },
  inputDetails: {
    height: 45,
    width: "100%",
    borderWidth: 1,
    borderColor: "#BFA77A",
    padding: 10,
    borderRadius: 5,
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
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
  /*btnSalirContainer: {
    backgroundColor: "#BFA77A",
    height: 45,
    borderRadius: 10,
    width: 350,
    alignItems: "center",
    justifyContent: "center",
  },
  btnSalir: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 20,
  },*/
});

export default Registrar;
