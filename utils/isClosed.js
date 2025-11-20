function isClosed( hours) {
    const today = new Date().toLocaleString('en-us', { weekday: 'long' }).toLowerCase();
    const hour = new Date().getHours();
    console.log("this..com");
    
    const [openingHourss] = hours[today].open.split(":").map(Number);
    const [closingHourss] = hours[today].close.split(":").map(Number);
    
    if (hours[today].closed) {
        return true
    }
    else if (openingHourss < hour && closingHourss > hour) {
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