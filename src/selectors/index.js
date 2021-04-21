export const changeDateFormat = (date) => {
    const newDate = new Date(date);
    const formatedDate = newDate.toLocaleDateString('fr-FR') + ' à ' + newDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    return formatedDate;
}