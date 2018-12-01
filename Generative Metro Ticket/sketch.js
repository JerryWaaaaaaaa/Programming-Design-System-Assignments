//the colors of the lines

var colors = {
 
  theBund:{
    Hue: 40,//the hue of the color
	  Sat: 80,//the saturation
	  Lightness: [0,10,20,30,40,50,60,70,80,90,100]
  },
  
	lujiazui:{
	  Hue: 200,//the hue of the color
	  Sat: 70,//the saturation
	  Lightness: [0,10,20,30,40,50,60,70,80,90,100]
  },
  
  xujiahui:{
	  Hue: 260,//the hue of the color
	  Sat: 30,//the saturation
	  Lightness: [0,10,20,30,40,50,60,70,80,90,100]
  },
}

//set of the color
  var h;
  var s;
  var l;
	
	var stations;
//the name of the tourist attractions
  var lujiazui = [
    "东方明珠-",
    "陆家嘴",
    "金茂大厦-",
    "环球金融中心-",
    "上海中心-",
    "国际金融中心-",
    "正大广场-",
    "香格里拉大酒店-",
    "滨江大道-",
    "豫园-",
    "上海海洋馆-",
  ];
  
  var bund = [
    "外滩观光隧道-",
    "黄浦公园-",
    "外滩-",
    "外白渡桥-",
    "陈毅广场-",
    "十六铺-",
    "外滩十八号-",
    "各国领事馆-",
  ];
  
  var xujiahui = [
    "徐汇天主教堂-",
    "徐汇中学-",
    "衡山路-",
    "马勒别墅-",
    "新天地-",
    "交通大学-",
    "徐汇公园-",
    "法租界-"
  ];
    
//the size of the card
var cardWidth = 85.6;
var cardHeight = 53.98;
var canvasWidth = 5 * cardWidth;
var canvasHeight = 5 * cardHeight;

//parameters of the grids
var column = 10;
var row = 10;
var moduleWidth = canvasWidth/column;
var moduleHeight = canvasHeight/column;
var grids = [];

function preload() {
  simplified = loadFont('fangzhengshusong.ttf');
  traditional = loadFont('fangzhengtiejin.ttf');
  logo = loadImage("logo.png");
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  colorMode(HSL);
  
  var drawBuildings = [
  drawBuilding1,
  drawBuilding2,
  drawBuilding3,
	drawBuilding4,
  drawBuilding5,
  drawBuilding6,
  drawBuilding7,
  drawBuilding8
  ]
  
  var r = random(0, drawBuildings.length);//random select a number
  var n = ceil(r)-1;//number for array
  
  if(n >= 0 && n <= 2){
    h = colors.lujiazui.Hue;
    s = colors.lujiazui.Sat;
  	l = colors.lujiazui.Lightness;
    stations = lujiazui;

  }else if(n > 2 && n <= 5){
    h = colors.theBund.Hue;
    s = colors.theBund.Sat;
  	l = colors.theBund.Lightness; 
    stations = bund;
  }else if( n > 5){
    h = colors.xujiahui.Hue;
    s = colors.xujiahui.Sat;
  	l = colors.xujiahui.Lightness; 
    stations = xujiahui;     
  }
  
  background(h, s, 98);
  setupGrids();
  push();
  	drawBack();
  pop();  
  console.log("length" + n);
  drawBuildings[n]();
  //drawGrids();
  drawMargin();
} 


function setupGrids(){ //to set up grids

  for(var i1 = 0; i1 < column; i1 ++ ){
    for (var j1 = 0; j1 < row; j1 ++ ){
      var x = i1 * moduleWidth;
      var y = j1 * moduleHeight;
      grids.push({
        p: createVector(x,y),
        w: moduleWidth,
        h: moduleHeight    
      });
    }
  }
}

function drawGrids(){ //to draw the grids
    for(var i2 = 0; i2 < grids.length; i2 ++ ){
    var g = grids[i2];
    rectMode(CORNER);
    noFill();
    stroke(20,100,0);
    strokeWeight(0.5);
    rect(g.p.x, g.p.y, g.w, g.h);
  }
}

function drawBack(){
  //background color
  rectMode(CORNER);
  stroke(h,s,l[5]);
  strokeWeight(2);
  fill(h, s, l[9]);
  rect(0, canvasHeight/2, canvasWidth, canvasHeight/2);
  
  //the characters
  var tS = 20;//textSize
  var tW = 0;
  var tH = 0;
  //textFont("Verdana");
  textFont(traditional);
	textStyle(NORMAL);
  textSize(tS);
  fill(h, s, l[5]);
  strokeWeight(0.3);
  	for(var i = 0; i < stations.length; i++){
			//draw the characters
      var c = stations[i];
      var d = textWidth(c);
      text(c, 5, canvasHeight/2 + tS * 1.1);
      tW = tW + d;    
      //restart the loop
			if(i == (stations.length - 1)){
         i = 0;
      }
      //changing rows
      if(tW >= canvasWidth){
      	translate(-tW+d, tS);
        tW = 0;
        tH = tH + tS;
    	}else{
        translate(d,0);
      }
      //quit loop
      if(tH >= (canvasHeight / 2 - tS)){
        i = stations.length;
      }   
  	}
}

