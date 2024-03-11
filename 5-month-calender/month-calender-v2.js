const monthEl = document.querySelector('.head h1');
const datumEl = document.querySelector('.head h3');
const daysEl = document.querySelector('.days');
const vorEl = document.querySelector('.vor');
const weiterEl = document.querySelector('.weiter');

const weekdays=['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'];
const months=['Jänner','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember']

function setCalender (month,year,debug=false) {
    // #region handle today
    const heute=new Date();
    const heuteMonat=heute.getMonth();
    const heuteMonatString = months[heuteMonat];
    const heuteJahr = heute.getFullYear();
    let currentMonth = false;
    if ((heuteMonat === month) && (heuteJahr ===year)) { currentMonth=true }
    debug && console.log(`current month? ${currentMonth}`);
    const dateString = `${weekdays[heute.getDay()]}, ${heute.getDate()}. ${heuteMonatString} ${heute.getFullYear()}`
    datumEl.innerText=dateString;
    // #endregion
    
    const stichtag=new Date(year,month,1);
    const lastDay = new Date(stichtag.getFullYear(),stichtag.getMonth()+1,0).getDate() // auf magische Weise liefert das den letzten Tag im aktuellen Monat
    const lastWeekday = new Date(stichtag.getFullYear(),stichtag.getMonth()+1,0).getDay();
    debug && console.log(`last weekday=${lastWeekday}`);
    const firstDay = new Date(stichtag.getFullYear(),stichtag.getMonth(),1).getDay() 
    debug && console.log(`first day=${firstDay}`);
    const heuteTag = heute.getDate();
    monthEl.innerText=`${months[month]} ${year}`;


    let days = "";
    for (let i=1;i<(firstDay===0 ? 7 : firstDay);i++) { // wenn firstDay=0 (Sonntag) tu so, tu so, als ob er 7 wäre
        debug && console.log('  add empty day at beginning ...');
        days += '<div class="empty"></div>'
    }
    for(let i=1;i<=lastDay;i++) {
        days += `<div ${currentMonth && i===heuteTag ? 'class="today"' : ''}>${i}</div>`
    }
    if (lastWeekday>0) {
        for(let i=lastWeekday;i<7;i++) {
            debug && console.log('  add empty day at end ...');
            days += '<div class="empty"></div>'
        }
    }
    daysEl.innerHTML = days;
}

function getCurrentMonth() {
    const currentMonth = monthEl.innerText;
    [strMonth,strYear] = currentMonth.split(' ');
    const month=months.map(e => e.toUpperCase()).indexOf(strMonth);
    return [month,strYear];
}

function prevMonth() {
    const curMonth=getCurrentMonth();
    let [newMonth,newYear] = curMonth;
    if (newMonth !== 0) {
        newMonth--; 
    } else {
        newMonth=11;
        newYear--;
    }
    setCalender(newMonth,newYear);
}

function nextMonth() {
    const curMonth=getCurrentMonth();
    let [newMonth,newYear] = curMonth;
    if (newMonth !== 11) {
        newMonth++; 
    } else {
        newMonth=0;
        newYear++;
    }
    setCalender(newMonth,newYear);
}

vorEl.addEventListener('click',prevMonth);
weiterEl.addEventListener('click',nextMonth);

setCalender ((new Date()).getMonth(),(new Date()).getFullYear())
getCurrentMonth();
