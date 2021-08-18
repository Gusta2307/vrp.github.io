let lib = require('@shopify/draggable');
var leave, container, outContainer;

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

function handlerOutContainer(e){
    leave = true;
    outContainer = e.overContainer.parentNode;
}

function handlerOverContainer(e){
    if(leave && container !== e.overContainer.parentNode){
        e.overContainer.parentNode.style.width = e.overContainer.parentNode.getBoundingClientRect().width + 70 + "px";
        outContainer.style.width = outContainer.getBoundingClientRect().width - 70 + "px";
        leave = false;
        container = null;
        outContainer = null;
    }
    else {
        container = e.overContainer.parentNode;
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