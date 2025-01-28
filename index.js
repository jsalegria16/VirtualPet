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

});

notifee.onForegroundEvent(async ({ type, detail }) => {
    console.log('[Notifee] Evento en primer plano recibido:', 'type', 'detail');
});

// messaging().onMessage(async (remoteMessage) => {
//     console.log('Mensaje recibido en primer planoo:', remoteMessage);
//     await handleNotification(remoteMessage);
// });

// Manejador de mensajes en segundo plano
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('Mensaje recibido en segundo planoo:', remoteMessage.data, remoteMessage.notification);
    await handleNotification(remoteMessage);
});


AppRegistry.registerComponent(appName, () => App);
