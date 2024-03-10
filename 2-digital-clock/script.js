function setTime(h,m,s) {
    const zeroPad = (num, places) => String(num).padStart(places, '0') // konvertiert eine Zahl in einen String mit gegebenenfalls
        // führenden 0ern. places ist die Anzahl an Stellen des Ergebnisses
    const spanHours=document.querySelector('#spanHours');
    const spanMinutes=document.querySelector('#spanMinutes');
    const spanSeconds=document.querySelector('#spanSeconds');
    const spanAmpm=document.querySelector('#spanAmpm');
    if (h>12) {
        spanAmpm.innerText = 'PM'
        h=h-12
    } else {
        spanAmpm.innerText = 'AM'
    }
    spanHours.innerText = zeroPad(h,2);
    spanMinutes.innerText = zeroPad(m,2);
    spanSeconds.innerText = zeroPad(s,2);
}

setInterval(() => {
    const jetzt=new Date();
    const hours=jetzt.getHours();
    const minutes=jetzt.getMinutes();
    const seconds=jetzt.getSeconds();
    const ms=jetzt.getMilliseconds();
    setTime(hours,minutes,seconds);    
}, 1000)

