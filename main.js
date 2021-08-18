let lib = require('@shopify/draggable');
var leave, container;

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
    e.overContainer.parentNode.style.width = e.overContainer.parentNode.getBoundingClientRect().width - 70 + "px";
}

function handlerOverContainer(e){
    if(leave && container !== e.overContainer.parentNode){
        e.overContainer.parentNode.style.width = e.overContainer.parentNode.getBoundingClientRect().width + 70 + "px";
        leave = false;
        container = null;
    }
    else{
        container = e.overContainer.parentNode;
    }
}

/*------------SWAPPABLE-----------*/

const swappable = new lib.Swappable(document.querySelectorAll('.box'), {
    draggable: '.truck',
});

swappable.on('swappable:start', start);
swappable.on('swappable:swapped', swapped);
swappable.on('swappable:stop', stop);
swappable.on('sortable:sorted', sorted);

function start(e){
    console.log("start");
}

function swapped(e){
    let colorSwappedElement = e.swappedElement.classList[1];
    let colorOriginalSource = e.dragEvent.data.source.classList[1];

    e.swappedElement.parentNode.classList.remove(colorSwappedElement);
    e.swappedElement.parentNode.classList.add(colorSwappedElement);

    e.dragEvent.data.source.parentNode.classList.remove(colorSwappedElement);
    e.dragEvent.data.source.parentNode.classList.add(colorOriginalSource);
}

function sorted(e){
    console('sorted');
}

function stop(e){   
    console.log("stop");
}