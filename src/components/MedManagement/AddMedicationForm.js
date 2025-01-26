
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNfc } from '../../context/NfcContext'; // Importa el contexto

const AddMedicationForm = () => {
  const { medName, setMedName, times, setTimes, handleAddMedication, userId } = useNfc();
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || times;
    setShowTimePicker(false);
    // setTimes(currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    // setTimes(currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    // Formatear la hora seleccionada en formato consistente de 12 horas con AM/PM
    const formattedTime = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(currentTime);

    // Establecer el tiempo formateado en el estado
    setTimes(formattedTime);
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Agregar medicamento </Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa un medicamento"
          placeholderTextColor="#999" // Ajuste para el color del placeholder
          value={medName}
          onChangeText={setMedName}
        />
        <Text style={styles.label}>Hora</Text>
        <TouchableOpacity style={styles.input} onPress={() => setShowTimePicker(true)}>
          <Text style={styles.text}>
            {/* {times ? times.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Seleccionar hora'} */}
            {/* {times ? new Date(times).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Seleccionar hora'} */}
            {times ? times : 'Seleccionar hora'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => handleAddMedication(userId)}>
          <Text style={styles.buttonText}>Agregar medicamento</Text>
        </TouchableOpacity>
      </View>

      {showTimePicker && (
        <DateTimePicker
          value={new Date()}
          mode="time"
          is24Hour={false}
          display="spinner"
          onChange={onTimeChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 45,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  form: {
    width: '80%',
  },
  label: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
    color: 'black', // Asegúrate de que el texto sea visible

  },
  text: {
    fontSize: 18,
    color: '#555', // Color visible para el texto de hora
  },
  button: {
    marginTop: 10,
    backgroundColor: '#1E90FF',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default AddMedicationForm;


