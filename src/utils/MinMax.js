import { WINNING_COMBOS } from './gameLogic';

class MinMax {

    config;
    squareSize;
    winningCombos;

    constructor(config, squareSize) {
        this.config = config;
        this.squareSize = squareSize;
        this.winningCombos = new Set();
        WINNING_COMBOS(this.winningCombos, squareSize);
    }

    getConfig() {
        return this.config;
    }

    isMovesLeft() {
        for (let i = 0; i < this.squareSize; i++) {
            for (let j = 0; j < this.squareSize; j++) {
                if (this.config[i][j] === '')
                    return true;
            }
        }
        return false;
    }

    evaluate() {
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
        return 0;
    }

    minimax(depth, isMax, alpha, beta) {
        let score = this.evaluate();

        if (score === 10)
            return score;

        if (score === -10)
            return score;

        if (!this.isMovesLeft())
            return 0;

        let best
        if (isMax) {
            best = -10000;

            for (let i = 0; i < this.squareSize; i++) {
                for (let j = 0; j < this.squareSize; j++) {
                    if (this.config[i][j] === '') {
                        this.config[i][j] = 'x';

                        best = Math.max(best, this.minimax(depth + 1, !isMax, alpha, beta));

                        this.config[i][j] = '';

                        alpha = Math.max(alpha, best);

                        if (best >= beta)
                            return best;
                    }
                }
            }
        } else {
            best = 10000;

            for (let i = 0; i < this.squareSize; i++) {
                for (let j = 0; j < this.squareSize; j++) {
                    if (this.config[i][j] === '') {
                        this.config[i][j] = 'o';

                        best = Math.min(best, this.minimax(depth + 1, !isMax, alpha, beta));

                        this.config[i][j] = '';

                        beta = Math.min(beta, best);

                        if (best <= alpha)
                            return best;
                    }
                }
            }
        }
        return best;
    }

    findBestMove() {
        let bestVal = -1000;
        let bestMove = {
            row: -1,
            col: -1
        };

        for (let i = 0; i < this.squareSize; i++) {
            for (let j = 0; j < this.squareSize; j++) {
                if (this.config[i][j] === '') {
                    this.config[i][j] = 'x';

                    let moveVal = this.minimax(0, false, -1000, 1000);

                    this.config[i][j] = '';

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