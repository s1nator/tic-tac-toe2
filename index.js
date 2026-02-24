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
        let currentSymbol;
        if (player == true){
            field[row][col] = CROSS;
            renderSymbolInCell(CROSS, row, col);
            currentSymbol = CROSS;
            player = false;
        }
        else{
            field[row][col] = ZERO;
            renderSymbolInCell(ZERO, row, col);
            currentSymbol = ZERO;
            player = true;
        }

        if (winnerGame()){
            if (currentSymbol === CROSS){
                alert("Победили крестики");
            }
            else {
                alert("Победили нолики");
            }
        }
        else {
            drawPlayer();
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
    counter = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            renderSymbolInCell(field[i][j], i, j);
        }
    }
}

function winnerGame() {
    // Проверка строк
    for (let i = 0; i < 3; i++) {
        if (field[i][0] !== EMPTY && 
            field[i][0] === field[i][1] && 
            field[i][1] === field[i][2]) {
            renderSymbolInCell(field[i][0], i, 0, 'red');
            renderSymbolInCell(field[i][1], i, 1, 'red');
            renderSymbolInCell(field[i][2], i, 2, 'red');
            return true;
        }
    }
    
    for (let j = 0; j < 3; j++) {
        if (field[0][j] !== EMPTY && 
            field[0][j] === field[1][j] && 
            field[1][j] === field[2][j]) {
            renderSymbolInCell(field[0][j], 0, j, 'red');
            renderSymbolInCell(field[1][j], 1, j, 'red');
            renderSymbolInCell(field[2][j], 2, j, 'red');
            return true;
        }
    }
    
    if (field[0][0] !== EMPTY && 
        field[0][0] === field[1][1] && 
        field[1][1] === field[2][2]) {
        renderSymbolInCell(field[0][0], 0, 0, 'red');
        renderSymbolInCell(field[1][1], 1, 1, 'red');
        renderSymbolInCell(field[2][2], 2, 2, 'red');
        return true;
    }
    
    if (field[0][2] !== EMPTY && 
        field[0][2] === field[1][1] && 
        field[1][1] === field[2][0]) {
        renderSymbolInCell(field[0][2], 0, 2, 'red');
        renderSymbolInCell(field[1][1], 1, 1, 'red');
        renderSymbolInCell(field[2][0], 2, 0, 'red');
        return true;
    }
    
    return false;
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
