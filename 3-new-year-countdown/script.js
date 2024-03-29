const templateText='${days} Days&nbsp;&nbsp;&nbsp;${hours} Hours&nbsp;&nbsp;&nbsp;${minutes} Minutes&nbsp;&nbsp;&nbsp;${seconds} Seconds'
const spanCountdown=document.querySelector('#spanCountdown')
const spanNewYear=document.querySelector('#spanNewYear')
const root = document.querySelector(":root"); // root Element in CSS

function dateDifference (dateInitial, dateFinal) {
  let diff = (dateFinal - dateInitial) / 1000; // in seconds
  let days = Math.floor(diff / 86400);
  diff = diff - days*86400;
  let hours = Math.floor(diff/3600);
  diff = diff -hours*3600;
  let minutes = Math.floor(diff/60);
  seconds = Math.floor(diff - minutes*60);
  return {days,hours,minutes,seconds}
}

function setCountdown() {
    const actYear=(new Date).getFullYear();
    const nextNewYear=new Date(`${actYear+1}-01-01T00:00:00`)
    spanNewYear.innerText = nextNewYear.getFullYear()
    const delta = dateDifference(new Date,nextNewYear);
    spanCountdown.innerHTML = `${delta.days} Day${delta.days !==1 && 's'}&nbsp;&nbsp;&nbsp;${delta.hours} Hour${delta.hours !==1 ? 's' :''}&nbsp;&nbsp;&nbsp;${delta.minutes} Minute${delta.minutes !==1 ? 's' :''}&nbsp;&nbsp;&nbsp;${delta.seconds} Second${delta.seconds !==1 ? 's' :''}`
    delta.days === 1 ? root.style.setProperty("--day",`"DAY"`) : root.style.setProperty("--day",`"DAYS"`)
    delta.hours === 1 ? root.style.setProperty("--hour",`"HOUR"`) : root.style.setProperty("--hour",`"HOURS"`)
    delta.minutes === 1 ? root.style.setProperty("--minute",`"MINUTE"`) : root.style.setProperty("--minute",`"MINUTES"`)
    delta.seconds === 1 ? root.style.setProperty("--second",`"SECOND"`) : root.style.setProperty("--second",`"SECONDS"`)
    document.querySelector('#day').innerText=delta.days
    document.querySelector('#hour').innerText=delta.hours
    document.querySelector('#minute').innerText=delta.minutes
    document.querySelector('#second').innerText=delta.seconds
}

setCountdown() // damit der Countdown "sofort" da ist
setInterval(setCountdown,1000);
