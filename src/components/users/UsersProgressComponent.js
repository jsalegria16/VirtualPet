import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UsersProgressComponent = () => {
  return (
    <View style={styles.progressContainer}>
      <Text style={styles.text}>Progreso de los Usuarios</Text>

      {/* Usuario 1 */}
      <View style={styles.userProgress}>
        <Text style={styles.userText}>Pepito Perez</Text>
        <View style={styles.progressBar}></View>
      </View>

      {/* Usuario 2 */}
      <View style={styles.userProgress}>
        <Text style={styles.userText}>Pepita Perez</Text>
        <View style={styles.progressBar}></View>
      </View>

      {/* Usuario 3 */}
      <View style={styles.userProgress}>
        <Text style={styles.userText}>Pepito Pérez</Text>
        <View style={styles.progressBar}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
  },
  userProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  userText: {
    flex: 1,
    fontSize: 16,
    color:"black"
  },
  progressBar: {
    flex: 3,
    height: 10,
    backgroundColor: '#4caf50',
    borderRadius: 5,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color:'black'
  },
});

export default UsersProgressComponent;
