
var mycanvas = document.getElementById('mycanvas');
var context = mycanvas.getContext('2d');

var numberOfPlayers = 2;
var playersTurn = 1;
var boardSize = mycanvas.width;
var boxChoice;
var gameFinished = false;

if (Math.random()<0.5){
    var turn = 'O';
}
else{
    var turn = 'X';
}

var gameMemory = [0,0,0,0,0,0,0,0,0];

var boxCoords = [[0,0], [boardSize/3, 0], [2*boardSize/3,0],
                [0,boardSize/3], [boardSize/3, boardSize/3], [2*boardSize/3, boardSize/3],
                [0, 2*boardSize/3], [boardSize/3, 2*boardSize/3], [2*boardSize/3, 2*boardSize/3]];

