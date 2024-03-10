const monthEl = document.querySelector('.head h1');
const datumEl = document.querySelector('.head h3');
const daysEl = document.querySelector('.days');

const heute=new Date();
const monat=heute.getMonth();
const weekdays=['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'];
const months=['Jänner','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember']
const dateString = `${weekdays[heute.getDay()]}, ${heute.getDate()}. ${months[monat]} ${heute.getFullYear()}`
const lastDay = new Date(new Date().getFullYear(),monat+1,0).getDate() // auf magische Weise liefert das den letzten Tag im aktuellen Monat
const lastWeekday = new Date(new Date().getFullYear(),monat+1,0).getDay();
const firstDay = new Date(new Date().getFullYear(),monat,1).getDay() 
const heuteTag = heute.getDate();
monthEl.innerText=months[monat];
datumEl.innerText=dateString;


let days = "";
for (let i=1;i<(firstDay===0 ? 7 : firstDay);i++) { // wenn firstDay=0 (Sonntag) tu so, tu so, als ob er 7 wäre
    days += '<div class="empty"></div>'
}
for(let i=1;i<=lastDay;i++) {
    days += `<div ${i===heuteTag ? 'class="today"' : ''}>${i}</div>`
}
if (lastWeekday>0) {
    for(let i=lastWeekday;i<7;i++) {
        days += '<div class="empty"></div>'
    }
}
daysEl.innerHTML = days;