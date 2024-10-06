import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MedicationScreen = ({ onConfirm }) => {
  const [nfcData, setNfcData] = useState(null);

  useEffect(() => {
    NfcManager.start();  // Inicializa el NFC Manager
  }, []);

  const readNfc = async () => {
    try {
      await NfcManager.requestTechnology(NfcTech.NfcA);
      const tag = await NfcManager.getTag();
      console.log('Etiqueta NFC leída:', tag);
      setNfcData(tag.id);  // Puedes almacenar la información de la etiqueta
      onConfirm();  // Confirma la toma de medicamentos
      NfcManager.setAlertMessageIOS('Medicación confirmada');
      NfcManager.cancelTechnologyRequest();

      // Guarda el estado de confirmación
      await AsyncStorage.setItem('medicationConfirmed', 'true');
    } catch (ex) {
      console.warn(ex);
      NfcManager.cancelTechnologyRequest();
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Escanea tu tarjeta NFC para confirmar la toma de medicamentos</Text>
      <Button title="Escanear NFC" onPress={readNfc} />
      {nfcData && <Text>Etiqueta NFC leída: {nfcData}</Text>}
    </View>
  );
};

export default MedicationScreen;
