/**
 * @format
 */
import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

import messaging from '@react-native-firebase/messaging';
import notifee, { EventType, AndroidImportance } from '@notifee/react-native';
import { PermissionsAndroid } from 'react-native';
import { handleNotification } from './src/services/notifications/notificationHandler';
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);


// Crear canales de notificación
async function initializeNotificationChannels() {
    await notifee.createChannel({
        id: 'pet_growth',
        name: 'Crecimiento de la Mascota',
        importance: AndroidImportance.HIGH,
        sound: 'pethadgrowth', // Archivo de sonido en res/raw/
        vibration: true,
        lights: true,
    });

    await notifee.createChannel({
        id: 'role_reminder',
        name: 'Recordatorio por parte del Rol recordador',
        importance: AndroidImportance.HIGH,
        sound: 'rolreminder',
        vibration: true,
        lights: true,
    });

    await notifee.createChannel({
        id: 'confirmate_notification',
        name: 'Confirmación de Medicamentos',
        importance: AndroidImportance.HIGH,
        sound: 'confimatemedication',
        vibration: true,
        lights: true,
    });

    await notifee.createChannel({
        id: 'medication_reminders',
        name: 'Recordatorios de Medicamentos',
        importance: AndroidImportance.HIGH,
        sound: 'medicationtime',
        vibration: true,
        lights: true,
    });

    console.log('Canales de notificación inicializados');
}

// Inicializar canales al inicio
initializeNotificationChannels();

AppRegistry.registerComponent(appName, () => App);
