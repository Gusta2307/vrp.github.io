var grid_size = 25;

var x_axis_starting_point = { number: 1, suffix: '\u03a0' };
var y_axis_starting_point = { number: 1, suffix: '' };

var canvas = document.getElementById("my-canvas");
var ctx = canvas.getContext("2d");

var x_axis_distance_grid_lines = Math.floor(canvas.height/25/2);
var y_axis_distance_grid_lines = Math.floor(canvas.width/25/2);

var canvas_width = canvas.width;
var canvas_height = canvas.height;

var num_lines_x = Math.floor(canvas_height/grid_size);
var num_lines_y = Math.floor(canvas_width/grid_size);

var point = document.querySelectorAll('p');
var prevPos = null;
var prevParentColor = null;

//refhesh();

function drawCoorAxis(){
    // Draw grid lines along X-axis
    for(var i=0; i<=num_lines_x; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;

        // If line represents X-axis draw in different color
        if(i == x_axis_distance_grid_lines) 
            ctx.strokeStyle = "#000000";
        else
            ctx.strokeStyle = "#e9e9e9";

        if(i == num_lines_x) {
            ctx.moveTo(0, grid_size*i);
            ctx.lineTo(canvas_width, grid_size*i);
        }
        else {
            ctx.moveTo(0, grid_size*i+0.5);
            ctx.lineTo(canvas_width, grid_size*i+0.5);
        }
        ctx.stroke();
    }

    // Draw grid lines along Y-axis
    for(i=0; i<=num_lines_y; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;

        // If line represents X-axis draw in different color
        if(i == y_axis_distance_grid_lines) 
            ctx.strokeStyle = "#000000";
        else
            ctx.strokeStyle = "#e9e9e9";

        if(i == num_lines_y) {
            ctx.moveTo(grid_size*i, 0);
            ctx.lineTo(grid_size*i, canvas_height);
        }
        else {
            ctx.moveTo(grid_size*i+0.5, 0);
            ctx.lineTo(grid_size*i+0.5, canvas_height);
        }
        ctx.stroke();
    }

    // Translate to the new origin. Now Y-axis of the canvas is opposite to the Y-axis of the graph. So the y-coordinate of each element will be negative of the actual
    ctx.translate(y_axis_distance_grid_lines*grid_size, x_axis_distance_grid_lines*grid_size);

    // Ticks marks along the positive X-axis
    for(i=1; i<(num_lines_y - y_axis_distance_grid_lines); i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000000";

        // Draw a tick mark 6px long (-3 to 3)
        ctx.moveTo(grid_size*i+0.5, -3);
        ctx.lineTo(grid_size*i+0.5, 3);
        ctx.stroke();

        // Text value at that point
        ctx.font = '9px Arial';
        ctx.textAlign = 'start';
        ctx.fillText(x_axis_starting_point.number*i, grid_size*i-2, 15);
    }

    // Ticks marks along the negative X-axis
    for(i=1; i<y_axis_distance_grid_lines; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000000";

        // Draw a tick mark 6px long (-3 to 3)
        ctx.moveTo(-grid_size*i+0.5, -3);
        ctx.lineTo(-grid_size*i+0.5, 3);
        ctx.stroke();

        // Text value at that point
        ctx.font = '9px Arial';
        ctx.textAlign = 'end';
        ctx.fillText(-x_axis_starting_point.number*i , -grid_size*i+3, 15);
    }

    // Ticks marks along the positive Y-axis
    // Positive Y-axis of graph is negative Y-axis of the canvas
    for(i=1; i<(num_lines_x - x_axis_distance_grid_lines); i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000000";

        // Draw a tick mark 6px long (-3 to 3)
        ctx.moveTo(-3, grid_size*i+0.5);
        ctx.lineTo(3, grid_size*i+0.5);
        ctx.stroke();

        // Text value at that point
        ctx.font = '9px Arial';
        ctx.textAlign = 'start';
        ctx.fillText(-y_axis_starting_point.number*i + y_axis_starting_point.suffix, 8, grid_size*i+3);
    }

    // Ticks marks along the negative Y-axis
    // Negative Y-axis of graph is positive Y-axis of the canvas
    for(i=1; i<x_axis_distance_grid_lines; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000000";

        // Draw a tick mark 6px long (-3 to 3)
        ctx.moveTo(-3, -grid_size*i+0.5);
        ctx.lineTo(3, -grid_size*i+0.5);
        ctx.stroke();

        // Text value at that point
        ctx.font = '9px Arial';
        ctx.textAlign = 'start';
        ctx.fillText(y_axis_starting_point.number*i + y_axis_starting_point.suffix, 8, -grid_size*i+3);
    }
}

