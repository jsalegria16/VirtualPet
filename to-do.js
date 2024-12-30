/* 
- hacer el user id-   Hacer que se eliminen algunos medicamaentos tanto en la DB local como en la online 
    - Falta un icono en la app. Porque el listener a la DB funciona
- validacion y creciomeinto de la mascota (En conjunto)
  - Aqui validara franjas horarias
  - solo en la franja horaria del paciente

depurar useDailyValidation

    

        - Logs de los usos 
        - Las ventanas de tiempo están en los archivos useDailyValidation y useUpdateMEdication y useConformationTime
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
