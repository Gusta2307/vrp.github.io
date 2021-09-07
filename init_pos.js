const list = document.getElementsByClassName('listClient');

for(let item of list){
    let p = document.createElement('p');
    p.className = "gas-station";
    p.innerText = getPos(-9, 9);
    item.parentNode.appendChild(p);
    for(let child of item.children){
        p = document.createElement('p');
        p.id = "p";
        p.innerText = getPos(-9, 9);
        child.insertBefore(p, child.children[0]);
    }
}

function getPos(min, max){
    let x = Math.floor(Math.random() * (max-min)) + min;
    let y = Math.floor(Math.random() * (max-min)) + min;
    return `(${x},${y})`;
}