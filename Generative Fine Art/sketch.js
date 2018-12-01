var seeds = [272.3448, 
             144.5241, 
             955.2765, 
             41.3571, 
             856.3812, 
             983.1176, 
             623.3903];//noiseSeeds

function setup() { 
  createCanvas(800, 600);
  colorMode(HSL);
  background(0,0,20);

  fill(0,0,20);
  strokeWeight(2);
  stroke(50, 60, 60);
  
  grids();
  pumpkin(80,160,0,-15);
  pumpkin(85,160,-50,-5);
  pumpkin(85,160,50,-5);
  pumpkin(85,160,-100,10);
  pumpkin(85,160,100,10);
  pumpkin(85,160,-50,15);
  pumpkin(85,160,50,15);
  stem(20,40,20,-150);
  pumpkin(80,160,0,30);
}
  
function grids(){
  //grid system
  var row = 30;
  var column = 30;
  var moduleW = width/column;
  var moduleH = height/row;
  var x = 0;
  var y = 0;
  var points = [];
  
  for(var i0 = 0; i0 < column + 1; i0 ++ ){
    x = x + i0 * moduleW;
		for(var i1 = 0; i1 < row + 1; i1 ++ ){
      y = y + i1 * moduleH;
      var n = noise(i0, i1);
      var m = map(n, 0 ,1, -20, 20);
      points.push(createVector(x + m, y + m));
      y = 0;
    }
    x = 0;
  }
  
  var counter1 = 0;
  var counter2 = 0;
  for(var j = 0; j < points.length - 1; j ++ ){
    var v1 = points[j];
    var v2 = points[j + 1];
    if(j < points.length  - (row + 1) ){
       v3 = points[j + (row + 1)];
      if(counter2 < column){
      	line(v1.x, v1.y, v3.x, v3.y);
      	counter2 ++ ;
    	}else{
      	counter2 = 0;
    	}
    } 
    if(counter1 < row){
      line(v1.x, v1.y, v2.x, v2.y);
      counter1 ++ ;
    }else{
      counter1 = 0;
    }    
    
  }
}

