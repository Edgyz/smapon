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
var ANIM_FREQ = 300;
var DEBUGMODE = true;

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

//ANIMATION VARIABLES

var routineAnimList =
{ idle:
  [
    {pattern:'smile',duration:2},
    {pattern:'eyesclosed',duration:1},
    {pattern:'smile',duration:4},
    {pattern:'lookleft',duration:3},
    {pattern:'smile',duration:2},
    {pattern:'eyesclosed',duration:1},
    {pattern:'lookright',duration:6},
    {pattern:'smile',duration:3},
  ],
  blink:
    [
      {pattern:'smile',duration:2},
      {pattern:'eyesclosed',duration:1},
      {pattern:'smile',duration:1},
      {pattern:'eyesclosed',duration:1},
      {pattern:'smile',duration:1},
      {pattern:'eyesclosed',duration:1},
    ]
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
  lookleft:
     ["        ",
      " b  b   ",
      " b  b   ",
      "        ",
      "        ",
      "  b  b  ",
      "   bb   ",
      "        "],
    lookright:
       ["        ",
        "   b  b ",
        "   b  b ",
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
surprise:
     ["        ",
      "  b  b  ",
      "  b  b  ",
      "        ",
      "        ",
      "   bb   ",
      "   bb   ",
      "        "],



};

var translationGrid =
{
  x0y0: 'x0y2',
  x1y0: 'x1y2',
  x2y0: 'x0y0',
  x3y0: 'x1y0',
  x4y0: 'x6y0',
  x5y0: 'x7y0',
  x6y0: 'x6y2',
  x7y0: 'x7y2',
  x0y1: 'x0y3',
  x1y1: 'x1y3',
  x2y1: 'x0y1',
  x3y1: 'x1y1',
  x4y1: 'x6y1',
  x5y1: 'x7y1',
  x6y1: 'x6y3',
  x7y1: 'x7y3',
  x0y2: 'x2y2',
  x1y2: 'x3y2',
  x2y2: 'x2y0',
  x3y2: 'x3y0',
  x4y2: 'x4y0',
  x5y2: 'x5y0',
  x6y2: 'x4y2',
  x7y2: 'x5y2',
  x0y3: 'x2y3',
  x1y3: 'x3y3',
  x2y3: 'x2y1',
  x3y3: 'x3y1',
  x4y3: 'x4y1',
  x5y3: 'x5y1',
  x6y3: 'x4y3',
  x7y3: 'x5y3',
  x0y4: 'x0y6',
  x1y4: 'x1y6',
  x2y4: 'x0y4',
  x3y4: 'x1y4',
  x4y4: 'x6y4',
  x5y4: 'x7y4',
  x6y4: 'x6y6',
  x7y4: 'x7y6',
  x0y5: 'x0y7',
  x1y5: 'x1y7',
  x2y5: 'x0y5',
  x3y5: 'x1y5',
  x4y5: 'x6y5',
  x5y5: 'x7y5',
  x6y5: 'x6y7',
  x7y5: 'x7y7',
  x0y6: 'x2y6',
  x1y6: 'x3y6',
  x2y6: 'x2y4',
  x3y6: 'x3y4',
  x4y6: 'x4y4',
  x5y6: 'x5y4',
  x6y6: 'x4y6',
  x7y6: 'x5y6',
  x0y7: 'x2y7',
  x1y7: 'x3y7',
  x2y7: 'x2y5',
  x3y7: 'x3y5',
  x4y7: 'x4y5',
  x5y7: 'x5y5',
  x6y7: 'x4y7',
  x7y7: 'x5y7',
};

//-----------------------------------------------------------------------
//INITIALIZATION
//Check screen size, generate the table and init Smapon


function init() {

   checkScreenSize();
  // displayIntroContent();

      addTouchListeners(TOUCH_LISTENER_DIV);
      var mySmapopon = new Smapon.create('JeanClaude');
      mySmapopon.createGrid();
      mySmapopon.moveGrid();
      mySmapopon.setRoutineTo('blink');
      mySmapopon.saySomethingVoice('konnichiwa,ヒューバート様.');
      mySmapopon.saySomethingVoice('私,スマポントイイマス.');
      mySmapopon.saySomethingVoice('おしり の なか に ゆび お いりますか? ');
  //Check for input for 3sec ?
  //
  // if(TouchedFor3sec() === true){
  //   createSmapon();
  // }

}

function checkScreenSize(){
  var windowWidth = document.documentElement.clientWidth;
  var windowHeight = document.body.clientHeight *0.8;
  var mainContent = document.getElementById('mainContent');
  var SmaponWindowRatio = 16/9;

    debugMode(windowHeight + ' ' + windowWidth);
  mainContent.style.width=(windowHeight/SmaponWindowRatio);
  mainContent.style.height=windowHeight;

    debugMode(' <br>'+mainContent.style.height + ' ' + mainContent.style.width);
}

//-----------------------------------------------------------------------
//SMAPON
//TBD But I think at the root level there might be stats (like hunger or whatever)
// and routines (i.e. IDLE) that contain all behavior (i.e. talk, animation, logic)
//
// var routineAnimList =
// { idle: ['smile','eyesclosed','smile','smile','smile'],
//   smile: ['smile','eyesopen']
// };

var Smapon = {};
Smapon.create = function (name){
  this.name = 'name';
  };

Smapon.create.prototype.createGrid = function() {


    var myTable ='<table id="'+SMAPON_TABLE_ID+'">';

    for (var i = 0; i < TABLE_SIZE; i++) {
      myTable += '<tr class="row'+i+'">';
      myTable += generateTh(TABLE_SIZE,i);
      myTable += "</tr>";
    }
    myTable += "</table>";
    document.getElementById(TABLE_DIV).innerHTML = myTable;
    resizingSquares(SQUARE_PX_SIZE);

};


  Smapon.create.prototype.resizeSquares = function(pxsize) {
    resizingSquares(pxsize);

  };

  Smapon.create.prototype.moveGrid = function() {

      moveTableTo((window.innerWidth/2),200,0);

  };

  Smapon.create.prototype.setPatternTo = function(facePattern) {

      setNewPattern(facePatterns.surprise);

  };

  Smapon.create.prototype.setRoutineTo = function(routinename) {

      this.routine = routinename;
      this.setAnimationTo(routineAnimList[routinename]);

  };



  Smapon.create.prototype.setAnimationTo = function(animList){
    if(animList.length >= 1){

      setNewPattern(facePatterns[animList[0].pattern]);
      setTimeout(function(){nextFrame(animList,0);},animList[0].duration*ANIM_FREQ);
    }
    else {
      setNewPattern(facePatterns[animList[0].pattern]);
    }
};


Smapon.create.prototype.saySomethingVoice = function(something){
  var msg = new SpeechSynthesisUtterance(something);

  msg.volume = 1; // 0 to 1
  msg.rate = 1; // 0.1 to 10
  msg.pitch = 2; //0 to 2
  msg.lang = 'ja';
window.speechSynthesis.speak(msg);
};



  function nextFrame(animList,currentframe){
    var nextframe = 0;
    if (currentframe == animList.length-1)
    {
      nextframe = 0;
    }

    else
    {
    nextframe = currentframe +1;
    }

    setNewPattern(facePatterns[animList[nextframe].pattern]);
    setTimeout(function(){nextFrame(animList,nextframe);},animList[nextframe].duration*ANIM_FREQ);

}



//-----------------------------------------------------------------------
//ANIMATION
//Should this be inside Smapon? I'm lost.

function setNewPattern(patternArray){
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

function setNewPatternandTranslate(patternArray){
  console.log(patternArray);

  for (var i = 0; i < TABLE_SIZE; i++) {
    for (var j = 0; j < TABLE_SIZE; j++) {

        var currentID = 'x'+j+'y'+i;
        var translatedID = translationGrid[currentID];
        var newX = translatedID[1];
        var newY = translatedID[3];
        console.log(newX +' '+newY);

      if (patternArray[i][j] === ' ') {
        document.getElementById('x'+newX+'y'+newY).style.background = COLORS_LIST.none;
      } else {

      document.getElementById('x'+newX+'y'+newY).style.background = COLORS_LIST[patternArray[i][j]];
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
    var debugdiv = document.getElementById('debugdiv');

    if (DEBUGMODE === true){
      debugdiv.style.visibility = 'visible';
      debugdiv.innerHTML += string;
      console.log(string);
    } else {
    debugdiv.style.visibility = 'hidden';
    }
  }

  function humanToSmapon(){
    console.log('pouet');
  }