function drawMargin(){
  push();
    translate(canvasWidth/2, canvasHeight/2);
    var w1 = canvasWidth/2;
    var h1 = canvasHeight/2;
    var w2 = 0.98 * w1;
    var h2 = 0.98 * h1;
    fill(h, s, l[10]);
    noStroke();
    beginShape();
      vertex(-w1,-h1);
      vertex(w1,-h1);
      vertex(w1,h1);
      vertex(-w1,h1);
        beginContour();
          vertex(-w2,-h2);
          vertex(-w2,h2);
          vertex(w2,h2);
          vertex(w2,-h2);
        endContour();
    endShape();
  pop();
  push();
  	translate(w1 - w2, h1 - h2);
  	drawLogo();
    fill(h, s, l[2])
		textFont(traditional);
		textSize(30);
  	text("三日票",canvasWidth/15,canvasHeight/11);
  pop();
}

function drawLogo(){
  logo.resize(0, canvasHeight/10);
  image(logo,0,0);
}

function strokeSetting(){
  stroke(h, s, l[4]);
  strokeWeight(0.5);
  strokeCap(SQUARE);
}

function middleStrokeSetting(){
  stroke(h, s, l[4]);
  strokeWeight(1);
  strokeCap(SQUARE);
}

function thickStrokeSetting(){
  stroke(h, s, l[4]);
  strokeWeight(2);
  strokeCap(SQUARE);
}

function lightFillSetting(){
  noStroke();
  fill(h, s, l[6]);
}

function middleFillSetting(){
  noStroke();
  fill(h, s, l[5]);
}

function darkFillSetting(){
  noStroke();
  fill(h, s, l[4]);
}

//Buildings

//Lu jia zui
function drawBuilding1(){
  var bH = 0.618 * canvasHeight; // height of the building
  var bW = 0.3 * bH; //width of the building
  push();
    translate(canvasWidth/2, canvasHeight/2);
    noStroke();
    //the margin of the building
      var padding = 0.06 * bW;
      fill(h, s, l[10]);
      rectMode(CENTER);
      rect(0, 0, bW + padding, bH + padding);

    //light body part
      lightFillSetting();
      rectMode(CENTER);
      rect(0, 0, bW, bH);

    //dark body part
      darkFillSetting();
      beginShape();
        vertex(- bW / 2, - bH / 2);
        vertex(- bW / 2, bH / 2);
        vertex(0, bH / 2);
      endShape();

    //the empty space
      //Equition of the  line: y = 4x + bH/2 or x = (y - bH/2) / 4
        var padding1 = bW/8;
        var k = (bH/bW) * 2;
        //left-top point of the shape
        var ey1 = -bH/2.2; 
        var ex1 = (ey1 - bH/2)/k + padding1;
        var ey2 = ey1 + bH/k;
        var ex2 = (ey2 - bH/2)/k + padding1;

        fill(h,s,98);
        beginShape();
          vertex(ex1,ey1);
          vertex(bW/2-padding1, ey1);
          vertex(bW/2-padding1, ey2);
          vertex(ex2, ey2);
        endShape();

    //the patterns on the building
      var padding2 = bW/40;//the space between the vertex and the side
      var spacing2 = bH/20;
      //left
        for(var yi = -bH/2; yi < bH/2; yi += spacing2){
        var xi = (yi - bH/2)/k - padding2;
            if(xi > -bW/2 + padding2){
              strokeSetting();
              beginShape();
              line(-bW/2 + padding2 ,yi,xi,yi);
              endShape();
            }
        }
      //right
        for(var yi2 = (ey2 + spacing2); yi2 < (bH/2 - spacing2) ; yi2 += spacing2){
          var xi2 = (yi2 - bH/2)/k + padding1;
          strokeSetting();
          beginShape();
          line(bW/2 - padding1 ,yi2,xi2,yi2);
          endShape();
        }
  pop();
   
}//Shanghai World Financial Center

