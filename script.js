'use strict'

var ORIGINAL_BOARD
const HUMAN_PLAYER = '0'
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
    console.log(square.target.id)
    turn(square.target.id, HUMAN_PLAYER)
}

function turn(squareID, player) {
    ORIGINAL_BOARD[squareID] = player
    document.getElementById(squareID).innerText = player
}
