//missing:
// adding a touch check all the time (setinterval?)
// where would color functions be ?

//-----------------------------------------------------------------------
//GLOBAL VARIABLES

var TABLE_DIV = 'tablediv'; //the div we'll put Smapon's grid in
var TABLE_SIZE = 8;
var TOUCH_LISTENER_DIV = 'toucharea';
var TABLE_TH_CSS_CLASS = 'tableth';
var SQUARE_PX_SIZE = 18;
var SMAPON_TABLE_ID = 'smapongrid';
var ANIMATION_INTERVAL = 500;


  //color choices as follows:
  var COLORS_LIST =
    {
    red:'rgb(245, 52, 10)',
    o:'rgb(245, 137, 10)',
    yellow:'rgb(245, 242, 10)',
    green:'rgb(57, 245, 10)',
    cyan:'rgb(10, 188, 245)',
    b:'rgb(10, 69, 245)',
    purple:'rgb(155, 10, 245)',
    pink:'rgb(245, 10, 207)',
    none : 'rgb(0, 0, 0)'
    };


//-----------------------------------------------------------------------
//INITIALIZATION
//Check screen size, generate the table and init Smapon

function init() {

  // checkScreenSize();
  // displayIntroContent();

  addTouchListeners(TOUCH_LISTENER_DIV);
  generateTable();
  resizingSquares(20);
  moveTableTo((window.innerWidth/2),200,0);
  setNewPattern(blueSmileFace);
  mySmapon.routine('idle');
  //Check for input for 3sec ?
  //
  // if(TouchedFor3sec() === true){
  //   createSmapon();
  // }

var poeu = ("for example there's an idle routine. During the idle routine, what happens ?");
}
//-----------------------------------------------------------------------
//SMAPON
//TBD But I think at the root level there might be stats (like hunger or whatever)
// and routines (i.e. IDLE) that contain all behavior (i.e. talk, animation, logic)

var routineAnimList =
{ idle: ['smile','eyesclosed','smile','smile','smile'],
  smile: ['smile','eyesopen']
};

var facePatterns =
{
  smile:
     ["        ",
      "  b  b  ",
      "  b  b  ",
      "        ",
      "        ",
      "  b  b  ",
      "   bb   ",
      "        "],
  eyesclosed:
     ["        ",
      "        ",
      " bb  bb ",
      "        ",
      "        ",
      "  b  b  ",
      "   bb   ",
      "        "],
eyesopen:
     ["        ",
      "  b  b  ",
      "  b  b  ",
      "        ",
      "        ",
      "        ",
      "  bbbb  ",
      "        "],



};

  var mySmapon = {};

  mySmapon.routine =function(routineName){ //i.e. 'idle'

    this.animate(routineAnimList[routineName]);

  };

  mySmapon.animate = function(animList){

    if(animList.length >= 1){
        setNewPattern(facePatterns[animList[0]]);

        setTimeout(function(){nextFrame(animList,0);},ANIMATION_INTERVAL);

    }
    else {
      setNewPattern(facePatterns[animList[0]]);


    }
  };

  function nextFrame(animList,currentframe){
console.log("length" + animList.length);
    var nextpattern = 0;
    if (currentframe == animList.length-1) {
      console.log("nextframe");
      nextpattern = 0;
    } else{ nextpattern = currentframe +1;
    console.log("next"+nextpattern);}

    setNewPattern(facePatterns[animList[nextpattern]]);
    console.log("set"+facePatterns[animList[nextpattern]]);

    setTimeout(function(){nextFrame(animList,nextpattern);},ANIMATION_INTERVAL);

  }


//-----------------------------------------------------------------------
//ANIMATION
//Should this be inside Smapon? I'm lost.

var blueSmileFace=
  [
    "        ",
    "  b  b  ",
    "  b  b  ",
    "        ",
    "        ",
    "  b  b  ",
    "   bb   ",
    "        "
  ];

function setNewPattern(patternArray){
  console.log(patternArray);
for (var i = 0; i < TABLE_SIZE; i++) {

  for (var j = 0; j < TABLE_SIZE; j++) {
    if (patternArray[i][j] === ' ') {
      document.getElementById('x'+j+'y'+i).style.background = COLORS_LIST.none;
    } else {

    document.getElementById('x'+j+'y'+i).style.background = COLORS_LIST[patternArray[i][j]];
    }
  }
}


}


//-----------------------------------------------------------------------
//TOUCH SENSORS
//Adding listeners, processing events (placing the grid at the right spot)

