
//the modules
var column = 4; //number of columns
var row = 4; //number of rows 
var x1; //position of each module
var y1; //position of each module
var moduleWidth;
var moduleHeight;

//the grid system
var gridC;//number of h
var gridR;//number of rows
var gridH;
var gridW;

var grids = [];//the layout of the fonts
var modules = [];//the modules to show the fonts

//parameters to personalize the typography
var x0 = 10; //original position of each module
var y0 = 10; //original position of each module 

//spacing 
var c1 = 15;//column1
var c2 = 25;//column2
var c3 = 35;//column3
var c4 = 45;//column4
var r1 = 15;//row1
var r2 = 25;//row2
var r3 = 35;//row3
var r4 = 45;//row4
var xD = c1 + c2 + c3 + c4 + 10;
var yD = r1 + r2 + r3 + r4 + 10;

//data of the letters
var a = [4,7,10,11,13,14,15,16];
var b = [1,2,3,4,5,6,8,9,10,11,12,15,16];
var c = [2,3,5,8,9,12,13,16];
var d = [1,2,3,4,5,8,9,12,14,15];
var e = [1,2,3,4,5,6,7,8,9,10,11,12,13,16];
var f = [1,2,3,4,5,7,9,11,13,15];
var g = [1,2,3,4,5,8,9,12,13,15,16];
var h = [1,2,3,4,6,10,13,14,15,16];
var i = [1,4,5,8,9,10,11,12,13,16];
var j = [1,3,4,5,8,9,10,11,12,13]; 
var k = [1,2,3,4,6,7,9,12,13,16];
var l = [1,2,3,4,8,12,16];
var m = [1,2,3,4,5,6,7,9,10,11,13,14,15,16];
var n = [1,2,3,4,6,11,13,14,15,16];
var o = [2,3,5,8,9,12,14,15];
var p = [1,2,3,4,5,7,9,11,14];
var q = [1,2,3,4,5,8,9,11,12,13,14,15,16];
var r = [1,2,3,4,5,7,9,10,11,15,16];
var s = [4,5,6,8,9,11,12,13];
var t = [1,5,9,10,11,12,13];
var u = [1,2,3,4,8,12,13,14,15,16];
var v = [1,6,11,13,14,15,16];
var w = [1,2,3,4,6,7,8,10,11,12,13,14,15,16];
var x = [1,4,6,7,10,11,13,16];
var y = [1,6,10,11,12,13];
var z = [1,4,5,7,8,9,10,12,13,16];

var alphabet = [a, b, c, d, e, f, 
                g, h, i, j, k, l,
                m, n, o, p, q, r, 
                s, t, u, v, w, x, 
                y, z ];


function setup(){
  
  colorMode(HSL);
   
  var fillColor = color(30,30,30);//color of the letter
  var bgColor = color(50,40,70);//color of the background
  
  //canvas size and background color
  createCanvas(800,1000);
  background(255);
  
  
  //grids for the translation of the position
  gridC = ceil(width/xD)-1;
  gridR = ceil(height/yD)-1;
  gridW = xD;
  gridH = yD;
  
  console.log(gridC, gridR);
  
	for(var gi = 0; gi < gridR; gi++) {
    for(var gj = 0; gj < gridC; gj++) {
      var gx = gj * gridW;
      var gy = gi * gridH;
      grids.push({
        x: gx, 
        y: gy,
        w: gridW,
        h: gridH
      });
    }
  }
  
  
  //drawGrids();

  
  //spacing between each column and row	
  var spacing = [    
    s0 = createVector(c1,r1),//first row and column 
    s1 = createVector(c2,r2),//second row and column 
    s2 = createVector(c3,r3),//third row and column 
    s3 = createVector(c4,r4) //fourth row and column 
  ];
  
  //the array to store modules
  
    x1 = x0; //original position
    y1 = x0; //original position
    
    //the function that stores all the modules
    for (var i1 = 0; i1 < column; i1++){
      //draw the column 
      if(i1 == 0){
          x1 = x1;
        }else{
          x1 = x1 + spacing[i1-1].x;
      }
      //draw the row 
      for(var j1 = 0; j1 < row; j1++){
        		if(j1 == 0){
            	y1 = y1;
            }else{
              y1 = y1 + spacing[j1-1].y;
            }
            moduleWidth = spacing[i1].x;
            moduleHeight = spacing[j1].y;
        		//store the data of each module
        		modules.push({
              p: createVector(x1,y1),
              w: moduleWidth,
              h: moduleHeight,
              c: bgColor
            });
      }
      y1 = y0;
    }
  
  //the loop to run through the alphabet
  for(var i2 = 0; i2 < alphabet.length; i2++){
      var letter = alphabet[i2];            
      //reset color
      for (var k1 = 0; k1 < modules.length; k1++){
          modules[k1].c = bgColor;
      }  
			//the loop to run the data of the letter
      for(var i3 = 0; i3 < letter.length; i3++){
        var n = letter[i3];
        
        modules[(n-1)].c = fillColor;//the modules to light up
        push();
        translate(grids[i2].x, grids[i2].y);
        drawLetters();
        pop();
      }
  } 
}


//the function that draws the letters
function drawLetters(){
  for (k2 = 0; k2 < modules.length; k2++){
    rectMode(CORNER);
    noStroke();
    fill(modules[k2].c);
    rect(modules[k2].p.x, modules[k2].p.y, modules[k2].w, modules[k2].h);
  }
}

//the function that draws the grids
function drawGrids(){
  stroke(90, 90, 90);
  for(var gi2 = 0; gi2 < grids.length; gi2++) {
    var grid = grids[gi2];
    rect(grid.x, grid.y, grid.w, grid.h);
  }
}
