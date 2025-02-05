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
            if (isInGrid(i, i + 1, squareSize) && isInGrid(i, i + 2, squareSize) && isInGrid(i, i + 3, squareSize)){
                tab.add([i, i + 1, i + 2, i + 3]);
            }else if(isInGrid(i, i + 4, squareSize) && isInGrid(i, i + 8, squareSize) && isInGrid(i, i + 12, squareSize)) {
                tab.add([i, i + 4, i + 8, i + 12]);
            }else if(isInGrid(i, i+5, squareSize) && isInGrid(i, i+10, squareSize) && isInGrid(i, i+15, squareSize)){
                tab.add([i, i+5,i+10,i+15]);
            }else if(isInGrid(i+3, i+6, squareSize) && isInGrid(i+3, i+9, squareSize) && isInGrid(i+3, i+12, squareSize)){
                tab.add([i+3, i+6, i+9, i+12]);
            }
        }
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
