/* 
Confirmacion de toma de medicamentos
    - 
    - 
    - 
    - 


Completar useDailyValidation
    - 
    - 
    - 
    -
Progreso de los usuarios
    - 
    - 
    - 


Completar cambio de ROLE
    - Soy un new user agregarlo a la Cola de cambio de roles?
    - Que el rol actual sea el que valide todo? crecimiento de mascota, DailyReset?
    - Un rol a lo largo del día ? IDK
 
Notificaciones 
    - Hora de tomar el medicamento
        - Tiene que ser dentro de la ventana de tiempo? o a la hora exacta?
        - Cantas veces dentro de la ventana de tiemp?
    - Notificacion de recordatorio Por parte del recordador?
    - Notificacion de crecimiento/No crecimiento de la mascota ? 
    -
    >> Triggers Para programar notifivations a cierta hora https://notifee.app/react-native/docs/triggers#creating-a-trigger-notification

Background 
    - Notificaiones por si la app está cerrada/Minimizada
    - PAra validaciones/Cambio De rol. 


Consideraciones finales: 
    - Ya hay que empezar a documentar la APP. 
    - Icono de eliminar medicamentos.
    - Logs de los usos 
        NFC interaction
        Cambio de rol
        Crecimiento/No crecimiento de la mascota.
    - Las ventanas de tiempo están en los archivos useDailyValidation y useUpdateMEdication y useConformationTime
    - Falta un icono en la app. 
*/

confirmaciones = {
    '2021-09-01T17:00:00.000Z': {
        hora: '5:00 PM',
        medicamento: 'Med1',
        status: true
    },
    '2021-09-01T18:00:00.000Z': {
        hora: '6:00 PM',
        medicamento: 'Med2',
        status: false
    }
}
