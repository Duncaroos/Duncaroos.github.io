
function boardSetup() {
    //Draws horizontal lines
    var i;
    for (i = 0; i <= boardSize; i += boardSize / 3) {
        context.lineWidth = 5;
        context.moveTo(0, i);
        context.lineTo(boardSize, i);
        context.stroke();
    }
    //Draws vertical lines
    for (i = 0; i <= boardSize; i += boardSize / 3) {
        context.beginPath();
        context.lineWidth = 5;
        context.moveTo(i, 0);
        context.lineTo(i, boardSize);
        context.strokeStyle = "Black";
        context.stroke();
    }
}

//Function to draw an X
function drawX(selectionX, selectionY) {
    context.beginPath();
    context.lineWidth = 10;
    context.moveTo(selectionX + context.lineWidth, selectionY + context.lineWidth);
    context.lineTo((selectionX + boardSize / 3 - context.lineWidth), (selectionY + boardSize / 3 - context.lineWidth));
    context.strokeStyle = "Red";
    context.stroke();

    context.moveTo(selectionX + boardSize / 3 - context.lineWidth, selectionY + context.lineWidth);
    context.lineTo((selectionX + context.lineWidth), (selectionY + boardSize / 3 - context.lineWidth));
    context.strokeStyle = "Red";
    context.stroke();

}

//Function to draw an O
function drawO(selectionX, selectionY) {
    context.beginPath();
    context.lineWidth = 10;
    context.arc((selectionX + boardSize / 6), (selectionY + boardSize / 6), (boardSize / 6 - context.lineWidth), 0, 2 * Math.PI);
    context.strokeStyle = "Blue";
    context.stroke();
}

//Function determines which box has been clicked on. 
//First finds which row has been selected, then which row.
function boxSelection(x, y) {
    var boxChoice = null;
    if (x <= boardSize / 3) {
        if (y <= boardSize / 3) {
            boxChoice = 0;
        }
        else if ((y > boardSize / 3) && (y <= 2 * boardSize / 3)) {
            boxChoice = 3;
        }
        else if ((y > 2 * boardSize / 3) && (y <= boardSize)) {
            boxChoice = 6;
        }
        else {
            boxChoice = null;
        }
    }
    else if ((x > boardSize / 3) && (x <= 2 * boardSize / 3)) {
        if (y <= boardSize / 3) {
            boxChoice = 1;
        }
        else if ((y > boardSize / 3) && (y <= 2 * boardSize / 3)) {
            boxChoice = 4;
        }
        else if ((y > 2 * boardSize / 3) && (y <= boardSize)) {
            boxChoice = 7;
        }
        else {
            boxChoice = null;
        }
    }
    else if ((x > 2 * boardSize / 3) && (x <= boardSize)) {
        if (y <= boardSize / 3) {
            boxChoice = 2;
        }
        else if ((y > boardSize / 3) && (y <= 2 * boardSize / 3)) {
            boxChoice = 5;
        }
        else if ((y > 2 * boardSize / 3) && (y <= boardSize)) {
            boxChoice = 8;
        }
        else {
            boxChoice = null;
        }
    }
    return boxChoice;
}

function checkForWin(gameMemory){
 //Checks for a potential win. Checks all rows, columns and diagonals to see if someone has won.
 //If someone has won, displays win statement at ID 'gameText'.
 var i;
     if ((gameMemory[0]==gameMemory[1])&&(gameMemory[1]==gameMemory[2])&&(gameMemory[0]!=0)){
         document.getElementById("gameText").innerHTML = gameMemory[0] + ": WINS";
         return true;
     }
     else if ((gameMemory[3]==gameMemory[4])&&(gameMemory[4]==gameMemory[5])&&(gameMemory[3]!=0)){
         document.getElementById("gameText").innerHTML = gameMemory[3] + ": WINS";
         return true;
     }
     else if ((gameMemory[6]==gameMemory[7])&&(gameMemory[7]==gameMemory[8])&&(gameMemory[6]!=0)){
         document.getElementById("gameText").innerHTML = gameMemory[6] + ": WINS";
         return true;
     }
     else if ((gameMemory[0]==gameMemory[3])&&(gameMemory[3]==gameMemory[6])&&(gameMemory[0]!=0)){
         document.getElementById("gameText").innerHTML = gameMemory[0] + ": WINS";
         return true;
     }
     else if ((gameMemory[1]==gameMemory[4])&&(gameMemory[4]==gameMemory[7])&&(gameMemory[1]!=0)){
         document.getElementById("gameText").innerHTML = gameMemory[1] + ": WINS";
         return true;
     }
     else if ((gameMemory[2]==gameMemory[5])&&(gameMemory[5]==gameMemory[8])&&(gameMemory[2]!=0)){
         document.getElementById("gameText").innerHTML = gameMemory[2] + ": WINS";
         return true;
     }
     else if ((gameMemory[0]==gameMemory[4])&&(gameMemory[4]==gameMemory[8])&&(gameMemory[0]!=0)){
         document.getElementById("gameText").innerHTML = gameMemory[0] + ": WINS";
         return true;
     }
     else if ((gameMemory[2]==gameMemory[4])&&(gameMemory[4]==gameMemory[6])&&(gameMemory[2]!=0)){
         document.getElementById("gameText").innerHTML = gameMemory[2] + ": WINS";
         return true;
     }
     else {
         return false;
     }
 }

//On click, takes the coordinates of the mouse and either draws an O or an X in the box selected.
//Calls other functions to determine if someone has won.
function detectLeftClick(event) {
    var x = event.clientX;
    var y = event.clientY;
    
    boxChoice = boxSelection(x, y);
    document.getElementById("coords").innerHTML = "You selected: " + boxChoice;
    //if statement depending on O or X
    if (gameFinished == false){
        if ((turn == 'X')&&(gameMemory[boxChoice]==0)) {
            gameMemory[boxChoice] = 'X';
            drawX(boxCoords[boxChoice][0], boxCoords[boxChoice][1]);
            turn = 'O';
            document.getElementById("gameText").innerHTML = "";
        }
        else if ((turn == 'O')&&(gameMemory[boxChoice]==0)){
            gameMemory[boxChoice]='O';
            drawO(boxCoords[boxChoice][0],boxCoords[boxChoice][1]);
            turn = 'X';
            document.getElementById("gameText").innerHTML = "";
        }
        else {
            document.getElementById("gameText").innerHTML = "Someone has already selected that box, please pick again."
        }
    }
    gameFinished = checkForWin(gameMemory);
}

boardSetup();