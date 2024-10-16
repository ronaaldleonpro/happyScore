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

const Ingresos = ({ step, title, description, onNextStep, navigation, savedData, setSavedData }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null); // Cambiar valor inicial a null
  const [items, setItems] = useState([
    { label: "Salario", value: "salario" },
    { label: "Negocio propio", value: "negocioPropio" },
    { label: "Pensiones", value: "pensiones" },
    { label: "Remesas", value: "remesas" },
    { label: "Ingresos varios", value: "ingresosVarios" },
  ]);
  const [number, onChangeNumber] = useState("");
  const [shouldNavigate, setShouldNavigate] = useState(false); // Nuevo estado para manejar la navegación

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
  
      const existingEntryIndex = savedData.findIndex((item) => item.label === selectedItem.label);
  
      if (existingEntryIndex !== -1) {
        const updatedData = [...savedData];
        updatedData[existingEntryIndex] = newEntry;
        setSavedData(updatedData);
      } else {
        setSavedData([...savedData, newEntry]);
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

    // useEffect para detectar el cambio en shouldNavigate y ejecutar la navegación
    useEffect(() => {
      if (shouldNavigate) {
        navigation.navigate("Egresos", { savedData }); 
        setShouldNavigate(false); // Resetear la variable para evitar loops
      }
    }, [shouldNavigate, savedData]);

  return (
    <View style={styles.containerView}>
      <Text style={styles.stepText}>{title}</Text>
      {step === 1 && (
        <View style={styles.dropdownContainer}>
          <TextInput style={styles.dropDownTitle}>Tipo de ingreso</TextInput>
          <View style={styles.dropDownElement}>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              placeholder="Selecciona una opción"
              placeholderStyle={styles.placeholderStyle}
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
            <TextInput style={styles.inputAmountTitle}>Monto</TextInput>
            <TextInput
              style={styles.inputAmout}
              onChangeText={onChangeNumber}
              value={number}
              placeholder="$"
              placeholderTextColor="#FFF"
              keyboardType="numeric"
            />
          </View>
        </View>
      )}
      <Text style={styles.descriptionText}>{description}</Text>
      <TouchableOpacity onPress={handleContinue} style={styles.btnContinuarContainer}>
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

export default Ingresos;