function drawBuilding2(){
  var bH = 0.618 * canvasHeight; // height of the building
  var bW = 0.5 * bH; //width of the building
  
  push();
    translate(canvasWidth/2, canvasHeight/2);

    var k1 = 10;
    var k2 = -10;
    var margin = bW/40;
    var padding = bW/20;
    var spacing = bH/30;
    var border = bW/35;
		//margins
        //the right body
        var yU0 = -bH/2 - border;
        var yD0 = bH/2 + border;
        var xU01 = yU0/k1 + border;
        var xU02 = (yU0+bH*1.5)/k1 + border;
        var xD01 = yD0/k1 + border;
        var xD02 = (yD0+bH*1.5)/k1 + border;

        noStroke();
        fill(h, s, l[10]);
        beginShape();
        vertex(xU01,yU0);
        vertex(xU02,yU0);
        vertex(xD02,yD0); 
        vertex(xD01,yD0);
        endShape();

        //the left body
        var yU00 = -bH/2.6 - border;
        var yD00 = bH/2 + border;
        var xU001 = yU00/k1 - border;
        var xU002 = (yU00+bH*1.5)/k2 - border;
        var xD001 = yD00/k1 - border;
        var xD002 = (yD00+bH*1.4)/k2 - border;

        noStroke();
        fill(h, s, l[10]);
        beginShape();
        vertex(xU001,yU00);
        vertex(xU002,yU00);
        vertex(xD002,yD00); 
        vertex(xD001,yD00);
        endShape();

    //the bottom color 
      darkFillSetting();
      rectMode(CENTER);
      var d = 0.8;
      rect(0, (1-d) * bH / 2,bW * d/2, bH * d);

    //the right body
      var yU1 = -bH/2;
      var yD1 = bH/2;
      var xU1 = yU1/k1 + margin;
      var xU2 = (yU1+bH*1.5)/k1;
      var xD1 = yD1/k1 + margin;
      var xD2 = (yD1+bH*1.5)/k1;

      lightFillSetting();
      beginShape();
      vertex(xU1,yU1);
      vertex(xU2,yU1);
      vertex(xD2,yD1); 
      vertex(xD1,yD1);
      endShape();

    //the left body
      var yU2 = -bH/2.6;
      var yD2 = bH/2;
      var xU21 = yU2/k1 - margin;
      var xU22 = (yU2+bH*1.5)/k2;
      var xD21 = yD2/k1 - margin;
      var xD22 = (yD2+bH*1.4)/k2;

      lightFillSetting();
      beginShape();
      vertex(xU21,yU2);
      vertex(xU22,yU2);
      vertex(xD22,yD2); 
      vertex(xD21,yD2);
      endShape();

    //the patterns
      //the right side
        var yU3 = -bH/3;
        var yD3 = -bH/4;
        var xU31 = yU3/k1 + margin + padding;
        var xU32 = (yU3+bH*1.5)/k1;
        var xD31 = yD3/k1 + margin + padding;
        var xD32 = (yD3+bH*1.5)/k1;

        for(var yi = -bH/2 + spacing; yi < bH/2 - spacing; yi += spacing){
          var xi1 = yi/k1 + margin + padding;
          var xi2 = (yi+bH*1.5)/k1 - padding * 0.2;
          strokeSetting();
          line(xi1,yi,xi2,yi);
        }

        //the right window
        darkFillSetting();
        beginShape();
        vertex(xU31,yU3);
        vertex(xU32,yU3);
        vertex(xD32,yD3); 
        vertex(xD31,yD3);
        endShape();

      //the left side
        var yU4 = -bH/3;
        var yD4 = -bH/5;
        var xU41 = yU4/k1 - margin - padding;
        var xU42 = (yU4+bH*1.5)/k2;
        var xD41 = yD4/k1 - margin - padding;
        var xD42 = (yD4+bH*1.4)/k2;

        for(var yi2 = -bH/3 + spacing; yi2 < bH/2 - spacing; yi2 += spacing){
          var xi21 = yi2/k1 - margin - padding;
          var xi22 = (yi2+bH*1.5)/k2 + padding * 0.2;
          strokeSetting();
          line(xi21,yi2,xi22,yi2);
        }

        //the left window
        darkFillSetting();
        beginShape();
        vertex(xU41,yU4);
        vertex(xU42,yU4);
        vertex(xD42,yD4); 
        vertex(xD41,yD4);
        endShape();
  pop();
}//Shanghai Tower

