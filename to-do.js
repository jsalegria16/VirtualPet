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
        - Cantas veces dentro de la ventana de tiempo?
        - (Listo) cuando agrego una medicacion, la notificacion se agrega para todos los diaas a esa hora ()

    - (ya) Notificacion de recordatorio Por parte del recordador?

    - (Ya) Notificaion cunado conformas una toma de medicamento
        - Cuando tomo el medicamento sonar algo (Lo tomaste, has conformado )

    - Notificacion de crecimiento/No crecimiento de la mascota ? 
        - (ya) Crecimiento background and foreground
        - No crecimiento ? (Por ahora no Será necesario)
        
    - Sonidos personalizados
    
        - (ya) Para el Crecimiento de la mascota diario
        - (ya) Cuando se confirma
        - Para la Hora De tomar los medicamentos
        - (ya) Cuando Te recordaron que debes tomar los medicamentos (Rol recordaror)

    >> Triggers Para programar notifivations a cierta hora https://notifee.app/react-native/docs/triggers#creating-a-trigger-notification

Background 
    - (ya?) Notificaiones por si la app está cerrada/Minimizada
    - (ya?) PAra validaciones/Cambio De rol. 
    Para esto, está funcionado, pero seguir probando para encontrar errores.


Consideraciones finales: 

    - Ya hay que empezar a documentar la APP. 
    - Icono de eliminar medicamentos.
    - Logs de los usos 
        - (ya) NFC interaction 
        - Cambio de rol 
        - (Ya) Crecimiento/No crecimiento de la mascota. 
            - (ya) Si todos toman 
            - () Si no la toman (Por ahhora no será necesario)
                - Aquí, la hora de reinicio de las confirmaciones será basada en la ultima hora
                 de toma de medicamentos de los usuarios, toca quemarla en la DB

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
