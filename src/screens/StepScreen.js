import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import NumericInput from "react-native-numeric-input";

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

  // Mostrar el DropDownPicker solo en el paso específico indicado por combox
  const shouldShowDropDownPicker = step === 1;
  const shouldShowDropDownPicker2 = step === 2;

  return (
    <View style={styles.containerView}>
      <Text style={styles.stepText}>{title}</Text>
      {shouldShowDropDownPicker && (
        <View style={styles.dropdownContainer}>
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
              fontSize: 15,
              fontWeight: 'bold',
              color: '#FFF',
              borderColor: '#BFA77A'
            }}

            labelStyle={{
              fontSize: 15,
              fontWeight: 'bold',
              color: '#FFF',
            }}
            
            
            style={styles.dropdownOptions}


            arrowIconStyle={styles.arrowIconStyle}
            tickIconStyle={styles.tickIconStyle}

            dropDownContainerStyle={styles.dropDownContainerStyle}
            listItemContainerStyle={styles.listItemContainerStyle}
            selectedItemContainerStyle={styles.selectedItemContainerStyle}
            activeItemLabelStyle={styles.activeItemLabelStyle}

          />

          <NumericInput
            onChange={setValue}
            minValue={0}
            maxValue={100}
            step={1}
            totalWidth={200}
            totalHeight={50}
            iconSize={0} // Desactiva los íconos predeterminados
            rounded
          />
        </View>
      )}
      <Text style={styles.descriptionText}>{description}</Text>
      <Button title="Siguiente" onPress={onNextStep} />
    </View>
  );
};

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    height: "100%",
    backgroundColor: "#161F26",
    alignItems: "center"
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFF",
    alignContent: "center"
  },
  dropdownContainer: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  dropDownContainerStyle: {
    width: "100%",
    backgroundColor: "#161F26",
    borderColor: "#BFA77A",
    color: "#FFF",
    borderRadius: 0
  },
  listItemContainerStyle:{
    borderBottomColor:"#BFA77A",
    borderBottomWidth: 1,
  },
  selectedItemContainerStyle:{
    backgroundColor:"#BFA77A"
  },
  placeholderStyle:{
    color: "#FFF",
    fontWeight: 'bold',
    fontSize: 15,
  },
  activeItemLabelStyle:{
    backgroundColor:"#BFA77A"
  },
  dropdownOptions: {
    width: "100%",
    color: "#FFF",
    borderRadius: 0,
    borderColor: "#BFA77A",
    backgroundColor: "#161F26",
  },
  arrowIconStyle:{
    tintColor: "#FFF",
    borderwidth: 10
  },
  tickIconStyle:{
    tintColor: "#FFF",
    borderwidth: 10
  },
  labelStyle: {
    color: "#fff"
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
    fontSize: 14,
  },
  containerFormik: {
    backgroundColor: "#BFA77A",
    height: "100%",
  },
});

export default StepScreen;