function drawBuilding3(){//Jin Mao Tower
  push();
    translate(canvasWidth/2, canvasHeight/2);
    var bH = 0.618 * canvasHeight; // height of the building
    var bW = 0.4 * bH; //width of the building
    var zoomIn = 0.95; //how much the body is smaller
    var zoomIn2 = 0.8;//how much the top is smaller

    //margin
      var tw01 = bW/2.6;//half tower width
      var tw02 = tw01 * 0.9;//smaller tower width
      var ph0 = 0.14;//the parameter taht decides the tower height
      var th01 = ph0 * bH;//tower height
      var ah0 = 0.05;//height of the angle
      var th02 = (ph0 - ah0) * bH;//the height without angle

      var left0 = [//left vectors
       createVector(-tw01, -th01),
       createVector(-tw02, -th02),
       createVector(-tw02, 0)
      ];
      var right0 = [//right vectors
       createVector(tw01, -th01),
       createVector(tw02, -th02),
       createVector(tw02, 0)
      ];

      var n0 =  ceil(1/ph0) - 1;//number of the body 
      //loop for a lot of bodys
          push();
            for(var i = 0; i < n0; i ++ ){
              fill(h, s, l[10]);
              noStroke();
              //the body 
              beginShape();
                vertex(left0[0].x,left0[0].y + bH/2);
                vertex(right0[0].x,right0[0].y + bH/2);
                vertex(right0[1].x,right0[1].y + bH/2);
                vertex(right0[2].x,right0[2].y + bH/1.95);
                vertex(left0[2].x,left0[2].y + bH/1.95);
                vertex(left0[1].x,left0[1].y + bH/2);
              endShape();

              //make the body smaller
              for(var k1 = 0; k1 < left0.length; k1++){
                right0[k1].x = right0[k1].x * zoomIn;
                right0[k1].y = right0[k1].y * zoomIn;
                left0[k1].x = left0[k1].x * zoomIn;
                left0[k1].y = left0[k1].y * zoomIn;
              }
              translate(0,left0[0].y);//move up the body 
            }		
          pop();

    //body
      var tw1 = bW/3;//half tower width
      var tw2 = tw1 * 0.9;//smaller tower width
      var ph = 0.14;//the parameter taht decides the tower height
      var th1 = ph * bH;//tower height
      var ah = 0.05;//height of the angel
      var th2 = (ph - ah) * bH;//the height without angel

      var left = [
       createVector(-tw1, -th1),
       createVector(-tw2, -th2),
       createVector(-tw2, 0)
        ];

      var right = [
       createVector(tw1, -th1),
       createVector(tw2, -th2),
       createVector(tw2, 0)
        ];

      var n =  ceil(1/ph) - 1;//number of the body 
      var bodyHeight = 0;
      console.log(n);
      //loop for a lot of bodys
        push();
          for(var i0 = 0; i0 < n; i0 ++ ){
            lightFillSetting();
            //the body 
            beginShape();
            vertex(left[0].x,left[0].y + bH/2);
            vertex(right[0].x,right[0].y + bH/2);
            vertex(right[1].x,right[1].y + bH/2);
            vertex(right[2].x,right[2].y + bH/2);
            vertex(left[2].x,left[2].y + bH/2);
            vertex(left[1].x,left[1].y + bH/2);
            endShape();

            //the pattern
              for(var k0 = 0; k0 < left.length; k0++){
                strokeSetting();
                  if(i != 0){
                    if(k0 != 0){
                      line(left[k0].x,left[k0].y + bH/2,right[k0].x,right[k0].y + bH/2);
                    }
                  }
              }

            //make the body smaller
            for(var k2 = 0; k2 < left.length; k2++){
              right[k2].x = right[k2].x * zoomIn;
              right[k2].y = right[k2].y * zoomIn;
              left[k2].x = left[k2].x * zoomIn;
              left[k2].y = left[k2].y * zoomIn;
            }
            translate(0,left[0].y); 
            bodyHeight = bodyHeight + abs(right[0].y - right[2].y);
          }		
        pop();

    //the top of the tower
      push();
      	translate(0,bH/2 - bodyHeight);//(0,0) - the top of the body
        var leftHeight = bH - bodyHeight;//the left height
        var topHeight = 0;
        var topH = th1 * 0.3;
        var topW = abs(right[2].x) * 2 * 0.48;
        var topW2 = abs(right[2].x) * 2 * 0.45;
        push();
          //loop to draw tops
          for(var i2 = 0; i2 < 3; i2 ++ ){
            //top
              lightFillSetting();
              beginShape();
                vertex(-topW, -topH); 
                vertex(topW, -topH);
                vertex(topW2, 0);
                vertex(-topW2, 0);
              endShape();
            //pattern
              strokeSetting();
              line(-topW, -topH,topW, -topH);
              line(topW2, 0, -topW2, 0);

              topHeight = topHeight + abs(topH);

              translate(0,-topH);
              topH = zoomIn2 * topH;
              topW = zoomIn2 * topW;
              topW2 = zoomIn2 * topW2;
          }
        pop();
  
        push();
          translate(0,-topHeight);
          //ellipse(0,0,20,20);
          var sH = bH - bodyHeight - topHeight;//sharp Height
          var sW = sH * 0.2;
          //sharp
          lightFillSetting();
          beginShape();
            vertex(-sW,0);
            vertex(0,-sH);
            vertex(sW,0);
          endShape();
          //left sharp
          beginShape();
          	vertex(-sW*1.5,0);
            vertex(-sW*2,-sH/2);
            vertex(0,0);
          endShape();
          //right sharp
          beginShape();
            vertex(sW*1.5,0);
            vertex(sW*2,-sH/2);
            vertex(0,0);
          endShape();
          //pattern
          strokeSetting();
          line(-sW*2,-sH/2,0,0);
          line(sW*2,-sH/2,0,0);
        pop();
      pop();

    push();
      translate(0, bH/2);
      darkFillSetting();
      beginShape();
        vertex(-sW,0);
        vertex(sW,0);
        vertex(sW, - (bodyHeight + topHeight - sH/2));
        vertex(0,- (bodyHeight + topHeight));
        vertex(-sW, - (bodyHeight + topHeight - sH/2));
      endShape();
    pop();

  pop();
  
}//JinMao Tower

