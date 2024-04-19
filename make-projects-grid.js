const json='[{"id":"2","span":"r2","tooltip":"Digitaluhr (Abschnitt 2)","img":"image-02.png","overlay":{"color":"white","pt":"pt-45","href":"2-digital-clock/index.html"}},{"id":"3","span":"r2","tooltip":"Countdown zum neuen Jahr (Abschnitt 3)","img":"image-03.png","overlay":{"color":"white","pt":"pt-25","href":"3-new-year-countdown/index.html"}},{"id":"4","span":"r3","tooltip":"Analoguhr (Abschnitt 4)","img":"image-04.png","overlay":{"color":"black","pt":"pt-45","href":"4-analog-clock/index.html"}},{"id":"5","span":"r4","tooltip":"Monatskalender (Abschnitt 5) - Version aus dem Kurs","img":"image-05.png","overlay":{"color":"white","pt":"pt-45","href":"5-month-calender/index.html"}},{"id":"5meins","span":"r4","tooltip":"Monatskalender (Abschnitt 5) - meine Version","img":"image-05.png","overlay":{"color":"white","pt":"pt-45","href":"5-month-calender/index-v2.html"}},{"id":"6","span":"r2","tooltip":"Rotating Image Gallery (Abschnitt 6) - eigentlich total simple...","img":"image-06.png","overlay":{"color":"white","pt":"pt-25","href":"6-rotating-image-gallery/rotating-image-gallery.html"}},{"id":"master-20","span":"r4","tooltip":"Timer (Master JS, Abschnitt 20) - Pausieren kann auch beendet werden (solange die Restzeit nicht verändert wurde)","tooltipAdditionalClasses":["w60"],"img":"image-master-js20.png","overlay":{"color":"black","pt":"pt-75","href":"master-js20-DrawingAnimations/timer.html"}}]';
const projects=JSON.parse(json);

function makeProjectDiv(project) {
    const projectDivEl=document.createElement('div');
    projectDivEl.classList.add('project');
    projectDivEl.classList.add('span-'+project.span);
    const tooltipEl=document.createElement('span');
    tooltipEl.classList.add('tooltip');
    if (project.tooltipAdditionalClasses) {
        for (let addClass of project.tooltipAdditionalClasses) {
            tooltipEl.classList.add(addClass);
        }
    }
    tooltipEl.innerText=project.tooltip;
    const imgEl=document.createElement('img');
    imgEl.src=project.img;
    const overlayDivEl=document.createElement('div');
    overlayDivEl.classList.add('overlay');
    overlayDivEl.classList.add(project.overlay.color);
    const contentDivEl=document.createElement('div');
    contentDivEl.classList.add('content');
    contentDivEl.classList.add(project.overlay.pt);
    const linkEl=document.createElement('a');
    linkEl.href=project.overlay.href;
    linkEl.innerText='Zum Projekt';
    contentDivEl.appendChild(linkEl);
    overlayDivEl.appendChild(contentDivEl);
    projectDivEl.append(tooltipEl,imgEl,overlayDivEl);
    // console.log(overlayDivEl);
    // console.log(projectDivEl);
    return projectDivEl;
}

for (let project of projects) {
    const projectDivEl = makeProjectDiv(project);
    //console.log(projectDivEl);
    document.querySelector('.projects').append(projectDivEl);
}