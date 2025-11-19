function isClosed( hours) {
    const today = new Date().toLocaleString('en-us', { weekday: 'long' }).toLowerCase();
    // const hour = new Date().getHours();
    const hour = 11
    console.log(hours[today]);
    const [openingHourss, openiingMinutes] = hours[today].open.split(":").map(Number);
    const [closingHourss, closingMinutes] = hours[today].close.split(":").map(Number);
    
    console.log(hour);
    
    // to be opened conditin are opening time is greater than or equal current time and closing time is less than current time
    if (hours[today].closed) {
        return true
    }
    else if (openingHourss > hour && closingHourss < hour) {
        return false;
    }
    else {
        return true;
    }
    
}

export function getDay(){
    const today = new Date().toLocaleString('en-us', { weekday: 'long' }).toLowerCase();
    return today
}
export default isClosed;