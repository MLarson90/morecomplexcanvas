var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = document.getElementById("myCanvas"),
    ctx = c.getContext("2d");

var mouse = {
  x: undefined,
  y: undefined
}
maxRadius = 40;
minRadius = 2;

var colorArray = ['#F2385A', '#F5A503', '#E9F1DF', '#4AD9D9', '#36B1BF'];
window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
})
window.addEventListener('resize', function(event){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
})

function Circle(x, y, dx, dy, radius){
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
  this.draw = function(){
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.radius, 0 ,Math.PI*2);
    ctx.fillStyle = this.color;
    ctx.stroke();
    ctx.fill();
  }
  this.update = function(){
    if(this.x + this.radius > innerWidth || this.x - this.radius < 0 ) {
      this.dx = -this.dx;
    }
    if( this.y + this.radius > innerHeight || this.y - this.radius < 0){
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;
    //inneractivity
    if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y <50 && mouse.y - this.y > -50){
      if(this.radius < maxRadius){
        this.radius += 1;
      }
    }else if (this.radius > this.minRadius){
      this.radius -= 1;
    }

    this.draw();
  }
}

var circlesArray= [];
function init(){
  circlesArray =[];
  for(var i=0; i<900; i++){
    var radius = Math.random() * 10 + 1;
    var x = Math.random() * (innerWidth -radius *2) + radius;
    var y = Math.random() * (innerHeight -radius *2) + radius;
    var dx = (Math.random() - 0.5) * 8;
    var dy = (Math.random() - 0.5) * 8;
    circlesArray.push(new Circle(x,y,dx,dy,radius));
  }

}
init();
function animate(){
  requestAnimationFrame(animate);
  ctx.clearRect(0,0,innerWidth,innerHeight);
  for(var i =0; i<circlesArray.length; i++){
    circlesArray[i].update();
  }

}

animate();
