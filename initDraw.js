var canvas;
var ctx;
var dragging = false;
var dragStartPoint;
var imgData;
 
function getCanvasCoordinates(event){
    var x = event.clientX - canvas.getBoundingClientRect().left;
    var y = event.clientY - canvas.getBoundingClientRect().top;
	return {x: x, y: y};
}

function copy(){
    imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function paste(){
    ctx.putImageData(imgData, 0, 0);
}
  
function drawRect(position){
	ctx.beginPath();
    ctx.rect(position.x, position.y, dragStartPoint.x - position.x, dragStartPoint.y - position.y);
    ctx.fill();
} 

function draw(position) {
	var  shape = document.querySelector('input[type="radio"][name="shape"]:checked').value;
    if (shape === "rect"){
        drawRect(position);
    }   
}

function randomColor( ){  
    var r = Math.round(Math.random( )*256);
    var g = Math.round(Math.random( )*256);
    var b = Math.round(Math.random( )*256);
	return 'rgb( ' + r + ',' + g + ',' + b + ')';
}

function dragStart(event){
    dragging = true;
    dragStartPoint = getCanvasCoordinates(event);
    copy();
}

function drag(event){
    var position;
    if (dragging === true){
        paste();
        position = getCanvasCoordinates(event);
        ctx.fillStyle = randomColor( );
        draw(position);
    }
}

function dragStop(event){
    dragging = false;
    paste();
    ctx.fillStyle = randomColor( );
    var position = getCanvasCoordinates(event);
    draw(position);
}  

function init(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d');
   
    canvas.addEventListener('mousedown', dragStart, false);
    canvas.addEventListener('mousemove', drag, false);
    canvas.addEventListener('mouseup', dragStop, false);
    document.getElementById("btnClear").addEventListener('mousedown',function(){
    ctx.clearRect(0,0,canvas.width, canvas.height); 
});  
}


window.addEventListener('load', init, false);
