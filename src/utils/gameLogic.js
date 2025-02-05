export const setN = (num) => {
    let k;

    if (num === 3) {
        k = 3;
    } else {
        k = 4;
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
 */
export function getLineIndexes(i, j, n, direction){
    let indexes = [];
    let x = i;
    let y = j;
    for (let m = 0; m < n; m++) {
        if (!isInGrid(x, y, n)) return null;
        indexes.push([x, y]);
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
export const WINNING_COMBOS = (tab, squareSize) =>{
    let k = setN(squareSize);
    console.log(squareSize);
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
        for(let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                for (let vector of DIRECTIONS) {
                    let indexes = getLineIndexes(i, j, k, vector);
                    if (indexes) {
                        tab.add(indexes);
                    }
                }
            }
        }
        console.log(tab);
    }
};

export const checkWinner = (board, squareSize) => {
    const winningCombos = new Set();
    WINNING_COMBOS(winningCombos, squareSize)
    for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
};

export const checkEndTheGame = (board) => {
    return board.every((square) => square !== "");
};
