const monthEl = document.querySelector('.month');
const weekdayEl = document.querySelector('.weekday');
const dateEl = document.querySelector('.date');
const yearEl = document.querySelector('.year');

const datum=new Date();
monthEl.innerText = datum.toLocaleString("de", { month: "long"})
weekdayEl.innerText = datum.toLocaleString("de", { weekday: "long"})
dateEl.innerText = datum.getDate();
yearEl.innerText = datum.getFullYear();