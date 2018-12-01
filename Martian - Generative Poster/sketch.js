function setup() {
  createCanvas(600,800); 
  colorMode(HSL);
  noStroke();
  background(0,0,15);
  
  var k = -height/width;
  var b = height;
  
  var xm, ym;//x y location of Mars
  var rm;//radius of Mars
  var xe, ye;//x y location of Earth
  var re;//radius of Earth
  var xv,yv;//location of the spaceship and its shadow
  var dv;//diameter of the spaceship
  var rv;//radius of the spaceship
  var t;//transparancy of the spaceship
  
  var colorM1 = color(random(10,30),70,50);//colorMars1
  var colorM2 = color(random(10,30),70,30);//colorMars2
  var colorE = color(random(190,200),80,60);//colorEarth
  var colorL = [];//clors of land
  var colorS = [];//colors of stars
  
  for(i = 0; i < 4; i ++ ){
    if (i == 0 || i ==1){
      var newColor = color(random(40,140),random(40,70),100);//colorLand-pole
      colorL.push(newColor);
    }else if(i > 1 ){
      var newColor = color(random(80,120),random(50,70),65);//colorLand-land
      colorL.push(newColor);
    }
  }
  
  for(i = 0; i< 8; i++){
    var newColor = color(random(240,280),random(60,80),random(80,85));
    colorS.push(newColor);
  }
  
  xm = -0.1 * width;
  ym = k * xm + b;
  rm = 1.6 * height;
  
  xe = 0.94 * width;
  ye = k * xe + b;
  re = 0.06 * height;
  
  xv = 0.8 * width;
  yv = k * xv + b;
  rv = 6;
  t = 1;
  
  //the stars
  for (i = 0; i < 250; i++){
    var xs = random(0,width);
    var ys = random(0,height);
    var rs = random(0.5,2.5);
    fill(random(colorS));
    ellipse(xs,ys,rs,rs);
  }
  
  //the spaceship
  for (i=0; i <10; i++){
     //transparancy
    fill(100,100,100,t);
    ellipse(xv,yv,rv,rv);
    rv = rv - 0.5;
    xv = xv + rv;
    yv = k * xv + b;
    t = t * 0.8;
  }
  
  //Mars
  push();
    translate(width/2,height/2);
    rotate(radians(-15));
    for(i = 20; i > 0; i--){
      var a = ceil(i/2);
      var b = i/2;
      var c = a - b;//to tell whether i is odd/even
      var x1 = random(xm - width/2,xm - width*0.45);//x location of every ellipse
      var y1 = random(ym - height/2,ym - height*0.48);//y location of every ellipse
      if(c == 0){
        fill (colorM1);
        ellipse(x1,y1,rm);
        rm = rm - 50;
      }else if(c != 0){
        fill (colorM2);
        ellipse(x1,y1,rm);
        rm = rm - 50;
      }
    }
  pop();
  //The rocks on Mars
  
  //Earth
  fill(colorE);
  ellipse(xe,ye,re);
  //the land on earth
  push();
    translate(xe,ye);
    var xl1,yl1,xl2,yl2,xl3,yl3;
    var rl = 0.5 * re;
    
    //land1-NORTH POLE
    fill(colorL[0]);
    beginShape();
    for (i=210; i <280; i++){
      xl1 = cos(radians(i)) * rl;
      yl1 = sin(radians(i)) * rl;
      vertex(xl1,yl1);
    }
    for(i = 280; i > 210; i-=15){
      if(i == 300 || i == 210){
        var r1 = random(rl * 0.85, rl * 0.95);
        xl1 = cos(radians(i)) * r1;
        yl1 = sin(radians(i)) * r1;
        vertex(xl1,yl1);
      }else{
        var r1 = random(rl * 0.8, rl * 0.9);
        xl1 = cos(radians(i)) * r1;
        yl1 = sin(radians(i)) * r1;
        vertex(xl1,yl1);
      }
    }
    endShape();
    
    //land2-SOUTH POLE
    fill(colorL[1]);
    beginShape();
    for (i = 30; i < 70; i++ ){
      xl3 = cos(radians(i)) * rl;
      yl3 = sin(radians(i)) * rl;
      vertex(xl3,yl3);
    }
    for(i = 70; i > 30; i-=10 ){
      if(i == 90 || i == 30){
        var r3 = random(rl * 0.85, rl * 0.95);
        xl3 = cos(radians(i)) * r3;
        yl3 = sin(radians(i)) * r3;
        vertex(xl3,yl3);
      }else{
        var r3 = random(rl * 0.8, rl * 0.9);
        xl3 = cos(radians(i)) * r3;
        yl3 = sin(radians(i)) * r3;
        vertex(xl3,yl3);
      }
    }
    endShape();
    //land3-right
    fill(colorL[2]);
    beginShape();
    for (i=-65; i <5; i++){
      xl2 = cos(radians(i)) * rl;
      yl2 = sin(radians(i)) * rl;
      vertex(xl2,yl2);
    }
    for(i = 5; i > -65; i-=10){
      if(i == 5 || i == -65){
        var r2 = random(rl * 0.8, rl * 0.9);
        xl2 = cos(radians(i)) * r2;
        yl2 = sin(radians(i)) * r2;
        vertex(xl2,yl2);
      }else{
        var r2 = random(rl * 0.6, rl * 0.7);
        xl2 = cos(radians(i)) * r2;
        yl2 = sin(radians(i)) * r2;
        vertex(xl2,yl2);
      }
    }
    endShape();
    
    //land4 CENTER
    fill(colorL[3]);
    push();
    translate(-0.2 * rl,0.1 * rl);
    beginShape();
    for (i = 0; i < 360; i+=20 ){
      if((i >= 100 && i <= 120) || (i >= 220 && i <= 280) ){
        var r5 = random(0.55,0.68) * rl;
        xl5 = cos(radians(i)) * r5;
        yl5 = sin(radians(i)) * r5;
        vertex(xl5,yl5);
      }else{
        var r5 = random(0.3,0.4) * rl;
        xl5 = cos(radians(i)) * r5;
        yl5 = sin(radians(i)) * r5;
        vertex(xl5,yl5);
      }
    }
    endShape();
    pop();
  pop();
  

}