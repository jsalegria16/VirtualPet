/* 
- hacer el user id
  - Sincronizar lista de medicamentos en local con lo online(Por ahora puede esperar)
    -   Hacer que se eliminen algunos medicamaentos tanto en la DB local como en la online 
- validacion y creciomeinto de la mascota (En conjunto)
  - Aqui validara franjas horarias
  - solo en la franja horaria del paciente

  *hay un problema: Cada vez que toco la mascota, dice que todos han tomado sus medicamentos


- Cada vez que un usuario conforme dentro de la franja horaria, se actualice el respectivo medicamento si es el caso.

    No olvodes que la estructura de la DB cambia, en la validacion diaria
    El formato de las horas que se está manejando >> En laa DB se ve raro
    
    depurar useDailyValidation
    Las horas cercanas, ina vez paso a true la confoirmaccion, 
        esta no se debe checar de nuevo,  usar algo para valida esto en el use confirmaationTime 
      
    NEcesito centralizar el almacenamiento de los medicamentos
      

        - Logs de los usos 
        - Las ventanas de tiempo están en los archivos useDailyValidation y useUpdateMEdication y useConformationTime

    Problemas con las fechas
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
