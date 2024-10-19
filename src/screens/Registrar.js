import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
} from "react-native";
import { CameraView, Camera, useCameraPermissions } from "expo-camera"; // Importa Camera en lugar de CameraView
import * as MediaLibrary from "expo-media-library";

const Registrar = ({
  route,
  step,
  title,
  description,
  onNextStep,
  navigation,
}) => {
  const [facing, setFacing] = useState("back");
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  //const [cameraRef, setCameraRef] = useState(null);
  //const [photoUri, setPhotoUri] = useState(null);
  const [mediaLibraryPermission, requestMediaLibraryPermission] =
    MediaLibrary.usePermissions();

  const { savedData } = route.params || {};
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
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);

  // Solicitar permisos de la cámara y galería
  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryStatus = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(
        cameraStatus.status === "granted" &&
          mediaLibraryStatus.status === "granted"
      );
    })();
  }, []);

  const handleContinue = () => {
    if (!value || !number) {
      Alert.alert("Error", "Por favor selecciona una opción y coloca un monto");
      return;
    }

    const selectedItem = items.find((item) => item.value === value);
    if (selectedItem) {
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
              setValue(null);
              onChangeNumber("");
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

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  function handleOpenCamera() {
    setIsCameraVisible(true);
  }


  function handleCloseCamera() {
    setIsCameraVisible(false);
  }

  // Función para tomar una foto con la cámara trasera
  async function takePicture() {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      setIsCameraVisible(false);
      try {
        const asset = await MediaLibrary.createAssetAsync(photo.uri);
        await MediaLibrary.createAlbumAsync("Mis Fotos", asset, false);
        setPhotoUri(photo.uri);
        console.log("Foto guardada en:", photo.uri);
        Alert.alert("Foto guardada", "La foto ha sido guardada en la galería");
      } catch (error) {
        console.error("Error al guardar la foto en la galería", error);
        Alert.alert("Error", "No se pudo guardar la foto en la galería");
      }
    }
  }

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No tienes acceso a la cámara o la galería.</Text>;
  }

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

            {isCameraVisible ? (
              <CameraView
                style={styles.camera}
                facing={facing}
                ref={(ref) => setCameraRef(ref)}
              >
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.inputTitlesActionButton} onPress={toggleCameraFacing}>
                    <Text style={styles.inputTitlesAction}>Cambiar Cámara</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.inputTitlesActionButton} onPress={takePicture}>
                    <Text style={styles.inputTitlesAction}>Tomar foto</Text>
                  </TouchableOpacity>
                  {/*<TouchableOpacity style={styles.inputTitlesActionButton} onPress={takeSelfie}>
                    <Text style={styles.inputTitlesAction}>Tomar selfie</Text>
                  </TouchableOpacity>*/}
                  <TouchableOpacity style={styles.inputTitlesActionButton} onPress={handleCloseCamera}>
                    <Text style={styles.inputTitlesAction}>Cerrar Camara</Text>
                  </TouchableOpacity>
                </View>
              </CameraView>
            ) : (
              <View style={styles.buttonsFoto}>
                {/*CARNE*/}
                <Text style={styles.inputTitles}>
                  Fotografía de carné de la persona
                </Text>
                <Button
                  title="Tomar Foto"
                  onPress={handleOpenCamera}
                />
                {/*SELFIE*/}
                <Text style={styles.inputTitles}>
                  Fotografía selfie de la persona
                </Text>
                <Button
                  title="Tomar Selfie"
                  onPress={handleOpenCamera}
                />
              </View>
            )}

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

            {/*
            {photoUri && (
              <View>
                <Image
                  source={{ uri: photoUri }}
                  style={{ width: 300, height: 300 }}
                />
                <Text style={styles.photoText}>{photoUri}</Text>
              </View>
            )}
            */}
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
  scrollContainer: {
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
  inputTitlesActionButton:{
    flex:1,
    flexDirection:"row",
    justifyContent:"center",
    alignSelf:"flex-end",
    backgroundColor:"#161F26",

  },
  inputTitlesAction: {
    color: "#FFF",
    backgroundColor:"#161F26",
    margin: 0,
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonsFoto:{
    width:"100%",
    height:"auto"
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
  camera: {
    flex: 1,
    marginTop:20,
    width:"100%",
    height:300,
    flexDirection:"row",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    width:"100%",
    height:"100%",
       
  },
});

export default Registrar;