function pumpkin(a,b,x,y){
 //pumpkin
  	push();
  		translate(width/2 + x, height/2 + y);
  		fill(50, 60, 60);
  		noStroke();
  
    	var k = random(seeds);
  		noiseSeed(k);
  		console.log(k);
  
    	//body of the pumpkin
  		beginShape();
        for(var p1 = 0; p1 < width/4; p1 ++ ){
          var n1 = noise(p1/50);
          var d1 = map(n1, 0, 1, -15, 15);
          var r1 = map(p1, 0, width/4, 0, PI);
          var x1 = a * cos(r1);
          var y1 = sqrt(sq(b) - (sq(b)/sq(a)) * sq(x1));
          vertex(x1 + d1, y1);
        }
  			for(var p2 = width/4; p2 > 0; p2 -- ){
          var n2 = noise(p2/50);
          var d2 = map(n2, 0, 1, -15, 15);
          var r2 = map(p2, 0, width/4, 0, PI);
          var x2 = a * cos(r2);
          var y2 = -sqrt(sq(b) - (sq(b)/sq(a)) * sq(x2));
          vertex(x2 + d2, y2);
        }
  		endShape();
  		
  		//pattern
  		fill(0,0,20);
			noStroke();
  
  		var r1 = 20;
  		for(var i1 = -b; i1 < b; i1 += r1){
        if(i1 > -b && i1 < (b - 0)){
          var n = noise(abs(i1)/70);
        	var d = map(n, 0, 1, 0.55, 0.98) * r1;
          var rad = map(i1, -b, b, PI/10, PI - PI/10);
          var x1 = sin(rad) * 0 * 0.8;
          var v = map(n, 0, 1, -5, 5);
          ellipse(x1 + v, i1, d);
      	}
      }
  		
  		var r2 = 16;
  		for(var i2 = -b; i2 < b; i2 += r2){
        if(i2 > -b && i2 < (b - 0)){
          var n = noise(abs(i2)/70);
        	var d = map(n, 0, 1, 0.55, 0.98) * r2;
          var rad = map(i2, -b, b, PI/10, PI - PI/10);
          var x1 = sin(rad) * r2 * 0.8;
          var x2 = -x1;
          var v = r1/2 + map(n, 0, 1, -5, 5);
          ellipse(x1 + v, i2, d);
          ellipse(x2 - v, i2, d);
      	}
      }
  
  		var r3 = 12;
  		for(var i3 = -b; i3 < b; i3 += r3){
        if(i3 > -b + r3 && i3 < (b - r3)){
          var n = noise(abs(i3)/70);
        	var d = map(n, 0, 1, 0.5, 0.98) * r3;
          var rad = map(i3, -b, b, PI/12, PI - PI/12);
          var x1 = sin(rad) * r3 * 2;
          var x2 = -x1;
          var v = (r1 + r2)/2 + map(n, 0, 1, -5, 5);
          ellipse(x1 + v, i3, d);
          ellipse(x2 - v, i3, d);
      	}
      }
  
  		var r4 = 8;
  		for(var i4 = -b; i4 < b; i4 += r4){
        if(i4 > -b + r4 * 2 && i4 < (b - r4 * 2)){
          var n = noise(abs(i4)/70);
        	var d = map(n, 0, 1, 0.5, 0.98) * r4;
          var rad = map(i4, -b, b, PI/10, PI - PI/10);
          var x1 = sin(rad) * r4 * 4;
          var x2 = -x1;
          var v = (r1 + r2 + r3)/2 + map(n, 0, 1, -5, 5);
          ellipse(x1 + v, i4, d);
          ellipse(x2 - v, i4, d);
      	}
      }
  
  		var r5 = 6;
  		for(var i5 = -b; i5 < b; i5 += r5){
        if(i5 > -b + r5 * 5 && i5 < (b - r5 * 5)){
          var n = noise(abs(i5)/70);
        	var d = map(n, 0, 1, 0.5, 0.98) * r5;
          var rad = map(i5, -b, b, PI/13, PI - PI/13);
          var x1 = sin(rad) * r5 * 6.5;
          var x2 = -x1;
          var v = (r1 + r2 + r3 + r4)/2 + map(n, 0, 1, -7, 7);
          ellipse(x1 + v, i5, d);
          ellipse(x2 - v, i5, d);
      	}
      }
  
  		var r6 = 4;
  		for(var i6 = -b; i6 < b; i6 += r6){
        	if(i6 > -b + r6 * 6 && i6 < (b - r6 * 6)){
            var n = noise(abs(i6)/70);
            var d = map(n, 0, 1, 0.5, 0.98) * r6;
            var rad = map(i6, -b, b, PI/15, PI - PI/15);
            var x1 = sin(rad) * r6 * 11;
            var x2 = -x1;
            var v = (r1 + r2 + r3 + r4 + r5)/2 + map(n, 0, 1, -6, 6);
            ellipse(x1 + v, i6, d);
            ellipse(x2 - v, i6, d);
      		}
      }
  	pop(); 
}

function stem(a,b,r,y){
  push();
    translate(width/2, height/2 + y);
  	rotate(radians(r));
  	noStroke();
  	beginShape();
        for(var p1 = 0; p1 < width/4; p1 ++ ){
          var n1 = noise(p1/50);
          var d1 = map(n1, 0, 1, -15, 15);
          var r1 = map(p1, 0, width/4, 0, PI);
          var x1 = a * cos(r1);
          var y1 = sqrt(sq(b) - (sq(b)/sq(a)) * sq(x1));
          vertex(x1 + d1, y1);
        }
  			for(var p2 = width/4; p2 > 0; p2 -- ){
          var n2 = noise(p2/50);
          var d2 = map(n2, 0, 1, -15, 15);
          var r2 = map(p2, 0, width/4, 0, PI);
          var x2 = a * cos(r2);
          var y2 = -sqrt(sq(b) - (sq(b)/sq(a)) * sq(x2));
          vertex(x2 + d2, y2);
        }
  		endShape();
  pop();
}