//the bund
function drawBuilding4(){
  push();

  var bH = 0.618 * canvasHeight; // height of the building
  var bW = 0.8 * bH; //width of the building
  var move = bH/20;
  translate(canvasWidth/2, canvasHeight/2 + bH/2 - move);
  
  //baselines
    var x0 = 0;
    var xr1 = bW * 0.18;
    var xr2 = bW * 0.38;
    var xl1 = -xr1;
    var xl2 = -xr2;
    var baseLines = [x0, xr1, xr2, xl1, xl2];
  
  //margin
    var padding = bH/75;
    noStroke();
    fill(h, s, 100);
    rectMode(CORNERS);
    rect(-bW/2 - padding, 0 + padding, bW/2 + padding, -bH/2 - padding);
  
  //the body
    lightFillSetting();
    rectMode(CORNERS);
    rect(-bW/2,0,bW/2,-bH/2);
  
    //first floor
      var doorW = bW/16;//first floor
      var doorH = bH/13;
      var windowW = bW/20;//second floor window
      var windowH = bH/13;
      var windowW2 = bW/22;//third floor window
      var windowH2 = bH/30;
      var spacing = bH/20;
      var floor1 = bH/2 * 0.25;
      var floor2 = bH/2 * 0.25;
      var floor3 = bH/2 - floor1 - floor2;
      var n = ceil(floor3/(windowH2+spacing));//number of windows on 3rd floor
      darkFillSetting();
  
      //windows&doors
      for(var i = 0; i < baseLines.length; i ++ ){
          rect(baseLines[i] - doorW, 0, baseLines[i] + doorW, -doorH);
          rect(baseLines[i] - windowW, -floor1, baseLines[i] + windowW, -floor1-windowH);
          for(var j = 0; j < n; j ++ ){
            rect(baseLines[i] - windowW2, - floor1 - floor2 - j*spacing, baseLines[i] + windowW2, - floor1 - floor2 - j*spacing -windowH2);
          }
      }
  
  //patterns
    strokeSetting();
    for(var l = 0; l < 3; l++){
      line(-bW * 0.53,-floor1 + l*3,bW * 0.53,-floor1 + l*3);
      line(-bW * 0.53,-floor1-floor2 + l*3,bW * 0.53,-floor1-floor2 + l*3);
    }
  pop();
  
  push();
  translate(canvasWidth/2, canvasHeight/2 - move);
    //top bar of the body
      darkFillSetting();
      rectMode(CORNERS);
      rect(-bW * 0.55,0,bW * 0.55,bH * 0.05);
  	//top 
      var tW = bW * 0.2;//width of the top square
      var tH = bH * 0.1;

      for(var j2 = 0; j2 < baseLines.length; j2++){
    	//side
      var pH1 = 0.4 * tH;
      var pH2 = 0.3 * tH;
      if(j2 == 2 || j2 == 4){
          lightFillSetting();
          rect(baseLines[j2] - tW * 0.5, 0, baseLines[j2] + tW * 0.5, -tH); 
          darkFillSetting();
          rect(baseLines[j2] - tW * 0.3, 0, baseLines[j2] + tW * 0.3, -pH1); 
          arc(baseLines[j2], -tH * 0.4, pH2, pH2,PI, TWO_PI);

			//center
        //center bottom 
      }else if(j2 == 0){
          lightFillSetting();
          rect(baseLines[j2] - tW * 0.7, 0, baseLines[j2] + tW * 0.7, -tH); 
          darkFillSetting();
          var sw = 0.08 * tW; // square width
          var d = 0.3 * tW; //distance between the square
          rect(-sw,0,sw,-(pH1 + pH2));
          rect(-sw + d,0,sw + d,-(pH1 + pH2));
          rect(-sw - d,0,sw - d,-(pH1 + pH2));
        }
      	//center clock
      		lightFillSetting();
      		var cW = 0.5 * tW;
					rect(-cW, -tH, cW, -tH - cW*2);
      		rect(-cW/2, -tH - cW*2, cW/2, -tH - cW*3)
      		rect(-cW/6, -tH - cW*3, cW/6, -tH - cW*4)
      		darkFillSetting();
      		ellipse(0, -tH - cW, cW * 1.45, cW * 1.45);
    }
  pop();
  
}//the bund1

function drawBuilding5(){
  var bH = 0.618 * canvasHeight; // height of the building
  var bW = 0.9 * bH; //width of the building
  var move = bH * 0.05;
  
  push();
  translate(canvasWidth/2, canvasHeight/2 + bH/2 - move);
  
  //margin
    var padding = bH/55;
    var z = 1.03;
    noStroke();
    fill(h, s, l[10]);
    rectMode(CORNERS);
    rect(-bW/2 * z , padding, bW/2 * z, -bH/2);
  
  //the body
    lightFillSetting();
    rectMode(CORNERS);
    rect(-bW/2, 0, bW/2, -bH/2);
  
  //baselines
    var x0 = 0;
    var xr1 = bW * 0.18;
    var xr2 = bW * 0.4;
    var xl1 = -xr1;
    var xl2 = -xr2;
    var baseLines = [x0, xr1, xr2, xl1, xl2];
    var margin = (xr2 - xr1)/3;//distance between two windows
  
  //doors 
    //first floor
      var doorW = bW/16;//first floor
      var doorH = bH/20;
      var windowW = bW/20;//center long window
      var windowH = bH/13;
      var windowW2 = bW/40;//side small window
      var windowH2 = bH/25;
      var spacing = bH/30;
      var floor1 = bH/2 * 0.25;
      var floor2 = bH/2 - floor1;
      var n = ceil(floor2/(windowH2+spacing)) - 1;//number of windows on 3rd floor
  

	//windows&doors
    for(var i = 0; i < baseLines.length; i ++ ){
        //doors
        darkFillSetting();
        rect(baseLines[i] - doorW, 0, baseLines[i] + doorW, -doorH);
        arc(baseLines[i], -doorH, doorW*2 ,doorW*2, PI, TWO_PI);

        //windows
        for(var j = 0; j < n; j ++ ){
          if( i != 0){//side window
              rect(baseLines[i] - windowW2, - floor1 - j*(spacing + windowH2), baseLines[i] + windowW2, - floor1 - j*(spacing + windowH2) -windowH2);
            if( i == 4 ){
              rect(baseLines[i] + margin - windowW2, - floor1 - j*(spacing + windowH2), baseLines[i] + margin + windowW2, - floor1 - j*(spacing + windowH2) -windowH2);
              rect(baseLines[i] + margin * 2 - windowW2, - floor1 - j*(spacing + windowH2), baseLines[i] + margin * 2 + windowW2, - floor1 - j*(spacing + windowH2) -windowH2);
            }else if( i ==2 ){
              rect(baseLines[i] -margin - windowW2, - floor1 - j*(spacing + windowH2), baseLines[i] -margin + windowW2, - floor1 - j*(spacing + windowH2) -windowH2);
              rect(baseLines[i] -margin * 2 - windowW2, - floor1 - j*(spacing + windowH2), baseLines[i] -margin * 2 + windowW2, - floor1 - j*(spacing + windowH2) -windowH2);
            }
          }else if(i == 0){//middle window
              rect(baseLines[i] - windowW2, -floor1,baseLines[i] + windowW2, -floor1 - floor2);
              rect(baseLines[i] + spacing * 2.5 - windowW2, -floor1,baseLines[i] + spacing * 2.5 + windowW2, -floor1 - floor2);
              rect(baseLines[i] - spacing * 2.5 - windowW2, -floor1,baseLines[i] - spacing * 2.5 + windowW2, -floor1 - floor2);
          }
        }
    
  //patterns
    	middleStrokeSetting();
    	line(-bW/2 * 1, -floor1, bW/2 * 1, -floor1);
    	line(-bW/2 * 1, -floor1 * 0.9, bW/2 * 1, -floor1 * 0.9);
  }
  pop();
  
  push();
  	translate(canvasWidth/2, canvasHeight/2 - move);
      rectMode(CORNERS);
      var topH = bH * 0.06;
      var topW = bH * 0.2;
      var d = topW * 1.7;
      darkFillSetting();
      rect(-topW, 0, topW, -topH * 2);
      lightFillSetting();
      rect(-bW * 0.55, 0, -bW * 0.2, -topH);
      rect(bW * 0.55, 0, bW * 0.2, -topH);
      rect(-topW/2, 0, topW/2, -topH);
      rect(-topW * 0.1, -topH * 2 - d/2, topW * 0.1, -topH * 2 - d/2 - topH);
      rect(-topW * 0.05, -topH * 2 - d/2, topW * 0.05, -topH * 2 - d/2 - topH * 3);
      arc(0, -topH * 2, d, d, PI, TWO_PI);
  pop();
  
}//the bund2

