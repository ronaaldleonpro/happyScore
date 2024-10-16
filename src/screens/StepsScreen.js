import React from 'react';
import Ingresos from './Ingresos';

const StepsScreen = ({ steps, navigation, savedData, setSavedData }) => {
  const [currentStep, setCurrentStep] = React.useState(0);

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Si estamos en el último paso, podemos navegar a otra pantalla o reiniciar los pasos
      navigation.navigate('Data'); // Navegar a la pantalla de datos, o reiniciar
      setCurrentStep(0);
    }
  };

  return (
    <Ingresos
      step={steps[currentStep].step}
      description={steps[currentStep].description}
      title={steps[currentStep].title}
      onNextStep={handleNextStep}
      navigation={navigation} // Asegúrate de pasar la navegación también
      savedData={savedData} // Agregar esta línea
      setSavedData={setSavedData} // Agregar esta línea
    />
  );
};

export default StepsScreen;
