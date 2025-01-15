/**
 * @format
 */
import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

import messaging from '@react-native-firebase/messaging';
import notifee, { EventType } from '@notifee/react-native';
import { PermissionsAndroid } from 'react-native';
import { handleNotification } from './src/services/notifications/notificationHandler';
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

notifee.onBackgroundEvent(async ({ type, detail }) => {
    console.log('[Notifee] Evento en segundo plano recibido:', 'type', 'detail');

    // switch (type) {
    //     case notifee.EventType.PRESS:
    //         console.log('Notificación tocada:', detail.notification);
    //         // Aquí puedes manejar acciones al tocar la notificación en segundo plano
    //         break;

    //     case notifee.EventType.ACTION_PRESS:
    //         console.log('Acción de notificación presionada:', detail.pressAction.id);
    //         // Maneja las acciones de botones en la notificación
    //         break;

    //     default:
    //         console.warn('Evento desconocido en segundo plano:', type);
    //         break;
    // }
});

notifee.onForegroundEvent(async ({ type, detail }) => {
    console.log('[Notifee] Evento en primer plano recibido:', 'type', 'detail');

    // switch (type) {
    //     case notifee.EventType.PRESS:
    //         console.log('Notificación tocada:', detail.notification);
    //         break;

    //     case notifee.EventType.ACTION_PRESS:
    //         console.log('Acción de notificación presionada:', detail.pressAction.id);
    //         break;

    //     default:
    //         console.warn('Evento desconocido en primer plano:', type);
    //         break;
    // }
});

messaging().onMessage(async (remoteMessage) => {
    console.log('Mensaje recibido en primer planoo:', remoteMessage);
    await handleNotification(remoteMessage);
});

// Manejador de mensajes en segundo plano
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('Mensaje recibido en segundo planoo:', remoteMessage.data, remoteMessage.notification);
    await handleNotification(remoteMessage);
});


AppRegistry.registerComponent(appName, () => App);
