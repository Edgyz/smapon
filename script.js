

// ------------------------
// Global Functions
// ------------------------

function appIntro(){


  function checkDeviceScreenSize()
  {
    //maybe?
  }


  var intro = Object.create(protoPage);
  intro.name = 'intro';

  var main = Object.create(protoPage);
  intro.name = 'main';

  var functions = Object.create(protoPage);
  intro.name = 'functions';

  intro.init();

    var sup = Object.create(protoTable);
    sup.generateTable();

}


function generateTable(nb_of_squares,destination_div,class_name,follow_touch){
//follow_touch is a bool - decides if the table will move with touch inputs
//if left out if it well default to false


//checking for touch, defaulting to false
if (typeof follow_touch == 'undefined') {
follow_touch == false;
}

function generateTh(nb_of_th,current_row){
var generatedTh ='';
for (var i = 0; i < nb_of_th; i++) {
    generatedTh += '<th class="'+class_name+' x'+i+' y'+current_row+'"></th>';
}
  return(generatedTh);
  }

  if (follow_touch) {
    var myTable ='<table id="touchtable">';

  } else {
  var myTable ='<table>'; }

  for (var i = 0; i < nb_of_squares; i++) {
    myTable += '<tr class="row'+i+'">';
    myTable += generateTh(nb_of_squares,i);
    myTable += "</tr>";
  }
  myTable += "</table>";
  document.getElementById(destination_div).innerHTML = myTable;
  // changeSize('tableth',px_size);



}


function addSomeColor(){

  var forHumans = document.getElementById('PREVIEWtablediv');
  var forSmapon = document.getElementById('tablediv');
  //color choices as follows:
  var colorsRGB =
    {
    red:'rgb(245, 52, 10)',
    orange:'rgb(245, 137, 10)',
    yellow:'rgb(245, 242, 10)',
    green:'rgb(57, 245, 10)',
    cyan:'rgb(10, 188, 245)',
    blue:'rgb(10, 69, 245)',
    purple:'rgb(155, 10, 245)',
    pink:'rgb(245, 10, 207)'
    };

  function addToRow(row_number,color){
    //row_number should be row number from 0 to 7
    var selectedClassElements = document.getElementsByClassName('y'+row_number);
    var correspondingColor = colorsRGB[color];
    for (var i = 0; i < selectedClassElements.length; i++) {
      selectedClassElements[i].style.background=colorsRGB[color];
    }
  }

  function addToSquare(coord,color){
    //coord should be a string like "x3y0"

    var selectedClassElements = document.getElementsByClassName('y'+coord[3]);
    var correspondingColor = colorsRGB[color];
    for (var i = 0; i < selectedClassElements.length; i++) {
      if (selectedClassElements[i].className.search("x"+coord[1])>0) {

        selectedClassElements[i].style.background=colorsRGB[color];
      }
    }
  }

  function makeRainbowRow(row_number)
  {
    //row_number and column_number should be numbers from 0 to 7
    var selectedClassElements = document.getElementsByClassName('y'+row_number);
        selectedClassElements[0].style.background=colorsRGB['red'];
        selectedClassElements[1].style.background=colorsRGB['orange'];
        selectedClassElements[2].style.background=colorsRGB['yellow'];
        selectedClassElements[3].style.background=colorsRGB['green'];
        selectedClassElements[4].style.background=colorsRGB['cyan'];
        selectedClassElements[5].style.background=colorsRGB['blue'];
        selectedClassElements[6].style.background=colorsRGB['purple'];
        selectedClassElements[7].style.background=colorsRGB['pink'];
  }

  addToSquare('x1y2','blue');
  addToSquare('x5y2','blue');
makeRainbowRow(0);

makeRainbowRow(7);
}


// ------------------------
// Touch Sensing
// ------------------------

function touchSensing(divName){

  document.getElementById(divName).addEventListener("touchstart",process_touchstart,false);
  document.getElementById(divName).addEventListener("touchmove",process_touchmove,false);
    document.getElementById(divName).addEventListener("touchend",process_touchend,false);

}


  var oldX = 1000;
  var oldY = 1000;