function drawBuilding6(){
  var bH = 0.2 * canvasHeight; // height of the building
	var bW = 1.1 * bH; //width of the building
  var move = bH/8;
  var padding = bW/35;//whtie border
  push();
    translate(-bW - padding, move);
    drawBuilding6half();
  pop();
  
  push();
    translate(bW + padding, move);
    drawBuilding6half();
  pop();
}//Wai Bai Du Qiao

function drawBuilding6half(){//the bridge 
	var bH = 0.2 * canvasHeight; // height of the building
	var bW = 1.1 * bH; //width of the building
  //the body of the bridge
  push();
		translate(canvasWidth/2,canvasHeight/2);
  	//baselines
  	var spacingX = bW/4;
  	var spacingY = bH * 0.03;
  	var increase = bH/20;
  	var topLines = [];
  	var bottomLines = [];
  	for(var i = 0; i < 9; i++){
      if(i < 5){
      	spacingY = spacingY + increase * (5 - i);
    	}else{
        spacingY = spacingY - increase * (i - 4);     
      }
      var t = createVector(-spacingX*4 + spacingX * i,  - spacingY);
      var b = createVector(-spacingX*4 + spacingX * i,  0);
      topLines.push(t);
      bottomLines.push(b);
    }
  
  	//margin
   	var padding = bW/25;//whtie border
  	var z = 1.03;//white border
    noStroke();
   	fill(h, s, l[10]);
    beginShape();
      for(var j0 = 0; j0 < topLines.length; j0++){
        var bB = topLines[j0];
        vertex(bB.x * z, bB.y * z);
      }
  		
  		for(var j1 = bottomLines.length - 1; j1 >= 0; j1--){
        var bB2 = bottomLines[j1];
        vertex(bB2.x * z , bB2.y + padding);
      }
  	endShape();
  
  	//body
    lightFillSetting();
    beginShape();
      for(var j2 = 0; j2 < topLines.length; j2++){
        var bV = topLines[j2];
        vertex(bV.x,bV.y);
      }
  		
  		for(var j3 = bottomLines.length - 1; j3 >= 0; j3--){
        var bV2 = bottomLines[j3];
        vertex(bV2.x,bV2.y);
      }
  	endShape();
  
  	//patterns
  	middleStrokeSetting();
  	// vertical pattern
      for(var j4 = 0; j4 < topLines.length; j4++){
          var vl1 = topLines[j4]; 
          var vl2 = bottomLines[j4];
          line(vl1.x,vl1.y,vl2.x,vl2.y);
      }
  	//right pattern
      for(var j5 = 0; j5 < topLines.length; j5++){
          var rl1 = topLines[j5];
          if(j5 < topLines.length - 1){
            var rl2 = bottomLines[j5 + 1];
            line(rl1.x,rl1.y,rl2.x,rl2.y);
          }
      }
  	//left pattern
      for(var j6 = 0; j6 < topLines.length; j6++){
          var ll1 = bottomLines[j6];
          if(j6 < bottomLines.length - 1){
            var ll2 = topLines[j6 + 1];
            line(ll1.x,ll1.y,ll2.x,ll2.y);
          }
      }
  
 		 //outline
  	thickStrokeSetting();
  	for(var j7 = 0; j7 < topLines.length - 1; j7++){
      line(topLines[j7].x, topLines[j7].y, topLines[j7 + 1].x, topLines[j7 + 1].y);
    	line(bottomLines[j7].x, bottomLines[j7].y, bottomLines[j7 + 1].x, bottomLines[j7 + 1].y);
    }
  pop();
}

