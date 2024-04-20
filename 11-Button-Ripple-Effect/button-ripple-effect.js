const btnEl = document.querySelector('.btn');
btnEl.addEventListener('mouseover', (evt) => {
    const x= evt.pageX-btnEl.offsetLeft;
    const y= evt.pageY-btnEl.offsetTop;
    btnEl.style.setProperty("--xPos",x + 'px');
    btnEl.style.setProperty("--yPos",y + 'px');
})
