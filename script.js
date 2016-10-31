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

//-----------------------------------------------------------------------
//INITIALIZATION
//Check screen size, generate the table and init Smapon

function init() {

  // checkScreenSize();
  // displayIntroContent();

  addTouchListeners(TOUCH_LISTENER_DIV);
  generateTable();
  resizingSquares(20);
  //
  // if(checkTouchInput()== true)
  // {
  //   createSmapon();
  // }

}
//-----------------------------------------------------------------------
//SMAPON
//TBD But I think at the root level there might be stats (like hunger or whatever)
// and routines (i.e. IDLE) that contain all behavior (i.e. talk, animation, logic)


function createSmapon(){
  var mySmapon = new Smapon();
  mySmapon.launchStartRoutine();
}


//-----------------------------------------------------------------------
//TOUCH SENSORS
//Adding listeners, processing events (placing the grid at the right spot)
//TO DO: Add rotation to the grid (!?)

function addTouchListeners(divName) {
  document.getElementById(divName).addEventListener("touchstart",process_touchstart,false);
  document.getElementById(divName).addEventListener("touchmove",process_touchmove,false);
  document.getElementById(divName).addEventListener("touchend",process_touchend,false);
  debugMode("Touch Listeners added to "+divName);
}

function process_touchstart(evt){evt.preventDefault();}

function process_touchend(evt){evt.preventDefault();}

function process_touchmove(evt){
  evt.preventDefault();
  var touches = evt.changedTouches;
  var talkingabouttouches = '';
  var highesttouch=0;

  for (var i = 0; i < touches.length; i++) {
    //Start triangulation once we get 3 touch points
    if (i>1) {
      var topPoint = findTopPointandAngle(touches);
      moveTableTo(topPoint.screenX, topPoint.screenY);


    }
  }}
  function checkTouchInput() {

  }

  //////

  //Tools & other functions


  //check distance between each point
  //place grid relative to the furthest one (top)
  var sampleTouches = [];
  sampleTouches[0] = {screenX:'100',screenY:'340'};
  sampleTouches[1] = {screenX:'250',screenY:'390'};
  sampleTouches[2] = {screenX:'360',screenY:'220'};

  function findTopPointandAngle(touchesArray){
    var dist=[];
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
       result = touchesArray[2];
     } else if (distBC <= distAC && distBC <= distAB) {
       result = touchesArray[0];
     } else if (distAB <= distAC && distAB <= distBC) {
       result = touchesArray[1];
     }

return(result);
}



function findAngleABC(pointA,pointB,pointC){

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
    generatedTh += '<th class="'+TABLE_TH_CSS_CLASS+' x'+i+' y'+current_row+'"></th>';
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


  function moveTableTo(xpos,ypos){

    var myTable = document.getElementById(SMAPON_TABLE_ID);
    myTable.style.left = String(xpos-90) + "px";
    myTable.style.top = String(ypos-60)+ "px";
  }



/////////



  function debugMode(string){
    document.getElementById('debugdiv').innerHTML += string;
    console.log(string);
  }
  function humanToSmapon(){
    console.log('pouet');
  }
