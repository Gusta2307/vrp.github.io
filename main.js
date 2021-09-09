
let cvs = require("./script_canvas");
console.log(cvs);


let lib = require('@shopify/draggable');
var leave, outContainer, newDiv, startContainer, nextBro, pos;

const sortable = new lib.Sortable(document.querySelectorAll('.listClient'), {
    draggable: '.client',
    swapAnimation: {
        duration: 200,
        easingFunction: 'ease-in-out',
        horizontal: true,
    },
    plugins: [lib.Plugins.SwapAnimation],
});

sortable.on('drag:start', handlerStart);
sortable.on('drag:move', handlerMove);
sortable.on('drag:out:container', handlerOutContainer);
sortable.on('drag:over:container', handlerOverContainer);
sortable.on('drag:over', handlerOver);
sortable.on('drag:stop', handlerStop);
sortable.on('drag:stopped', handlerEnd);


function handlerStart(e){
    startContainer = e.sourceContainer;
    newDiv = e.source.cloneNode(true);
    pos = -1;
}

function handlerMove(e){
    cvs.refresh();
}

function handlerOutContainer(e){
    leave = true;
    outContainer = e.overContainer.parentNode;
}

function handlerOver(e){    
    if(pos === -1){
        if(e.originalSource.nextElementSibling !== null){
            nextBro = e.originalSource.nextElementSibling;
            pos = getStart(startContainer);
        }
        else
            pos = startContainer.children.length > 0? startContainer.children.length - 1: 0;
    }   
}

function handlerOverContainer(e){
    if(containsNewDiv()){
        if(e.overContainer == startContainer)
            removeNewDiv();
    }
    else if(e.overContainer != startContainer)
        addDiv(nextBro);

    if(leave && outContainer.className != e.overContainer.parentNode.className){
        if(e.overContainer.style.width != "")
            e.overContainer.style.width = '';
        e.overContainer.parentNode.style.width = getWidth(e.overContainer.parentNode) + 70 + "px";
        outContainer.style.width = getWidth(outContainer) - 70 + "px";
        if(getWidth(outContainer) - 70 == 70){
            outContainer.children[1].style.width = 70 + "px";
            outContainer.style.width = getWidth(outContainer) - 70 + "px";
        }
        leave = false;
        outContainer = null;
    }
    swapPosDiv(e);
}

function handlerStop(e){
    removeNewDiv();
    pos = -1;
    startContainer = null;
    newDiv = null;
}

function handlerEnd(e){
    cvs.refresh();
}

/*------------SWAPPABLE-----------*/

const swappable = new lib.Swappable(document.querySelectorAll('.box'), {
    draggable: '.truck',
});

var over, overContainer;

swappable.on('swappable:swapped', swapped);
swappable.on('swappable:stop', stop);

function swapped(e){
    if(e.dragEvent.data.overContainer === e.dragEvent.data.sourceContainer){
        over = null;
        overContainer = null;
        return;
    }
    over = e.dragEvent.data.over;
    overContainer = e.dragEvent.data.overContainer;
}

function stop(e){   
    if(overContainer == null)
        return;

    let colorOverElement = over.classList[1];
    let colorOriginalSource = e.data.dragEvent.data.originalSource.classList[1];

    overContainer.classList.remove(colorOverElement);
    overContainer.classList.add(colorOriginalSource);

    e.dragEvent.data.sourceContainer.classList.remove(colorOriginalSource);
    e.dragEvent.data.sourceContainer.classList.add(colorOverElement);

    over = null;
    overContainer = null;

    cvs.refresh();
}


/*-------------UTILS------------------*/

function getWidth(element){
    let currentWidth = outerWidth(element.children[0]);
    for(let child of element.children[1].children){
        if(child.style.display === 'none' || child.classList.contains('draggable-mirror')){
            continue;
        }
        currentWidth += outerWidth(child);
    }
    return currentWidth;
}

function outerWidth(element){
    let style = element.currentStyle || window.getComputedStyle(element),
    width = element.offsetWidth, 
    margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
    return width + margin;
}

function containsNewDiv(){
    for(let item of startContainer.children){
        if(item.classList.contains('newDiv'))
            return true;
    }
    return false;
}

function addDiv(nextBro){
    newDiv.classList.add('newDiv');
    newDiv.style.opacity = '0.4';
    startContainer.insertBefore(newDiv, nextBro != null? nextBro: startContainer.children[0]);
}

function getStart(container){
    let index = 0
    for(let item of container.children){
        if(item.classList.contains('draggable-source--is-dragging'))
            return index;
        else if(item.style.display === 'none')
            continue;
        index +=1;
    }
}

function removeNewDiv(){
    if(containsNewDiv()){
        startContainer.removeChild(newDiv);
        startContainer.parentNode.style.width = getWidth(startContainer.parentNode) + 'px';
        if(getWidth(startContainer.parentNode) === 70){
            startContainer.parentNode.children[1].style.width = 70 + "px";
            startContainer.parentNode.style.width = getWidth(startContainer.parentNode) + "px";
        }
    }
}

function getPos(enterBox, x){
    if(x - 35 < 0)
        return 0;
    else if(x + 35 > enterBox.getBoundingClientRect().width)
        return enterBox.children.length;
    else {
        for(let i = 1; i <= enterBox.children.length; i++){
            if((x - 35)/70 < i)
                return i;
        }
    }
}

function oMousePos(element, e) {
    var clientRect = element.getBoundingClientRect();
    return Math.round(e.clientX - clientRect.left);
}

function swapPosDiv(e){
    let posDrag = getPos(e.sourceContainer, oMousePos(e.sourceContainer, e.sensorEvent.data));
    if(e.source.classList.contains('draggable-source--is-dragging')){
        e.overContainer.insertBefore(e.source, e.overContainer.children[posDrag]);
    }
}

/* MOUSEOVER CLIENT */

var clients = document.querySelectorAll('.client');
[].forEach.call(clients, function(c){{
    c.addEventListener('mouseover', handlerMouseOver, false);
    c.addEventListener('mouseleave', handlerMouseLeave, false);
}});

function handlerMouseOver(e){
    cvs.drawClientShadow(e.target);
}

function handlerMouseLeave(e){
    cvs.refresh();
}

/*  CANVAS EVENTS    */
var canvas = document.querySelectorAll('.canvas');
[].forEach.call(canvas, function(c){{
    c.addEventListener('mousemove', handlerCanvasMouseOver, false);
    c.addEventListener('mouseleave', handlerCanvasMouseLeave, false);
}});

var activeClient = null;

function isActive(pos, x, y){
    return Math.sqrt((x - pos[0])**2 + (y - pos[1])**2) <= 0.42;
}

function handlerCanvasMouseOver(e){
    var x = (e.offsetX/cvs.canvas_width * cvs.grid_size - cvs.grid_size/2) * 0.963;
    var y =  -1*(e.offsetY/cvs.canvas_height * cvs.grid_size - cvs.grid_size/2) * 0.8;

    let client = document.querySelectorAll('.client');
    for(let c of client){
        let pos = cvs.getPosition(c.querySelector('p').innerHTML);
        if(isActive(pos, x,y)){
            c.style.boxShadow = '0 0 5px white';
            activeClient = c;
        }
    }
    if(activeClient && !isActive(cvs.getPosition(activeClient.querySelector('p').innerHTML), x, y))
        activeClient.style.boxShadow = '';

    document.querySelector('.txt').innerHTML = `X: ${x}   Y: ${y}`;
}

function handlerCanvasMouseLeave(e){
    document.querySelector('.txt').innerHTML = `X: ${-1}   Y: ${-1}`;
}
