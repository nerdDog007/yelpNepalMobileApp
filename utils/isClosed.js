function isClosed( hours) {
    const today = new Date().toLocaleString('en-us', { weekday: 'long' }).toLowerCase();
    const hour = new Date().getHours();
    if (hours[today].closed) {
        return true;
    } else if (hours[today].open < hour && hours[today].close > hour) {
        return true;
    } else {
        return false;
    }
    
}

export function getDay(){
    const today = new Date().toLocaleString('en-us', { weekday: 'long' }).toLowerCase();
    return today
}
export default isClosed;