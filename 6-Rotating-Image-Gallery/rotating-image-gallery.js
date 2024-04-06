const btnPrev = document.querySelector('#prev');
const btnNext = document.querySelector('#next');
// const gallery = document.querySelector('.image-container');
const imageContainerEl = document.querySelector(".image-container");

let x = 0;
let timer;

btnPrev.addEventListener('click',(e) => {
    x = x + 45;
    clearTimeout(timer);
    updateGallery();
})

btnNext.addEventListener('click',(e) => {
    x = x - 45;
    clearTimeout(timer);
    updateGallery();
})

function updateGallery() {
    // console.log('vorher=',gallery.style.transform,'x=',x);
    // const newTransform = `prespective(1000px) rotateY(${x}deg);` 
    // gallery.style.transform = newTransform;
    // console.log('nachher=',gallery.style.transform,'(',newTransform,')');
    
    imageContainerEl.style.transform = `perspective(1000px) rotateY(${x}deg)`;
    timer = setTimeout(() => {
        x = x-45
        updateGallery()
    },3000)
}

updateGallery()