var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var g = -1;
var jPower = 25;
var yv = 0;
var x = 675;
var y = 200;
var d;
var keys = [];
var cs = 1;
var plats = [];
var dif = [];
var drawClouds = function (xPos, yPos) {
    for(var i = -10000; i < 10000; i+= 1000){
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.ellipse(xPos-75 + i, yPos-70, 100, 50, 0, 0, 2*Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(xPos+75 + i, yPos-70, 100, 50, 0, 0, 2*Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(xPos + i, yPos-100, 120, 65, 0, 0, 2*Math.PI);
        ctx.fill();        
    }
};

for(var v = 0; v < 50; v++){
    plats[v] = {
        x: Math.floor(400 * Math.random()) + Math.floor(400 * Math.random()),
        y: -275 * v + 287.5, 
        };
    Math.rt
}

for(var s = 0; s < 50; s++){
    dif[s] = 675 - plats[s].x; 
}

var drawPlats = function(xPos, yPos){
    for(var g = 1; g < 50; g++){ 
    ctx.fillStyle = "#ffd700";
    ctx.fillRect(xPos + plats[g].x, yPos + plats[g].y, 200, 30);
    }
};

var drawBackground = function(xPos, yPos){
        //sky
    ctx.fillStyle = "#7ec0ee";
    ctx.fillRect(-10000, -10000, 20000, 20000);
    drawClouds(xPos, yPos);
        //ground
    ctx.fillStyle = "#7cfc00";
    ctx.fillRect(xPos-10000, yPos+200, 20000, 200);
        //walls
    ctx.fillStyle = "grey";
    ctx.fillRect(xPos + 5715, 0, 1350, 500);
    ctx.fillRect(xPos -5715, 0, 1350, 500);
        //platforms
    drawPlats(xPos, yPos);
};


var faceRight = function(x, y){
        //body
    ctx.fillStyle = "red";
    ctx.fillRect(x-20, y-30 , 40, 60);
        //overalls
    ctx.fillStyle = "#1560bd";
    ctx.fillRect(x-15, y-5, 35, 35);
    ctx.fillRect(x-20, y+30, 10, 30);
    ctx.fillRect(x+5, y+30, 10, 30);
        //button
    ctx.fillStyle = "#ffd700";
    ctx.beginPath();
    ctx.arc(x+12.5, y+2.5, 5, 0, 2*Math.PI);
    ctx.fill();
        //head
    ctx.fillStyle = "yellow";
    ctx.fillRect(x-25, y-55, 50, 45);
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(x+20, y-30, 2.5, 0, 2*Math.PI);
    ctx.fill();
        //hat
    ctx.fillStyle = "red";
    ctx.fillRect(x-25, y-60, 60, 20);
        //shoes
    ctx.fillStyle = "#663300";
    ctx.fillRect(x-20, y+55, 20, 7.5);
    ctx.fillRect(x+5, y+55, 20, 7.5);
        //arms
    ctx.fillStyle = "red";
    ctx.fillRect(x-25, y-5, 5, 35);
};

var faceLeft = function(x, y){
        //body
    ctx.fillStyle = "red";
    ctx.fillRect(x-20, y-30 , 40, 60);
        //overalls
    ctx.fillStyle = "#1560bd";
    ctx.fillRect(x-20, y-5, 35, 35);
    ctx.fillRect(x-15, y+30, 10, 30);
    ctx.fillRect(x+10, y+30, 10, 30);
        //button
    ctx.fillStyle = "#ffd700";
    ctx.beginPath();
    ctx.arc(x-12.5, y+2.5, 5, 0, 2*Math.PI);
    ctx.fill();
        //head
    ctx.fillStyle = "yellow";
    ctx.fillRect(x-25, y-55, 50, 45);
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(x-20, y-30, 2.5, 0, 2*Math.PI);
    ctx.fill();
        //hat
    ctx.fillStyle = "red";
    ctx.fillRect(x-35, y-60, 60, 20);
        //shoes
    ctx.fillStyle = "#663300";
    ctx.fillRect(x, y+55, 20, 7.5);
    ctx.fillRect(x-25, y+55, 20, 7.5);
        //arm
    ctx.fillStyle = "red";
    ctx.fillRect(x+20, y-5, 5, 35);
};



var drawVito = function(x, y){
    if(cs===1){
        faceRight(x, y);
    }
    if(cs===2){
        faceLeft(x, y);
    }
};


var direction = function (event) {
    
    if (event.keyCode === 65 || event.keyCode === 37) {
        d = "LEFT";
    } else if (event.keyCode === 87 || event.keyCode === 38) {
        d = "UP";
    } else if (event.keyCode === 68 || event.keyCode === 39) {
        d = "RIGHT";
    }
};


var keysPressed = function (e){
    keys[e.keyCode] = true;
}

var keysReleased = function (e){
    keys[e.keyCode] = false;
}

document.addEventListener("keydown", keysPressed);
document.addEventListener("keyup", keysReleased);
document.addEventListener("keydown", direction);

var platCheck = function(){
    for (var f = 1; f < 50; f++){
        if(y <= -1 * plats[f].y + 487.5 && y >= -1 * plats[f].y + 482.5 && x >= 475 - plats[f].x && x <= 675 - plats[f].x){
            return true;
        }
    }
};

var draw = function(){
    
    if(d === "RIGHT"){
    cs = 1;
    }
    if(d === "LEFT"){
    cs = 2;
    }
    
    if (y > 200){
        yv += g;
    }
    if((y <= 200 || platCheck()) && yv <= 0){
         yv = 0;
        if(keys[87] || keys[38]){
            yv += jPower;
        }
    }
    if((keys[65] || keys[37]) && x < 5010){
        x+= 10;
    }
    if((keys[68] || keys[39]) && x > -5010){
        x-= 10;
    }
    y+= yv;
    
    if (y < 200){
        y = 200;
    }
    drawBackground(x, y);
    drawVito(675, 425);

};

draw();
let game = setInterval(draw, 1000/40);