// noprotect

var colors;

function setup() { 
  createCanvas(1000, 1000);
  colorMode(HSL);
  background(0,0,100);
  
  colors = [
    {
      light: color(40,40,50),
      dark: color(40,40,70),
    },//general
    
    {
      light: color(50,80,70),
      dark: color(50,60,20),
    },//Feng Huang Dan Cong
    
    {
      light: color(55,70,75),
      dark: color(70,60,40),
    },//Liu An Gua Pian
    
    {
      light: color(30,80,65),
      dark: color(30,70,20),
    },//Zheng Shan Xiao Zhong
  ];
  
  // //draw pattern1
  // var size = 45;
  // for(var i = 0; i < height * 1.3; i += 2 * size * sin(radians(60))){
  //   for(var j = 0; j < width * 1.3; j += size){
  //       drawPattern1(j, i, size, 0);
  //       drawPattern1(j - size/2, i + size * sin(radians(60)), size, 0);
  //   }
  // }
  
  //draw pattern2
  var size = width/20;
  for(var i = 0; i < height * 1.2; i += size){
    for(var j = 0; j < width * 1.5; j += size * 2){
      drawPattern2(j, i, size, size/8, true);
      drawPattern2(j + size, i + size/2, size, size/8, true);
      drawPattern2(j - size, i + size/2, size, size/8, true);
    }
  }
  
  // var size = 50;
  // for(var i = 0; i < height * 1.5; i += 2 * size * sin(radians(60))){
  //   for(var j = 0; j < width * 1.5; j += size){
  //     drawPattern3(j, i, size);
  //     drawPattern3(j - size/2, i + size * sin(radians(60)), size);
  //   }
  // }

} 

function drawPattern1(x, y, size, counter){
  var dC = colors[2].dark;
  var lC = colors[2].light;
  var w = size * cos(radians(60)) * 2;
  var h = size * sin(radians(60));
  
  push();
  translate(x, y);
    noStroke();
    fill(dC);
		drawArc(0, 0, w, h/2, 0, size);
  	drawArc(-w/4, h/2, w, h/2, 240, size);
  	drawArc(w/4, h/2, w, h/2, 120, size);
  	fill(lC);
		drawArc(w/2, h, w, h/2, 180, size);
  	drawArc(w/4 , h/2, w, h/2, 300, size);
  	drawArc(3*w/4, h/2, w, h/2, 60, size);
  pop(); 
}

function drawArc(x, y, w, h, r, size){
  push();
  	translate(x, y);
  	rotate(radians(r));
    arc(0, 0, w, h/2, 0, PI);
  pop();
}//pattern1

function drawPattern2(x, y, size, spacing, odd){
  var dC = colors[3].dark;
  var lC = colors[3].light;
  var reset = size;
  
  push();
  translate(x, y);
    while(size > 0){
      if(odd){
        fill(lC);
      }else if(!odd){
        fill(dC);    
      }
      noStroke();
      beginShape();
      for(var i = 0; i < 360; i++){
        var x1 = size * cos(radians(i));
        var y1 = size * sin(radians(i));
        vertex(x1, y1);
      }
      endShape();
      size = size - spacing;
      odd = !odd;
		}
  
  size = reset;
  console.log(size);

  pop();
  
}//pattern2

// function drawPattern3(x, y, size){
//   var dC = colors[3].dark;
//   var lC = colors[3].light;
  
//   push();
//   translate(x, y);
  
//   fill(lC);
//   noStroke();
//   strokeWeight(3);
  
//   rectMode(CORNERS);
//   rect(0, 0, size * 2, size * 2);
  
//   fill(dC);
//   stroke(lC);
//   strokeCap(SQUARE);
//   strokeWeight(3);
  
//   //lt
//   arc(0, 0, size, size, 0, HALF_PI);
//   arc(0, 0, size * 2, size * 2, 0, HALF_PI);
//   //rt
//   arc(size * 2, 0, size * 2, size * 2, HALF_PI, PI);
//   arc(size * 2, 0, size, size, HALF_PI, PI);
//   //rd
//   arc(size * 2, size * 2, size, size, PI, PI * 1.5);
//   arc(size * 2, size * 2, size * 2, size * 2, PI, PI * 1.5);
//   //ld
//   arc(0, size * 2, size * 2, size * 2, PI * 1.5, TWO_PI);
//   arc(0, size * 2, size, size, PI * 1.5, TWO_PI);
  
//   arc(size * 0.75, 0, size/2, size/2, 0, PI);
//   arc(size * 1.25, 0, size/2, size/2, 0, PI);

//   arc(0, size * 0.75, size/2, size/2, -HALF_PI, HALF_PI);
//   arc(0, size * 1.25, size/2, size/2, -HALF_PI, HALF_PI);
  
//   arc(size * 0.75, size * 2, size/2, size/2, PI, TWO_PI);
//   arc(size * 1.25, size * 2, size/2, size/2, PI, TWO_PI);
  
//   arc(size * 2, size * 0.75, size/2, size/2, HALF_PI, 1.5 * PI);
//   arc(size * 2, size * 1.25, size/2, size/2, HALF_PI, 1.5 * PI);
  
//   pop();
// }

function drawPattern3(x, y, size){
  var dC = colors[3].dark;
	var lC = colors[3].light;
  
  push();
  translate(x, y);
  
  var w = size;
  var h = size * sin(radians(60));
  fill(dC);
  noStroke();
  triangle(0, 0, -w/2, h, w/2, h);
  triangle(0, 0, w, 0, w/2, h);
  fill(lC);
	//small tris
  		triangle(0, 0, -w/6, h/3, w/6, h/3);
  	push();
  	translate(-w/6, h/3);
  		triangle(0, 0, -w/6, h/3, w/6, h/3);
  	pop();
  	push();
  	translate(w/6, h/3);
  		triangle(0, 0, -w/6, h/3, w/6, h/3);
  	pop();
  	push();
  	translate(w/3, h/3 * 2);
  		triangle(0, 0, -w/6, h/3, w/6, h/3);
  	pop();
  	push();
  	translate(0, h/3 * 2);
  		triangle(0, 0, -w/6, h/3, w/6, h/3);
  	pop();
  	push();
  	translate(-w/3, h/3 * 2);
  		triangle(0, 0, -w/6, h/3, w/6, h/3);
  	pop();
  pop();
}