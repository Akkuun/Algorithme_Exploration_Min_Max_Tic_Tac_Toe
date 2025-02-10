export const setN = (num) => {
    let k;

    switch(num){
        case 3:
            k = 3;
            break;
        default:
            k = num -1;
            break;
    }
    return k;
}

export function isInGrid(i, j, n){
    return i >= 0 && i < n && j >= 0 && j < n;
}
/**
 * 
 * @param {*} i (cell x)
 * @param {*} j (cell y)
 * @param {*} n (squareSize)
 * @param {*} direction (vector of 2 elements representing the direction)
 * @param {*} k (number of cells to check)
 */
export function getLineIndexes(i, j, n, direction, k){
    let indexes = [];
    let x = i;
    let y = j;
    for (let m = 0; m < k; m++) {
        if (!isInGrid(x, y, n)) return null;
        indexes.push(x * n + y);
        x += direction[0];
        y += direction[1];
    }
    return indexes;
}
export const DIRECTIONS = [
    [1, 0],[-1, 0],
    [0, 1],[0, -1],
    [1, 1],[-1, 1],
    [1, -1],[-1, -1],
];
let winningCombos = new Set();
let last_winningCombos_size = 0;
export const WINNING_COMBOS = (tab, squareSize) =>{
    if(last_winningCombos_size === squareSize) {
        tab = winningCombos;
        return;
    }
    let k = setN(squareSize);
    //console.log(squareSize);
    if(k===3) {
        tab.add([0, 1, 2]);
        tab.add([3, 4, 5]);
        tab.add([6, 7, 8]);
        tab.add([0, 3, 6]);
        tab.add([1, 4, 7]);
        tab.add([2, 5, 8]);
        tab.add([0, 4, 8]);
        tab.add([2, 4, 6]);
    }else{
        for(let i = 0; i < squareSize; i++) {
            for (let j = 0; j < squareSize; j++) {
                for (let vector of DIRECTIONS) {
                    let indexes = getLineIndexes(i, j, squareSize, vector, k);
                    if (indexes) {
                        tab.add(indexes);
                    }
                }
            }
        }
    }
};

export const checkWinner = (board, squareSize) => {
    const winningCombos = new Set();
    WINNING_COMBOS(winningCombos, squareSize)
    for (let combo of winningCombos) {
        let player = board[combo[0]];
        if (!player) continue;
        for (let i = 1; i < setN(squareSize); i++) {
            if (player !== board[combo[i]]) {
                player = null;
                break;
            }
        }
        if (player) {
            return player;
        }
    }
    return null;
};

export const checkWinnerFromLastMove = (board, squareSize, lastMove) => {
    let x = lastMove.x;
    let y = lastMove.y;

    const winningCombos = new Set();
    WINNING_COMBOS(winningCombos, squareSize)
    const specific_combos = Array.from(winningCombos).filter((combo) => combo.includes(x * squareSize + y));
    for (let combo of specific_combos) {
        let player = board[combo[0]];
        if (!player) continue;
        for (let i = 1; i < setN(squareSize); i++) {
            if (player !== board[combo[i]]) {
                player = null;
                break;
            }
        }
        if (player) {
            return player;
        }
    }
}

export const checkEndTheGame = (board) => {
    return board.every((square) => square !== "");
};
