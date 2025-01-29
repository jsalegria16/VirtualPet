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
    - (ya) Soy un new user agregarlo a la Cola de cambio de roles?
K
 
Notificaciones 
    - Hora de tomar el medicamento
        - (Listo) desde la cloud function acaada aminuto chequea que se deba notificar

    - (ya) Notificacion de recordatorio Por parte del recordador?

    - (Ya) Notificaion cunado conformas una toma de medicamento
        - (Listo) Cuando tomo el medicamento sonar algo (Lo tomaste, has conformado )

    - Notificacion de crecimiento/No crecimiento de la mascota ? 
        - (ya) Crecimiento background and foreground
        
    - Sonidos personalizados
        - (ya) Para el Crecimiento de la mascota diario
        - (ya) Cuando se confirma
        - (ya) Para la Hora De tomar los medicamentos
        - (ya) Cuando Te recordaron que debes tomar los medicamentos (Rol recordaror)

Background 
    - (ya?) Notificaiones por si la app está cerrada/Minimizada
    - (ya?) PAra validaciones/Cambio De rol. 

Estado de humor de la mascota.
    - (ya) Estados triste/feliz
    - (ya) Por son no se validan todas las conformaciones
    - (ya) El título 


Consideraciones finales: 

    - (ya) Ya hay que empezar a documentar la APP. 
    - (ya) Icono de eliminar medicamentos.
    - Logs de los usos 
        - (ya) NFC interaction 
        - (ya) Cambio de rol 
        - (Ya) Crecimiento/No crecimiento de la mascota. 
            - (ya) Si todos toman 
            - () Si no la toman (Por ahhora no será necesario)
                - Aquí, la hora de reinicio de las confirmaciones será basada en la ultima hora
                 de toma de medicamentos de los usuarios, toca quemarla en la DB
                 Tener en cuenta el scheduler

    - Las ventanas de tiempo están en los archivos useDailyValidation y useUpdateMEdication y useConformationTime
*/