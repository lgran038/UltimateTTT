this.winningGrid = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
this.completedGrid = {
    t1: "F",
    t2: "F",
    t3: "F",
    t4: "F",
    t5: "F",
    t6: "F",
    t7: "F",
    t8: "F",
    t9: "F",
}

this.chosenGrid = "";
this.xWins = 0;
this.oWins = 0;
this.currentPlayer = "X";
this.isGameDone = false;

function checkGridWin(grid, player) {
    player = player.toUpperCase();
    if (this.completedGrid[grid] === "F") {
        for (var i = 0; i < this.winningGrid.length; i++) {
            if (
                (document.getElementById(grid + winningGrid[i][0]).innerHTML === player) &&
                (document.getElementById(grid + winningGrid[i][1]).innerHTML === player) &&
                (document.getElementById(grid + winningGrid[i][2]).innerHTML === player)
            ) {
                this.setGridWin(grid, player);
                break;
            }
        }
    }
}

function setGridWin(grid, player) {
    if (player === "X") {
        this.completedGrid[grid] = "X";
        document.getElementById(grid).style.backgroundColor = 'coral';
        this.setScore("X");
    } else if (player === "O") {
        this.completedGrid[grid] = "O";
        document.getElementById(grid).style.backgroundColor = 'cornflowerblue';
        this.setScore("O");
    }

    if(this.xWins === 3 || this.oWins === 3){
        this.gameEnd(false); //Game was not finished by default, game finished by points.
    }
}

function onTileClick(e) {
    var tileID = e.target.id;
    var tile = document.getElementById(tileID);
    var grid = tile.parentNode.parentNode.id;

    if (this.isValidPlay(tile,grid)) {
        if (this.chosenGrid != "" && this.completedGrid[grid]==='F') { //Resets grid from gray to white.
            document.getElementById(this.chosenGrid).style.backgroundColor = 'white';
        }

        tile.innerHTML = this.currentPlayer;
        this.checkGridWin(grid, this.currentPlayer);
        this.flipPlayer();

        this.calculateNextGrid(tileID);
    }
}

function isValidPlay(tile, grid) {
    if (!this.isGameDone && tile.innerHTML === "" && ((grid === this.chosenGrid)) || (chosenGrid === "")) {
        return true;
    }

    return false;
}

function flipPlayer() {

    if (this.currentPlayer === "X") {
        this.currentPlayer = "O";
        document.getElementById("currentPlayer").style.color = "cornflowerblue";
    }
    else {
        this.currentPlayer = "X";
        document.getElementById("currentPlayer").style.color = "coral";
    }
    document.getElementById("currentPlayer").innerHTML = this.currentPlayer;
}

function calculateNextGrid(tileID) {
    var gridNumber = tileID.substr(tileID.length - 1);
    this.chosenGrid = "t" + gridNumber;
    if (this.completedGrid[chosenGrid] === "F") {//Sets the chosen grid to gray.
        document.getElementById(this.chosenGrid).style.backgroundColor = 'lightgray';
    } else if(!availableMoves(this.chosenGrid)){
        this.gameEnd(true); //Game finished by default, no more moves.
    }
}

function setScore(player) {
    if (player === "X") {
        this.xWins++;
        document.getElementById("xPoints").innerHTML = this.xWins;
    } else {
        this.oWins++;
        document.getElementById("oPoints").innerHTML = this.oWins;
     }
}

function gameEnd(defaultWin) {
    this.isGameDone = true;
    
    var winner = this.setWinner(defaultWin).toUpperCase();

    switch (winner) {
        case "X":
            console.log("X Wins!");
            break;
        case "O":
            console.log("O Wins!");
            break;
        case "D":
            console.log("It's a draw!");
            break;
        default:
            console.log("Unexpected Winner :(");
            break;
    }
    console.log("Winner is " + winner);
}

function setWinner(defaultWin) {
    var winner;
    if (defaultWin) {
        if (this.xWins > this.oWins) {
            winner = "X";
        } else if (this.oWins > this.xWins) {
            winner = "O";
        } else {
            winner = "D";
        }
    } else {
        if (this.xWins === 3) {
            console.log("X wins!");
            winner = "X";
        } else if (this.oWins === 3) {
            console.log("O wins!");
            winner = "O";
        } else {
            console.log("Not a win by default, something went wrong.");
        }
    }

    return winner;
}

function availableMoves(grid) {
    for (var i = 1; i <= 9; i++) {
        var tileValue = document.getElementById(grid + i).innerHTML;
        if (tileValue === "") {
            return true;
        }
    }

    return false;
}

function resetGame() {
    document.getElementById("currentPlayer").innerHTML = "X";
    document.getElementById("xPoints").innerHTML = 0;
    document.getElementById("oPoints").innerHTML = 0;

    for (var gridNum = 1; gridNum <= 9; gridNum++) {
        for (var tileNum = 1; tileNum <= 9; tileNum++) {
            document.getElementById("t" + gridNum + tileNum).innerHTML = "";
        }
        //Resetting Background color of all grids
        document.getElementById("t" + gridNum).style.backgroundColor = "white";
    }

    this.completedGrid = {
        t1: "F",
        t2: "F",
        t3: "F",
        t4: "F",
        t5: "F",
        t6: "F",
        t7: "F",
        t8: "F",
        t9: "F",
    }

    this.chosenGrid = "";
    this.xWins = 0;
    this.oWins = 0;
    this.currentPlayer = "X";
    this.isGameDone = false;
}