let lib = require('@shopify/draggable');

// new lib.Draggable(document.querySelectorAll('#drag'), {
// 	draggable: '.client'
// });

// new lib.Sortable(document.querySelector('#listC'), {
//     draggable: '.client'
// });

const droppable = new lib.Droppable(document.querySelectorAll('.box'), {
    draggable: '.client',
    dropzone: '.listClient'
  });

  droppable.on('droppable:dropped', () => console.log('droppable:dropped'));
  droppable.on('droppable:returned', () => console.log('droppable:returned'));

const swappable = new lib.Swappable(document.querySelectorAll('.truck'), {
    draggable: '.truck'
});

swappable.on('swappable:start', start);
swappable.on('swappable:swapped', swapped);
swappable.on('swappable:stop', stop);

function start(e){
    console.log(e);
}

function swapped(e){
    let colorSwappedElement = e.swappedElement.classList[1];
    let colorOriginalSource = e.dragEvent.data.source.classList[1];

    e.swappedElement.parentNode.classList.remove(colorSwappedElement);
    e.swappedElement.parentNode.classList.add(colorSwappedElement);

    e.dragEvent.data.source.parentNode.classList.remove(colorSwappedElement);
    e.dragEvent.data.source.parentNode.classList.add(colorOriginalSource);
}

function stop(e){   
    console.log(e);
    // console.log(swappable.containers[0].parentNode.classList);

    // swappable.containers[0].parentNode.classList.remove(swappable.containers[0].classList[1]);
    // swappable.containers[0].parentNode.classList.add(swappable.containers[1].classList[1]);

    // swappable.containers[1].parentNode.classList.remove(swappable.containers[1].classList[1]);
    // swappable.containers[1].parentNode.classList.add(swappable.containers[1].classList[1]);
}