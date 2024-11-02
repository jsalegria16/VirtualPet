
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNfc } from '../../context/NfcContext'; // Importa el contexto

const AddMedicationForm = () => {
  const { medName, setMedName, times, setTimes, handleAddMedication } = useNfc();
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || times;
    setShowTimePicker(false);
    setTimes(currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Agregar medicamento</Text>
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
            {times ? times : 'Seleccionar hora'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleAddMedication}>
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
  },
  form: {
    width: '80%',
  },
  label: {
    marginTop: 20,
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


// import React, { useState } from 'react';
// import { View, Text, TextInput, Button,  StyleSheet, TouchableOpacity, Image} from 'react-native';
// import DateTimePicker from "@react-native-community/datetimepicker"; //https://github.com/react-native-datetimepicker/datetimepicker?tab=readme-ov-file#mode-optional

// import { useNfc } from '../../context/NfcContext'; // Importa el contexto

// const AddMedicationForm = () => {

//   const {medName,setMedName,times,setTimes, handleAddMedication, loadMedRegiment, medications,} = useNfc(); // Cotexto
  
//   const [showTimePicker, setShowTimePicker] = useState(false);

//   const onTimeChange = (event, selectedTime) => {
//     const currentTime = selectedTime || times;
//     setShowTimePicker(false);
//     setTimes(currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })); // Actualiza el valor en formato HH:MM
//   };

//   return (
//     <View style={styles.container}>
//         <View style={styles.form}>
//             <Text style={styles.label}>Agregar medicamento</Text>
//             <TextInput
//             style={styles.input}
//             placeholder="Ingresa un medicamento"
//             value={medName}
//             onChangeText={setMedName}
//             />
//             <Text style={styles.label}>Hora</Text>
//             <TouchableOpacity style={styles.input} onPress={() => setShowTimePicker(true)}>
//                 {/* <TextInput
//                 style={styles.input}
//                 placeholder="Ingresa la hora"
//                 value={times}
//                 onChangeText={setTimes}
//                 /> */}
//                 <Text> {times ? times : 'Seleccionar hora'}</Text>
//             </TouchableOpacity>
            
//             <TouchableOpacity style={styles.button} onPress={() => handleAddMedication()}>
//             <Text style={styles.buttonText}>Agregar medicamento</Text>
//             </TouchableOpacity>

//         </View>

//         <View style={styles.container}>
//             {
//                 showTimePicker && (
//                 <DateTimePicker
//                   value={new Date()}
//                   mode={"time"}
//                   is24Hour={false}
//                   display="spinner"
//                   onChange={onTimeChange}
//                 />
//                 )
//             }
//         </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       alignItems: 'center',
//       justifyContent: 'space-around',
//       backgroundColor:'#fff',
//     },
//     form: {
//       width: '80%',
//     },
//     label: {
//       marginTop: 20,
//       marginBottom:5,
//       fontSize: 24,
//       fontWeight: 'bold',
//       color:'black',
//     },
//     input: {
//       borderColor: '#ccc',
//       borderWidth: 1,
//       borderRadius: 5,
//       padding: 10,
//       fontSize: 18,
//       color: 'black'
//     },
//     button: {
//       marginTop: 20,
//       backgroundColor: '#1E90FF',
//       borderRadius: 5,
//       paddingVertical: 10,
//       paddingHorizontal: 20,
//     },
//     buttonText: {
//       color: '#fff',
//       fontSize: 18,
//       textAlign:'center',
//     },
//   });
  

// export default AddMedicationForm;


// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';

// import { useNfc } from '../../context/NfcContext'; // Importa el contexto

// const AddMedicationForm = () => {
//   const { medName, setMedName, times, setTimes, handleAddMedication, loadMedRegiment, medications } = useNfc(); // Contexto
  
//   const [showTimePicker, setShowTimePicker] = useState(false);

//   const onTimeChange = (event, selectedTime) => {
//     const currentTime = selectedTime || times;
//     setShowTimePicker(false);
//     setTimes(currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })); // Actualiza el valor en formato HH:MM
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.form}>
//         <Text style={styles.label}>Agregar medicamento</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Ingresa un medicamento"
//           value={medName}
//           onChangeText={setMedName}
//         />

//         <Text style={styles.label}>Hora</Text>
//         <TouchableOpacity style={styles.input} onPress={() => setShowTimePicker(true)}>
//           <Text>{times ? times : 'Seleccionar hora'}</Text>
//         </TouchableOpacity>
        
//         {showTimePicker && (
//           <DateTimePicker
//             value={new Date()} // Puedes ajustar esto al valor que tengas por defecto
//             mode="time"
//             is24Hour={true}
//             display="default"
//             onChange={onTimeChange}
//           />
//         )}

//         <TouchableOpacity style={styles.button} onPress={() => handleAddMedication()}>
//           <Text style={styles.buttonText}>Agregar medicamento</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'space-around',
//     backgroundColor: '#fff',
//   },
//   form: {
//     width: '80%',
//   },
//   label: {
//     marginTop: 20,
//     marginBottom: 5,
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: 'black',
//   },
//   input: {
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 5,
//     padding: 10,
//     fontSize: 18,
//   },
//   button: {
//     marginTop: 20,
//     backgroundColor: '#1E90FF',
//     borderRadius: 5,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     textAlign: 'center',
//   },
// });

// export default AddMedicationForm;