//xujiahui
function drawBuilding7(){
  var bH = 0.4 * canvasHeight; // height of the building
  var bW = 0.8 * bH; //width of the building
  var wH = bH * 0.75;//wall height
  var move = bH/2;
  push();
    translate(canvasWidth/2, canvasHeight/2 + move);
  
    //body background
  	var padding = bH/50;
    rectMode(CORNERS);
  	noStroke();
		fill(h, s, l[10]);
    rect(-bW/1.17, padding, bW/1.17, -wH * 1.02);//wide wall
    rect(-bW/2.35, padding, bW/2.35, -bH * 1.02);//narrow wall
    rect(-bW/2.1, -bH * 1.02, bW/2.1, -bH * 0.92);//top
  
  
    //body
    rectMode(CORNERS);
    lightFillSetting();
    rect(-bW/1.2, 0, bW/1.2, -wH);//wide wall
    lightFillSetting();
    rect(-bW/2.4, 0, bW/2.4, -bH);//narrow wall
    middleFillSetting();
    rect(-bW/2.2, -bH, bW/2.2, -bH * 0.94);//top

    //frame
  	var op = bW/2.8;//outside point
  	var s = bH/10;//length of the square
  	var rs = (op - s) //sm
    var rb = op;
    var doorH = bH/2.5;
  	//the five squares
    darkFillSetting();
    rect(-op, 0, -op + s , -s);
  	rect(op, 0, op - s, -s);
  	rect(-op, -doorH, -op + s , -doorH-s);
  	rect(op, -doorH, op - s, -doorH-s);
  	rect(-s/2,-doorH-s-rs,s/2,-doorH-s-rb);
  	//door frame
  	middleFillSetting();
  	arc(0,-doorH - s, rb*2, rb*2, PI, TWO_PI);
  	rect(-op, 0-s,-op + s, -doorH);
  	rect(op, 0-s, op - s, -doorH);
  	lightFillSetting();
  	arc(0,-doorH - s, rs*2, rs*2, PI, TWO_PI);
  	darkFillSetting();
  	rect(-s/2,-doorH-s-rs,s/2,-doorH-s-rb);
  	
  	//step
  	darkFillSetting();
  	rect(-s,0,s,-s);
  	rect(-s * 2,0,s * 2,-s/2);
  	
  	//logo
  	darkFillSetting();
  	rect(-s,-doorH -s - rb*1.1,s,-doorH -s - rb*1.1 - s);
  
  	middleFillSetting();
  	rect(-s * 0.8,-doorH -s - rb*1.1,s * 0.8,-doorH -s - rb*1.1 - s);
  
  	//pattern
  	var spacing = bH/20;//space between each pattern
  	thickStrokeSetting();
  	for(var i = spacing; i < wH - spacing; i += spacing){
      line(-bW/1.3, -i, -bW/2.4, - i);
      line(bW/1.3, -i, bW/2.4, - i);
    }
  	line(0,0,0,-doorH -s -rb);	
  pop();
}//shi ku men