function process_touchstart(evt){evt.preventDefault();}

  function process_touchmove(evt){

      evt.preventDefault();
      var touches = evt.changedTouches;
      var talkingabouttouches = '';
      var highesttouch=0;

      for (var i = 0; i < touches.length; i++) {
        var thisX = Math.round(touches[i].screenX);
        var thisY = Math.round(touches[i].screenY);
        talkingabouttouches += "i="+i+", X="+thisX+", Y="+thisY+"<br>";


        //Start triangulation once we get 3 touch points
        if (i>1) {

          function findLowestCoord(xorybool,arrayname){
              if (xorybool == 'x') {

                var x1 =Math.round(arrayname[2].screenX);
                var x2 =Math.round(arrayname[0].screenX);
                var x3 =Math.round(arrayname[1].screenX);

              } else {

                var x1 =Math.round(arrayname[2].screenY);
                var x2 =Math.round(arrayname[0].screenY);
                var x3 =Math.round(arrayname[1].screenY);

              }

              var highest = 0;

              if (x1 < x2) {
                lowest = x1;
                if (x1 < x3) {
                  lowest = x1;
                }
                  else {
                    lowest = x3;
                  }
                }
               else{ lowest = x2; }
               return(lowest);
            }
          findLowestCoord('y',touches);

          document.getElementById('feedbackX').innerHTML =
                    findLowestCoord('y',touches) ;

        } else if (i=0) {
          var tableX = thisX -20;
          var tableY = thisY -100;
        }
        else {
          var tableX = Math.round(touches[0].screenX) -20;
          var tableY = Math.round(touches[0].screenY) -100;
        }
      }

      var tableX = Math.round(touches[highesttouch].screenX -20);
      var tableY = Math.round(touches[highesttouch].screenY -100) ;

      document.getElementById('touchtable').style.left = tableX +"px";
      document.getElementById('touchtable').style.top =  tableY  +"px";
      document.getElementById('feedbacketc').innerHTML = talkingabouttouches ;

      // for (var i = 0; i < touches.length; i++) {
      //           var currentX = touches[i].screenX -20;
      //           var currentY = touches[i].screenY -100;
      //
      //           if ((currentX < (oldX + 10)) || currentY < oldY) {
      //             document.getElementById('touchtable').style.left = currentX +"px";
      //             document.getElementById('touchtable').style.top =  currentY  +"px";
      //             document.getElementById('feedbackX').innerHTML = "X is" + Math.round(currentX);
      //
      //             document.getElementById('feedbackY').innerHTML = "Y is" + Math.round(currentY);
      //
      //             document.getElementById('feedbacketc').innerHTML = touches[i].radiusX ;
      //           }
      //            oldX = currentX;
      //            oldY = currentY;
      //
      // }
     }


function process_touchend(){




}
// ------------------------
// Global Vars
// ------------------------
var protoPage =
{
name: '',
touchEnabledDiv:'toucharea',
makeTable: true,
tableDivId: 'tablediv',
tableThClass: 'tableth',
tableSize: 8,
isTouchable: function() {
              if(this.touchEnabledDiv){
                return(true);}
              else{
                return(false);}},
init:
  function()
  {
        if(this.makeTable)
        {
          generateTable(this.tableSize,this.tableDivId,this.tableThClass,this.isTouchable());
        }
        addSomeColor();
        touchSensing(this.touchEnabledDiv);
  }
}


var protoTable =
{
name: '',
touchArea:'toucharea',
tableContainerId: 'tablediv',
tableId: 'mytable',
tableThClass: 'square',
tableSize: 8,
pixelSize: 18,
      generateTable:
      function generateTable(){

      //checking for touch, defaulting to false
      if (this.touchArea == '') {
      }

      function generateTh(nb_of_th,current_row){
      var generatedTh ='';
      for (var i = 0; i < nb_of_th; i++) {
          generatedTh += '<th class="'+this.tableThClass+' x'+i+' y'+current_row+'"></th>';
      }
        return(generatedTh);
        }

          var myTable ='<table id="'+this.tableId+'">';

        for (var i = 0; i < this.tableSize; i++) {
          myTable += '<tr class="row'+i+'">';
          myTable += generateTh(this.tableSize,i);
          myTable += "</tr>";
        }
        myTable += "</table>";
        var myID = this.tableContainerId;
        console.log(myID);
        document.getElementById(myID).innerHTML = myTable;

        function resizingSquares(){
          var mySquares = document.getElementsByClassName(this.tableThClass);
          for (var i = 0; i < mySquares.length; i++) {
            var stringPixel = pixelSize.toString() + 'px';
            mySquares[i].style.width = stringPixel;
            mySquares[i].style.height = stringPixel;
          }
        // changeSize('tableth',px_size);)
      }
}}



var arrayGrid =
    [
      [
        ['x0y0','x0y2'],['x1y0','x1y2'],['x2y0','x0y0'],['x3y0','x1y0'],['x4y0',''],['x5y0',''],['x6y0',''],['x7y0','']
      ],

      [
        ['x0y1','x0y3'],['x1y1','x1y3'],['x2y1',''],['x3y1',''],['x4y1',''],['x5y1',''],['x6y1',''],['x7y1','']
      ],

      [
        ['x0y2',''],['x1y2',''],['x2y2',''],['x3y2',''],['x4y2',''],['x5y2',''],['x6y2',''],['x7y2','']
      ],

    [
      ['x0y3',''],['x1y3',''],['x2y3',''],['x3y3',''],['x4y3',''],['x5y3',''],['x6y3',''],['x7y3','']
    ],

      [
        ['x0y4',''],['x1y4',''],['x2y4',''],['x3y4',''],['x4y4',''],['x5y4',''],['x6y4',''],['x7y4','']
      ],

      [
        ['x0y5',''],['x1y5',''],['x2y5',''],['x3y5',''],['x4y5',''],['x5y5',''],['x6y5',''],['x7y5','']
      ],

    [
      ['x0y6',''],['x1y6',''],['x2y6',''],['x3y6',''],['x4y6',''],['x5y6',''],['x6y6',''],['x7y6','']
    ],

      [
        ['x0y7',''],['x1y7',''],['x2y7',''],['x3y7',''],['x4y7',''],['x5y7',''],['x6y7',''],['x7y7','']
      ]

    ];
