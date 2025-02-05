import {WINNING_COMBOS} from './gameLogic';

class MinMax {

    //get config -> return actual config
    //isMovesLeft -> return true if there are moves remaining on the board. It returns false if there are no moves left to play (end of the game)
    //evaluate -> evaluate the board and returns a value based on who is winning. 10 if x wins, -10 if o wins, 0 if tie
    //minimax -> minimax function. It considers all the possible ways the game can go and returns the value of the board
    //findBestMove -> return the best possible move for the player

    config;
    squareSize;
    winningCombos;

    constructor(config,squareSize) {
        this.config = config;

        this.squareSize = squareSize;

        this.winningCombos = new Set();
        WINNING_COMBOS(this.winningCombos, squareSize);
    }

    getConfig() {
        return this.config;
    }

    // This function returns true if there are moves remaining on the board. It returns false if there are no moves left to play.
    isMovesLeft() {
        for (let i = 0; i < this.squareSize; i++){
            for (let j = 0; j < this.squareSize; j++){
                if (this.config[i][j] === '')
                    return true;
            }
        }
        return false;
    }

    // This function evaluates the board and returns a value based on who is winning. (10 if X wins, -10 if O wins, 0 if tie)
    evaluate() {
        console.log("evaluate");
        // Check all combo
        for (let combo of this.winningCombos) {
            let player = this.config[combo[0][0]][combo[0][1]];
            if (!player) continue;
            for (let i = 1; i < this.squareSize; i++) {
                if (player !== this.config[combo[i][0]][combo[i][1]]) {
                    player = null;
                    break;
                }
            }
            if (player) {
                if (player === 'x') {
                    return 10;
                } else {
                    return -10;
                }
            }
        }

        // Else if none of them have won then return 0
        return 0;
    }

    // This is the minimax function. It considers all the possible ways the game can go and returns the value of the board.
    minimax(depth, isMax) {
        let score = this.evaluate();

        // If Maximizer has won the game return his/her evaluated score
        if (score === 10)
            return score;

        // If Minimizer has won the game return his/her evaluated score
        if (score === -10)
            return score;

        // If there are no more moves and no winner then it is a tie
        if (this.isMovesLeft() === false)
            return 0;

        // If this maximizer's move
        if (isMax) {
            let best = -1000;

            // Traverse all cells
            for (let i = 0; i < this.squareSize; i++) {
                for (let j = 0; j < this.squareSize; j++) {
                    // Check if cell is empty
                    if (this.config[i][j] === '') {
                        // Make the move
                        this.config[i][j] = 'x';

                        // Call minimax recursively and choose the maximum value
                        best = Math.max(best, this.minimax(depth + 1, !isMax));

                        // Undo the move
                        this.config[i][j] = '';
                    }
                }
            }
            return best;
        } else {
            let best = 1000;

            // Traverse all cells
            for (let i = 0; i < this.squareSize; i++) {
                for (let j = 0; j < this.squareSize; j++) {
                    // Check if cell is empty
                    if (this.config[i][j] === '') {
                        // Make the move
                        this.config[i][j] = 'o';

                        // Call minimax recursively and choose the minimum value
                        best = Math.min(best, this.minimax(depth + 1, !isMax));

                        // Undo the move
                        this.config[i][j] = '';
                    }
                }
            }
            return best;
        }
    }

    // This will return the best possible move for the player
    findBestMove() {
        let bestVal = -1000;
        let bestMove = {
            row: -1,
            col: -1
        };

        // Traverse all cells, evaluate minimax function for all empty cells. And return the cell with optimal value.
        for (let i = 0; i < this.squareSize; i++) {
            for (let j = 0; j < this.squareSize; j++) {
                // Check if cell is empty
                if (this.config[i][j] === '') {
                    // Make the move
                    this.config[i][j] = 'x';

                    // Compute evaluation function for this move.
                    let moveVal = this.minimax(0, false);

                    // Undo the move
                    this.config[i][j] = '';

                    // If the value of the current move is more than the best value, then update best
                    if (moveVal > bestVal) {
                        bestMove.row = i;
                        bestMove.col = j;
                        bestVal = moveVal;
                    }
                }
            }
        }
        return bestMove;
    }





}

export default MinMax;