/*-------------------------------------------------------------------*/


drawArrow(point);
drawClient(point);

// for(let p of point){
//     let color = getColor(p.parentNode.classList[1]);
//     let parentColor = getColor(p.parentNode.parentNode.parentNode.classList[1]);
//     let pos = getPos(p.innerText);
//     let text = p.parentNode.children[1].innerHTML;

//     if(prevPos == null)
//         prevPos = pos;
    
//     if(parentColor == null)
//         prevParentColor = parentColor;

//     if(prevPos != pos && parentColor === prevParentColor){
//         ctx.beginPath();
//         ctx.strokeStyle = parentColor;
//         arrow(ctx, prevPos[0]*grid_size, -prevPos[1]*grid_size, pos[0]*grid_size, -pos[1]*grid_size);
//         ctx.stroke();
//         prevPos = pos;
//     }
//     else{
//         prevParentColor = parentColor;
//         prevPos = pos;
//     }
    
//     ctx.beginPath();
//     ctx.arc(pos[0]*grid_size,-pos[1]*grid_size,10,0,2*Math.PI);
//     ctx.fillStyle = color;
//     ctx.fill();

//     ctx.beginPath();
//     ctx.font = '10px Arial';
//     ctx.fillStyle = '#000000';
//     ctx.fillText(text, pos[0]*grid_size - 6,-pos[1]*grid_size + 4);
//     ctx.fill();


// }

function getPos(text){
    let pos = text.split(',');
    return [parseInt(pos[0].replace('(', ''), 10), parseInt(pos[1].replace(')', ''), 10)];
}

function getColor(c){
    switch(c){
        case "gray":
            return '#7D6B7D';
        case "light_blue":
            return '#07B0F2';
        case "pink":
            return '#F2AB91';
        case "salmon":
            return '#FF8C64';
        case "yellow":
            return '#F2B705';
        case "purple":
            return '#AD84BF';
    }
    return '#000000';
}

function arrow(context, fromx, fromy, tox, toy) {
    var headlen = 10; // length of head in pixels
    var dx = tox - fromx;
    var dy = toy - fromy;
    var angle = Math.atan2(dy, dx);
    context.lineWidth = 3;
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    context.moveTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
}

function drawArrow(){
    for(let p of point){
        let parentColor = getColor(p.parentNode.parentNode.parentNode.classList[1]);
        let pos = getPos(p.innerText);
    
        if(prevPos == null)
            prevPos = pos;
        
        if(parentColor == null)
            prevParentColor = parentColor;
    
        if(prevPos != pos && parentColor === prevParentColor){
            ctx.beginPath();
            ctx.strokeStyle = parentColor;
            arrow(ctx, prevPos[0]*grid_size, -prevPos[1]*grid_size, pos[0]*grid_size, -pos[1]*grid_size);
            ctx.stroke();
            prevPos = pos;
        }
        else{
            prevParentColor = parentColor;
            prevPos = pos;
        }
    }
}

function drawClient(){
    for(let p of point){
        let color = getColor(p.parentNode.classList[1]);
        let pos = getPos(p.innerText);
        let text = p.parentNode.children[1].innerHTML;

        ctx.beginPath();
        ctx.arc(pos[0]*grid_size,-pos[1]*grid_size,10,0,2*Math.PI);
        ctx.fillStyle = color;
        ctx.fill();

        ctx.beginPath();
        ctx.font = '10px Arial';
        ctx.fillStyle = '#000000';
        ctx.fillText(text, pos[0]*grid_size - 6,-pos[1]*grid_size + 4);
        ctx.fill();
    }
}

// module.exports = {
//     refhesh: function (){
//     ctx.setTransform(1, 0, 0, 1, 0, 0);
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     drawCoorAxis();
//     prevPos = null;
//     prevParentColor = null;
//     point = document.querySelectorAll('p');
//     drawArrow(point);
//     drawClient(point);
//     return 0;
//     }
// }

function refhesh(){
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCoorAxis();
    prevPos = null;
    prevParentColor = null;
    point = document.querySelectorAll('p');
    drawArrow(point);
    drawClient(point);
    return 0;
}

export{ refhesh };
