'use strict'

var ORIGINAL_BOARD
const HUMAN_PLAYER = 'O'
const AI_PLAYER = 'x'
const WINNING_COMBINATION = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [6,4,2]
]

const CELLS = document.querySelectorAll('.cell')
startGame();

function startGame() {
    document.querySelector('.endgame').style.display = "block"
    ORIGINAL_BOARD = Array.from(Array(9).keys())
    for (var x = 0; x < CELLS.length; x++) {
        CELLS[x].innerText = ''
        CELLS[x].style.removeProperty('background-color')
        CELLS[x].addEventListener('click', turnClick, false)
    }
}

function turnClick(square) {
    // -----------
    if ( typeof ORIGINAL_BOARD[square.target.id] == 'number' ) {
        console.log(square.target.id)
        turn(square.target.id, HUMAN_PLAYER)
        // -----------
        if ( !check_tie() ) turn(bestSpot(), AI_PLAYER)
    }
}

function turn(squareID, player) {
    ORIGINAL_BOARD[squareID] = player
    document.getElementById(squareID).innerText = player
    let GAME_WON = check_winner(ORIGINAL_BOARD, player)
    if ( GAME_WON ) GAME_OVER(GAME_WON)
}

function check_winner(board, player) {
    let plays = board.reduce((a, e, i) =>
        (e === player) ? a.concat(i): a, [])
    let GAME_WON = null
    for ( let [index, win] of WINNING_COMBINATION.entries() ) {
        if ( win.every(elem => plays.indexOf(elem) > -1)) {
            GAME_WON = {index: index, player: player}
            break
        }
    }
    return GAME_WON
}

function GAME_OVER(GAME_WON) {
    for (let index of WINNING_COMBINATION[GAME_WON.index]) {
        document.getElementById(index).style.backgroundColor =
            GAME_WON.player == HUMAN_PLAYER ? "#00CC58" : "red"
    }
    for (var x = 0; x < CELLS.length; x++) {
        CELLS[x].removeEventListener('click', turnClick, false)
    }
    declareWinner(GAME_WON.player == HUMAN_PLAYER ? "You win!" : "You Lose :(")
}



// AI
function declareWinner(who) {
    document.querySelector('.endgame').style.display = "block"
    document.querySelector('.endgame .text').innerText = who
}

function emptySquares() {
    return ORIGINAL_BOARD.filter(s => typeof s == 'number')
}

function bestSpot() {
    return emptySquares()[0]
}

function check_tie() {
    if ( emptySquares().length == 0 ) {
        for (var x = 0; x < CELLS.length; x++) {
            CELLS[x].style.backgroundColor = "#00CC58"
            CELLS[x].removeEventListener('click', returnClick, false)
        }
        declareWinner('Tie Game!')
        return true
    }
    return false
}


// MINIMAX function

function MINIMAX(newBoard, player) {
    var AVAILABLE_SPOTS = emptySquares(newBoard)

    if (check_winner(newBoard, player)) {
        return { score: -10 }
    } else if (check_winner(newBoard, AI_PLAYER)) {
        return { score: 20 }
    } else if (AVAILABLE_SPOTS.length === 0) {
        return { score: 0 }
    }

    var moves = []
    for ( var x = 0; x < AVAILABLE_SPOTS.length; x++ ) {
        var move = {}
        move.index = newBoard[AVAILABLE_SPOTS[x]]
        newBoard[AVAILABLE_SPOTS[x]] = player

        if ( player == AI_PLAYER ) {
            var result = MINIMAX(newBoard, HUMAN_PLAYER)
            move.score = result.score
        } else {
            var result = MINIMAX(newBoard, AI_PLAYER)
            move.score = result.score
        }

        newBoard[AVAILABLE_SPOTS[x]] = move.index

        moves.push(move)
    }

    var bestMove
    if ( player === AI_PLAYER ) {
        var bestScore = -10000
        for ( var x = 0; x < moves.length; x++ ) {
            if (moves[x].score > bestScore) {
                bestScore = moves[x].score
                bestMove = x
            }
        }
    } else {
        var bestScore = 10000
        for ( var x = 0; x < moves.length; x++ ) {
            if (moves[x].score < bestScore) {
                bestScore = moves[x].score
                bestMove = x
            }
        }
    }

    return moves[bestMove]
}
