import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import NumericInput from "react-native-numeric-input";
import Icon from 'react-native-vector-icons/MaterialIcons';

const StepScreen = ({ step, title, description , onNextStep }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("salario");
  const [items, setItems] = useState([
    { label: "Salario", value: "salario" },
    { label: "Negocio Propio", value: "negocioPropio" },
    { label: "Pensiones", value: "pensiones" },
    { label: "Remesas", value: "remesas" },
    { label: "Ingresos Varios", value: "ingresosVarios" },
    
  ]);

  // Mostrar el DropDownPicker solo en el paso específico indicado por combox
  const shouldShowDropDownPicker = step === 1;

  return (
    <View style={styles.container}>
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
            theme="DARK"
            mode="BADGE"
            badgeDotColors={[
              "#e76f51",
              "#00b4d8",
              "#e9c46a",
              "#e76f51",
              "#8ac926",
              "#00b4d8",
              "#e9c46a",
            ]}
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownInnerContainer}
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
  container: {
    flex: 1,
    justifyContent: "justify",
    alignItems: "justify",
    paddingHorizontal: 20,
  },
  stepText: {
    fontSize: 24,
    marginBottom: 10,
  },
  descriptionText: {
    textAlign: "center",
    marginBottom: 20,
  },
  dropdownContainer: {
    marginTop: 20, // Espacio adicional arriba del DropDownPicker
    width: '100%', // Asegura que el contenedor del dropdown ocupe el ancho completo
    alignItems: 'center', // Centra el DropDownPicker horizontalmente
  },
  dropdown: {
    width: 200, // Ancho del DropDownPicker
    marginBottom: 10, // Espacio debajo del DropDownPicker
  },
  dropdownInnerContainer: {
    width: 200, // Asegura que el contenedor del dropdown tenga el mismo ancho
  },
});

export default StepScreen;