function addTouchListeners(divName) {
  document.getElementById(divName).addEventListener("touchstart",process_touchstart,false);
  document.getElementById(divName).addEventListener("touchmove",process_touchmove,false);
  document.getElementById(divName).addEventListener("touchend",process_touchend,false);
}

function process_touchstart(evt){

  evt.preventDefault();

}

function process_touchend(evt){evt.preventDefault();
    NEW_TIMER = true;

}

function process_touchmove(evt){
  evt.preventDefault();
  var touches = evt.changedTouches;

  for (var i = 0; i < touches.length; i++) {
    //Start triangulation once we get 3 touch points
    if (i>1) {

      var placementData = findRefPointandAngle(touches);
      moveTableTo(placementData[0].screenX, placementData[0].screenY,placementData[1]);


    }
  }
}

  //////

  //Tools & other functions


  //check distance between each point
  //place grid relative to the furthest one (top)

  function findRefPointandAngle(touchesArray){
    var angle=0;

    var pointA = {posX : touchesArray[0].screenX,posY : touchesArray[0].screenY};
    var pointB = {posX : touchesArray[1].screenX,posY : touchesArray[1].screenY};
    var pointC = {posX : touchesArray[2].screenX,posY : touchesArray[2].screenY};

   var Lsquare = Math.pow(pointA.posX - pointB.posX,2);
   var lsquare = Math.pow(pointA.posY - pointB.posY,2);
   var distAB = Math.round(Math.sqrt(Lsquare+lsquare));

   Lsquare = Math.pow(pointB.posX - pointC.posX,2);
   lsquare = Math.pow(pointB.posY - pointC.posY,2);
    var distBC = Math.round(Math.sqrt(Lsquare+lsquare));

    Lsquare = Math.pow(pointA.posX - pointC.posX,2);
    lsquare = Math.pow(pointA.posY - pointC.posY,2);
     var distAC = Math.round(Math.sqrt(Lsquare+lsquare));


     if (distAB <= distBC && distAB <= distAC) {
       furthestPoint = touchesArray[2];
       angle = findAngleABC(pointA,pointB);


     } else if (distBC <= distAC && distBC <= distAB) {
       furthestPoint = touchesArray[0];
       angle = findAngleABC(pointB,pointC);


     } else if (distAC <= distAB && distAC <= distBC) {
       furthestPoint = touchesArray[1];
       angle = findAngleABC(pointA,pointC);

     }
var result = [furthestPoint,angle];
return(result);

}



function findAngleABC(pointA,pointB){
    var Opp = pointA.posY-pointB.posY;
  var Adj = pointA.posX-pointB.posX;
return(Math.atan(Opp/Adj)*180/Math.PI);
}


//////

function generateTable(){

  var myTable ='<table id="'+SMAPON_TABLE_ID+'">';

  for (var i = 0; i < TABLE_SIZE; i++) {
    myTable += '<tr class="row'+i+'">';
    myTable += generateTh(TABLE_SIZE,i);
    myTable += "</tr>";
  }
  myTable += "</table>";
  document.getElementById(TABLE_DIV).innerHTML = myTable;
  resizingSquares(SQUARE_PX_SIZE);
}


function generateTh(nb_of_th,current_row){
var generatedTh ='';
for (var i = 0; i < nb_of_th; i++) {
    generatedTh += '<th class="'+TABLE_TH_CSS_CLASS+'" id="x'+i+'y'+current_row+'"></th>';
}
  return(generatedTh);
  }


  function resizingSquares(SQUARE_PX_SIZE){
    var mySquares = document.getElementsByClassName(TABLE_TH_CSS_CLASS);
    for (var i = 0; i < mySquares.length; i++) {
      var stringPixel = SQUARE_PX_SIZE.toString() + 'px';
      mySquares[i].style.width = stringPixel;
      mySquares[i].style.height = stringPixel;
    }
  }


  function moveTableTo(xpos,ypos,angle){

    var myTable = document.getElementById(SMAPON_TABLE_ID);
    myTable.style.left = String(xpos-90) + "px";
    myTable.style.top = String(ypos-60)+ "px";
    myTable.style.transform = "rotate("+String(Math.round(angle))+"deg)";

  }



/////////



  function debugMode(string){
    document.getElementById('debugdiv').innerHTML += string;
    console.log(string);
  }
  function humanToSmapon(){
    console.log('pouet');
  }
