const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let counter = 0;
let winner = false;
let field = [
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY]
];
let player = true;

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function startGame () {
    renderGrid(3);
}

function renderGrid (dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function cellClickHandler (row, col) {

    console.log(`Clicked on cell: ${row}, ${col}`);
    if (field[row][col] === EMPTY){
        counter++;
        if (player == true){
            field[row][col] = CROSS;
            renderSymbolInCell(CROSS, row, col);
            player = false;
        }
        else{
            field[row][col] = ZERO;
            renderSymbolInCell(ZERO, row, col);
            player = true;
        }
    }
}

function resetClickHandler () {

    field = [
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY]
    ];
    player = true;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {

            renderSymbolInCell(field[i][j], i, j);
        }
    }

function winnerGame() {
    const winningScenarios = [

        [
            [CROSS, CROSS, CROSS],
            [EMPTY, EMPTY, EMPTY],
            [EMPTY, EMPTY, EMPTY]
        ],
        [
            [EMPTY, EMPTY, EMPTY],
            [CROSS, CROSS, CROSS],
            [EMPTY, EMPTY, EMPTY]
        ],

        [
            [EMPTY, EMPTY, EMPTY],
            [EMPTY, EMPTY, EMPTY],
            [CROSS, CROSS, CROSS]
        ],

        [
            [CROSS, EMPTY, EMPTY],
            [CROSS, EMPTY, EMPTY],
            [CROSS, EMPTY, EMPTY]
        ],
        [
            [EMPTY, CROSS, EMPTY],
            [EMPTY, CROSS, EMPTY],
            [EMPTY, CROSS, EMPTY]
        ],
        [
            [EMPTY, EMPTY, CROSS],
            [EMPTY, EMPTY, CROSS],
            [EMPTY, EMPTY, CROSS]
        ],

        [
            [CROSS, EMPTY, EMPTY],
            [EMPTY, CROSS, EMPTY],
            [EMPTY, EMPTY, CROSS]
        ],
        [
            [EMPTY, EMPTY, CROSS],
            [EMPTY, CROSS, EMPTY],
            [CROSS, EMPTY, EMPTY]
        ]
    ];
    for (let i of winningScenarios) {
        if (field == i){
            alert("Победил");
        }
        return;
        }
    }
}

function drawPlayer() {
    if (counter == 9 && winner == false) {
        alert("Победила дружба");
    }
}

function renderSymbolInCell (symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell (row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener () {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler () {
    console.log('reset!');
}


/* Test Function */
/* Победа первого игрока */
function testWin () {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw () {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function clickOnCell (row, col) {
    findCell(row, col).click();
}
