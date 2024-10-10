import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const StepScreen = ({ step, title, description, onNextStep }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(false);
  const [items, setItems] = useState([
    { label: "Salario", value: "salario" },
    { label: "Negocio Propio", value: "negocioPropio" },
    { label: "Pensiones", value: "pensiones" },
    { label: "Remesas", value: "remesas" },
    { label: "Ingresos Varios", value: "ingresosVarios" },
  ]);
  const [number, onChangeNumber] = React.useState("");

  // Mostrar el DropDownPicker solo en el paso específico indicado por combox
  const shouldShowDropDownPicker = step === 1;

  return (
    <View style={styles.containerView}>
      <Text style={styles.stepText}>{title}</Text>
      {shouldShowDropDownPicker && (
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
      <TouchableOpacity
        onPress={onNextStep}
        style={styles.btnContinuarContainer}
      >
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
    //paddingTop: 50,
    justifyContent: "space-around",
  },
  dropdownContainer: {
    //marginTop: 20,
    width: "90%",
    alignItems: "center",
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

  errorText: {
    color: "red",
    fontSize: 20,
  },
  containerFormik: {
    backgroundColor: "#BFA77A",
    height: "100%",
  },
  dropDownTitle: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  dropDownElement: {
    marginTop: 20,
    //marginBottom: 20,
  },
  inputAmountElement: {
    width: "100%",
    height: "auto",
    alignItems: "center",
    marginTop: 20,
    //marginBottom: 20,
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
    //marginTop: 40,
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
    //marginTop: 40,
  },
  btnSalir: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default StepScreen;
