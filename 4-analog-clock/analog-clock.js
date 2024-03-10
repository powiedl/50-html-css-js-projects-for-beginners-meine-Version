const hourElement = document.querySelector(".hour");
const minuteElement = document.querySelector(".minute");
const secondElement = document.querySelector(".second");
const digitalElement = document.querySelector(".digital");

function setTime() {
    const zeroPad = (num, places) => String(num).padStart(places, '0') // konvertiert eine Zahl in einen String mit gegebenenfalls
    // führenden 0ern. places ist die Anzahl an Stellen des Ergebnisses

    const jetzt=new Date();
    const hour=jetzt.getHours();
    const minute=jetzt.getMinutes();
    const second=jetzt.getSeconds();
    const hourPart = minute/60+second/3600;
    const minutePart = second/60;
    const hourDeg = ((hour + hourPart) / 12) * 360; 
    const minuteDeg = ((minute + minutePart)/60) * 360;
    const secondDeg = second/60*360;
    hourElement.style.transform = `rotate(${hourDeg}deg)`;
    minuteElement.style.transform = `rotate(${minuteDeg}deg)`;
    secondElement.style.transform = `rotate(${secondDeg}deg)`;
    digitalElement.innerText = `${zeroPad(hour,2)}:${zeroPad(minute,2)}:${zeroPad(second,2)}`;
    //console.log(hourDeg,minuteDeg,secondDeg);


    //console.log(hourElement,minuteElement,secondElement);
}

setTime()
setInterval(setTime,1000)