function drawBuilding8(){
  var bH = 0.618 * canvasHeight; // height of the building
  var bW = 0.8 * bH; //width of the building
  var floor1 = -bH/8;
  push();
  	translate(canvasWidth/2, canvasHeight/2 + bH * 0.45);
  	rectMode(CORNERS);
  
  	//baselines
  	var baseLines = [
    createVector(-bW * 0.35, 0),
    createVector(bW * 0.35, 0),
    createVector(-bW * 0.18, 0),
    createVector(bW * 0.18, 0)
    ];
  
  	//toplines
  	var topLines = [
    createVector(-bW * 0.35, floor1),//left1
    createVector(bW * 0.35, floor1),//right1
    createVector(-bW * 0.18, floor1),//left2
    createVector(bW * 0.18, floor1)//right2
    ];
  
  	//background
    var pW0 = bW/40;//pillar width
  	var bottom0 = bH * 0.45;
  	var padding = bH/60;
  	var z = 1.03;
  	noStroke();
  	fill(h, s, l[10]);
  	rect(-bW/2 * z, 0 + padding, bW/2 * z, -bottom0);
    //middleFillSetting();
  	rect(-bW/2 * z - pW0, 0 + padding, bW/2 * z + pW0, floor1);
  	for(var i0 = 0; i0 < baseLines.length; i0++){
      var s0 = baseLines[i0];
      rect(s0.x - pW0, 0, s0.x + pW0, floor1);
    }
		rect(-bW/2 - pW0, floor1, bW/2 + pW0, floor1 + pW0);
  
  	//bottom body
  	var pW = bW/40;//pillar width
  	var bottomH = bH * 0.45;
  	lightFillSetting();
  	rect(-bW/2, 0, bW/2, -bottomH);
    //middleFillSetting();
  	rect(-bW/2 - pW, 0, bW/2 + pW, floor1);
  	darkFillSetting();
  	for(var i =0; i < baseLines.length; i++){
      var s1 = baseLines[i];
      rect(s1.x - pW, 0, s1.x + pW, floor1);
    }
		rect(-bW/2 - pW, floor1, bW/2 + pW, floor1 + pW);

  	//triangle middle
  	middleFillSetting();
		rect(topLines[2].x - pW, topLines[2].y, topLines[3].x + pW, topLines[3].y - bottomH - floor1);

  	//triangles doors
  	var tb = bH/6;//big triangleHeight
  	var tsH = bH/10;//small triangleHeight
  	var tsW = bW/7;//small triangleWidth
  		//frames
          darkFillSetting();
          //middle one
            beginShape();
            vertex(topLines[2].x - pW, topLines[2].y);
            vertex(topLines[3].x + pW, topLines[3].y);
            vertex(0, floor1 - tb);
            endShape();
          //left one
            beginShape();
            vertex(topLines[1].x - tsW, topLines[1].y);
            vertex(topLines[1].x + tsW, topLines[1].y);
            vertex(topLines[1].x, floor1 - tsH);
            endShape();

          //right one
            beginShape();
            vertex(topLines[0].x - tsW, topLines[0].y);
            vertex(topLines[0].x + tsW, topLines[0].y);
            vertex(topLines[0].x, floor1 - tsH);
            endShape();
			//inside
          //middle one
          lightFillSetting();
            beginShape();
            vertex(topLines[2].x + pW, topLines[2].y);
            vertex(topLines[3].x - pW, topLines[3].y);
            vertex(0, floor1 - tb + pW*2);
            endShape();
          middleFillSetting();
          //left one
            beginShape();
            vertex(topLines[1].x - tsW + pW * 2, topLines[1].y);
            vertex(topLines[1].x + tsW - pW * 2, topLines[1].y);
            vertex(topLines[1].x, floor1 - tsH + pW * 2);
            endShape();
          //right one
            beginShape();
            vertex(topLines[0].x - tsW + pW * 2, topLines[0].y);
            vertex(topLines[0].x + tsW - pW * 2, topLines[0].y);
            vertex(topLines[0].x, floor1 - tsH + pW * 2);
            endShape();
  	
  	//triangle windows
  		var wH = bH/5;//windows height
  		var d = bW/12;//distance between windows
  		darkFillSetting();
  		//left three
  			for(var j1 = -1; j1 < 2; j1++){
          beginShape();
          vertex(d * j1 + topLines[1].x - tsW/2 + pW * 2, topLines[1].y - tb * 0.7);
          vertex(d * j1 + topLines[1].x + tsW/2 - pW * 2, topLines[1].y - tb * 0.7);
          vertex(d * j1 + topLines[1].x, floor1 - wH + pW * 2 - tb* 0.7);
          endShape();
        }
      //right three
        for(var j2 = -1; j2 < 2; j2++){
          beginShape();
          vertex(d * j2 + topLines[0].x - tsW/2 + pW * 2, topLines[0].y - tb * 0.8);
          vertex(d * j2 + topLines[0].x + tsW/2 - pW * 2, topLines[0].y - tb * 0.8);
          vertex(d * j2 + topLines[0].x, floor1 - wH + pW * 2 - tb* 0.8);
          endShape();
        }
  	
  	//triangle top
  		var topH = bH - bottomH;
  		//middle top
 		 	middleFillSetting();
  		beginShape();
  			vertex(topLines[2].x - pW, -bottomH);
  			vertex(topLines[3].x + pW, -bottomH);
  			vertex(0, - bH * 0.7);
      endShape();
  		//side tops
        //taller one
          lightFillSetting();
          beginShape();
            vertex(-bW/2 + pW, -bottomH);
            vertex(topLines[2].x - pW, -bottomH);
            vertex(topLines[0].x, -bH);
          endShape();
          beginShape();
            vertex(bW/2 - pW, -bottomH);
            vertex(topLines[3].x + pW, -bottomH);
            vertex(topLines[1].x, -bH);
          endShape();
  			//smaller ones 
          darkFillSetting();
            beginShape();
              vertex(-bW/2, -bottomH);
              vertex(topLines[2].x, -bottomH);
              vertex(topLines[0].x, -bH * 0.6);
            endShape();
            beginShape();
              vertex(bW/2, -bottomH);
              vertex(topLines[3].x, -bottomH);
              vertex(topLines[1].x, -bH * 0.6);
            endShape();
  
  	//cross
  		stroke(1)
  		strokeCap(SQUARE);
  		//middle one
        stroke(h, s, l[8]);
        crossH = bH/12;
        crossW = bH /15;
        line(0, floor1 - tb, 0, floor1 - tb - bH/10);
        line(-crossW/2, floor1 - tb - crossH/2, crossW/2, floor1 - tb - crossH/2);
  
  		//side ones
        stroke(h, s, l[5]);
        crossH = bH/12;
        crossW = bH /15;
        line(topLines[0].x, -bH, topLines[0].x, -bH - bH/10);
        line(topLines[0].x - crossW/2, -bH - crossH/2, topLines[0].x + crossW/2, -bH - crossH/2);
  			line(topLines[1].x, -bH, topLines[1].x, -bH - bH/10);
        line(topLines[1].x - crossW/2, -bH - crossH/2, topLines[1].x + crossW/2, -bH - crossH/2);
  pop();
  
  
}//church