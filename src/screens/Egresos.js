import React, { useState, useEffect  } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert, // Importar el componente Alert
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const Egresos = ({ route, step, title, description, onNextStep, navigation }) => {
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
  
      const existingEntryIndex = savedEgresos.findIndex((item) => item.label === selectedItem.label);
  
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
      <Text style={styles.stepText}>Egresos</Text>
      <View style={styles.dropdownContainer}>
        <Text style={styles.dropDownTitle}>Tipo de egresos</Text>
        <View style={styles.dropDownElement}>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder="Selecciona una opción"
            style={styles.placeholderStyle}
            textStyle={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#FFF",
              borderColor: "#BFA77A",
            }}
            labelStyle={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#FFF",
            }}
            zIndex={1000}
            style={styles.dropdownOptions}
            arrowIconStyle={styles.arrowIconStyle}
            tickIconStyle={styles.tickIconStyle}
            dropDownContainerStyle={styles.dropDownContainerStyle}
            listItemContainerStyle={styles.listItemContainerStyle}
            selectedItemContainerStyle={styles.selectedItemContainerStyle}
            activeItemLabelStyle={styles.activeItemLabelStyle}
          />
        </View>
        <View style={styles.inputAmountElement}>
          <Text style={styles.inputAmountTitle}>Monto</Text>
          <TextInput
            style={styles.inputAmout}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="$"
            keyboardType="numeric"
          />
        </View>
      </View>
      <Text style={styles.descriptionText}>{description}</Text>
      <TouchableOpacity onPress={handleContinue} style={styles.btnContinuarContainer}>
        <Text style={styles.btnContinuar}>Continuar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onNextStep} style={styles.btnSalirContainer}>
        <Text style={styles.btnSalir}>Salir</Text>
      </TouchableOpacity>
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
  dropdownContainer: {
    width: "90%",
    alignItems: "center",
  },
  dropDownTitle:{
    color: "#FFF",
    marginBottom: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
  dropDownContainerStyle: {
    width: "100%",
    backgroundColor: "#161F26",
    borderColor: "#BFA77A",
    color: "#FFF",
    borderRadius: 5,
    zIndex: 1000,
  },
  listItemContainerStyle: {
    borderBottomColor: "#BFA77A",
    borderBottomWidth: 1,
  },
  selectedItemContainerStyle: {
    backgroundColor: "#BFA77A",
  },
  placeholderStyle: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 20,
  },
  activeItemLabelStyle: {
    backgroundColor: "#BFA77A",
  },
  dropdownOptions: {
    width: "100%",
    color: "#FFF",
    borderRadius: 0,
    borderColor: "#BFA77A",
    backgroundColor: "#161F26",
    borderRadius: 5,
    zIndex: 1000,
  },
  arrowIconStyle: {
    tintColor: "#FFF",
    borderwidth: 10,
  },
  tickIconStyle: {
    tintColor: "#FFF",
    borderwidth: 10,
  },
  labelStyle: {
    color: "#fff",
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
  inputAmountElement: {
    width: "100%",
    height: "auto",
    alignItems: "center",
    marginTop: 20,
  },
  inputAmountTitle: {
    color: "#FFF",
    marginBottom: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
  inputAmout: {
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
  btnSalirContainer: {
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
  },
});

export default Egresos;
