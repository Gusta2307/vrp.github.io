let lib = require('@shopify/draggable');
var leave, outContainer;

const sortable = new lib.Sortable(document.querySelectorAll('.listClient'), {
    draggable: '.client',
    swapAnimation: {
        duration: 200,
        easingFunction: 'ease-in-out',
        horizontal: true
    },
    plugins: [lib.Plugins.SwapAnimation],
});

sortable.on('drag:out:container', handlerOutContainer);
sortable.on('drag:over:container', handlerOverContainer);
sortable.on('drag:stop', end);

function end(e){
    console.log("--------------end----------------");
}

function handlerOutContainer(e){
    leave = true;
    outContainer = e.overContainer.parentNode;
}

function handlerOverContainer(e){
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

/*------------SWAPPABLE-----------*/

const swappable = new lib.Swappable(document.querySelectorAll('.box'), {
    draggable: '.truck',
});

var startContainer, over, overContainer;

swappable.on('swappable:start', start);
swappable.on('swappable:swapped', swapped);
swappable.on('swappable:stop', stop);

function start(e){
    startContainer = e.data.dragEvent.data.sourceContainer;
}


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