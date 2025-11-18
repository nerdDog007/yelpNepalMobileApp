
function getHours(cc:string) {
    let [hours, minutes] = cc.split(":").map(Number);
    
    if (hours === 0 || hours === 24) {
        return `12:${minutes.toString().padStart(2, '0')} AM`;
    } else if (hours === 12) {
        return `12:${minutes.toString().padStart(2, '0')} PM`;
    } else if (hours > 12) {
        const h = hours - 12;
        return `${h}:${minutes.toString().padStart(2, '0')} PM`;
    } else {
        return `${hours}:${minutes.toString().padStart(2, '0')} AM`;
    }
}
getHours("10:00");

export default getHours;