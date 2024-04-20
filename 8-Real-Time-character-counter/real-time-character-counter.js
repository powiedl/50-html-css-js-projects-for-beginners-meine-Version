const dataEl = document.querySelector('#data');
const totalEl = document.querySelector('.total');
const remainingEl = document.querySelector('.remaining');

dataEl.addEventListener('input',(e) => {
    const textLen = e.target.value.length;
    totalEl.innerText = textLen;
    remainingEl.innerText = dataEl.getAttribute("maxLength")-textLen;
})