const bgImageEl = document.getElementById('bg-image');
let bgHeight; // here I will store the height of the background image
let bgWidth; // here I will store the width of the background image
let vh100; // 100vh in Pixels;
let zoom; // calculated zoom factor (to prevent repeating of the image no matter what crazy viewport sizes you chose)
//let zoomDivisor; // calculated divisor of the zoom - in respect to viewport Height and background image height

const zoomDivisor = (vpHeight,imageHeight) => {
    return imageHeight/vpHeight;
}

const vhToPx = (vh)=>(bgImageEl.clientHeight / 100 * vh);
//console.log('100vh=',vhToPx(100));

window.onload = function () {
    let imageSrc = document
      .getElementById('bg-image');
//    console.dir(imageSrc);
    imageSrc=getComputedStyle(imageSrc).backgroundImage;
//    console.log('imageSrc1=',imageSrc);
    imageSrc=imageSrc.replace(/url\((['"])?(.*?)\1\)/gi, '$2');
//    console.log('imageSrc2=',imageSrc);
    imageSrc=imageSrc.split(',')[0];
//    console.log('imageSrc=',imageSrc);
    let image = new Image();
    image.src = imageSrc;
  
    image.onload = function () {
//      console.log('bg-image: width =' + width + ', height = ' + height);
        bgHeight = image.height;
        bgWidth = image.width;
//        console.log('bgImageDimensions',bgWidth,'x',bgHeight);
        let vh100=vhToPx(100); 
//        console.log('ViewportDimension',document.body.clientWidth,'x',vh100);

        if (bgHeight>0.8*vh100) { 
            zoom=1.2*bgHeight/vh100*100; // calc zoom, so that the resulting image is bigger than the space for it - and so repeating is prevented 
//            console.log('zoom=',parseInt(zoom),'%');
            bgImageEl.style.backgroundSize='' + zoom + '%'
        }
    };
  };

window.addEventListener('scroll', () => { 
    let calcOpacity=1-window.scrollY / 800;
    // these if statements ensure, that opacity is somewhere between 1 and 0.15 - because I like to see a litte bit of the image in every case
    if (calcOpacity<0.15) { 
        calcOpacity=0.15;
    } else if (calcOpacity>1) {
        // shouldn't be possible, because window.scrollY shouldn't be able to be lower than 9
        calcOpacity=1; 
    }
    bgImageEl.style.opacity = calcOpacity;
    bgImageEl.style.backgroundSize = (zoom + window.scrollY/zoomDivisor(vhToPx(100),bgHeight)) + '%';
    console.log('opacity=',bgImageEl.style.opacity,',bgSize=',bgImageEl.style.backgroundSize,' (window.scrollY=',window.scrollY,')');
 } )