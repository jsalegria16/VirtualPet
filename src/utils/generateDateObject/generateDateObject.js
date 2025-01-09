
export function generateDateObject(timeString) {
    // Alert.alert('debug message:', `Esta es la fecha en string que entra a la func: ${timeString} y es de tipo ${typeof timeString}`);
    const normalizedTimeString = timeString.replace(/\s+/g, ' '); // Normaliza cualquier tipo de espacio
    const cleanedTimeString = normalizedTimeString.trim();
    const [time, modifier] = cleanedTimeString.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    // Alert.alert('Debug Message dentro de combineDateAndTime', ` time: ${time} modifier: ${modifier} hours: ${hours} minutes: ${minutes}`);

    if (modifier === 'PM' && hours < 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;

    const baseDate = new Date();
    // Alert.alert('Debug Message dentro de combineDateAndTime', ` baseDate: ${baseDate}`);
    baseDate.setHours(hours, minutes, 0, 0);
    // Alert.alert('Debug Message dentro de combineDateAndTime', ` baseDate.setHours: ${baseDate}`);

    return baseDate;
};