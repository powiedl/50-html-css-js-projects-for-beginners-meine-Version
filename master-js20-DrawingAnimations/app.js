const circle = document.querySelector('circle');
const perimeter = circle.getAttribute('r') * 2 * Math.PI;
circle.setAttribute('stroke-dasharray',perimeter);
let duration;

const timer=new Timer(document.getElementById('duration'),document.getElementById('start'),document.getElementById('pause'),
    {
        onStart(totalDuration) {
            console.log('Timer started');
            duration = totalDuration;
        },
        onTick(timeRemaining) {
            const offset = perimeter*timeRemaining / duration - perimeter;
            circle.setAttribute('stroke-dashoffset',offset)
        },
        onComplete() {
            console.log('Timer is completed');
        }
    }
);