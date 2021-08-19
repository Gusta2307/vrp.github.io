let lib = require('@shopify/draggable');
var leave, outContainer, newDiv, startContainer, nextBro, pos, auxPos;

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
sortable.on('drag:out:container', handlerOutContainer);
sortable.on('drag:over:container', handlerOverContainer);
sortable.on('drag:over', handlerOver);
sortable.on('drag:stop', handlerStop);

function handlerStart(e){
    startContainer = e.sourceContainer;
    newDiv = e.source.cloneNode(true);
    pos = -1;
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
    //console.log("over", e.overContainer.children);
    if(containsNewDiv()){
        if(e.overContainer == startContainer)
            removeNewDiv();
    }
    else if(e.overContainer != startContainer)
        addDiv(nextBro);
    
    if(leave && outContainer.className != e.overContainer.parentNode.className){
        if(e.overContainer.style.width !== "")
        e.overContainer.style.width = '';
        e.overContainer.parentNode.style.width = getWidth(e.overContainer.parentNode) + 70 + "px";
        outContainer.style.width = getWidth(outContainer) - 70 + "px";
        if(getWidth(outContainer) - 70 === 70){
            outContainer.children[1].style.width = 30 + "px";
            outContainer.style.width = 100 + "px";
        }
        leave = false;
        outContainer = null;
    }
}

function handlerStop(e){
    removeNewDiv();
    pos = -1;
    startContainer = null;
    newDiv = null;
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
        over = overContainer = null;
        return;
    }
    over = e.dragEvent.data.over;
    overContainer = e.dragEvent.data.overContainer;
}

function stop(e){   
    if(overContainer === null)
        return;

    let colorOverElement = over.classList[1];
    let colorOriginalSource = e.data.dragEvent.data.originalSource.classList[1];

    overContainer.classList.remove(colorOverElement);
    overContainer.classList.add(colorOriginalSource);

    e.dragEvent.data.sourceContainer.classList.remove(colorOriginalSource);
    e.dragEvent.data.sourceContainer.classList.add(colorOverElement);
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
        if(item.classList.contains('add'))
            return true;
    }
    return false;
}

function addDiv(nextBro){
    newDiv.classList.add('add');
    newDiv.innerHTML = "";
    newDiv.style.hidden = 'true';
    newDiv.style.position = 'relative';
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
    startContainer.removeChild(newDiv);
    startContainer.parentNode.style.width = getWidth(startContainer.parentNode) + 'px';
    if(getWidth(startContainer.parentNode) === 70){
        startContainer.parentNode.children[1].style.width = 30 + "px";
        startContainer.parentNode.style.width = 100 + "px";
    }
}