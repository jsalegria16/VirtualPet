import notifee from '@notifee/react-native';

export const checkExactAlarmPermission = async () => {
  // Obtener la configuración actual de notificaciones
  const settings = await notifee.getNotificationSettings();

  if (settings.android.alarm === notifee.AndroidNotificationSetting.ENABLED) {
    console.log('Permiso de alarmas exactas habilitado.');
  } else {
    // Informar al usuario sobre la necesidad del permiso
    console.log('Permiso de alarmas exactas no habilitado. Solicitando configuración...');
    alert(
      'Tu dispositivo requiere un permiso adicional para programar recordatorios exactos. Habilítalo en la configuración de alarmas.'
    );

    // Abrir la configuración de permisos de alarmas
    await notifee.openAlarmPermissionSettings();
  }
};
