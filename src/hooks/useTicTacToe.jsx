import { useState, useEffect } from "react";
import { checkWinner, checkEndTheGame } from "../utils/gameLogic";
import { findBestMove } from "../utils/aiLogic";
import MinMax from "./../utils/MinMax";


export const useTicTacToe = () => {
    const [squares, setSquares] = useState(Array(9).fill(""));
    const [turn, setTurn] = useState("x");
    const [winner, setWinner] = useState(null);
    const [isAiMode, setIsAiMode] = useState(false);
    const [difficulty, setDifficulty] = useState("easy");
    const [bestMove, setBestMove] = useState([]);
    const [squareSize, setSquareSize] = useState(3);

    const updateSquares = (ind) => {
        if (squares[ind] || winner || (isAiMode && turn === "o")) {
            return;
        }
        const s = [...squares];
        s[ind] = turn;
        setSquares(s);
        MinMaxAlgorithm(s);

        setTurn(turn === "x" ? "o" : "x");
        const W = checkWinner(s);
        if (W) {
            setWinner(W);
        } else if (checkEndTheGame(s)) {
            setWinner("x | o");
        }
    };

    //Implement MinMaxAlgorithm
    const MinMaxAlgorithm = (s) => {
        //Actual configuration in a Matrix
        let configMatrix =[[ s[0], s[1], s[2]],[s[3],s[4],s[5]] ,[s[5],s[6],s[7]] ];
        const minMaxInstance = new MinMax(configMatrix);

        setBestMove([minMaxInstance.findBestMove().row, minMaxInstance.findBestMove().col]);
    }

    // AI move logic
    useEffect(() => {
        if (isAiMode && turn === "o" && !winner) {
            const bestMove = findBestMove([...squares], difficulty);
            if (bestMove !== -1) {
                const s = [...squares];
                s[bestMove] = "o";
                setSquares(s);
                setTurn("x");
                const W = checkWinner(s);
                if (W) {
                    setWinner(W);
                } else if (checkEndTheGame(s)) {
                    setWinner("x | o");
                }
            }
        }
    }, [turn, isAiMode, winner, difficulty]);

    const resetGame = () => {
        setSquares(Array(9).fill(""));
        setTurn("x");
        setWinner(null);
    };

    const toggleAiMode = () => {
        setIsAiMode(!isAiMode);
        resetGame();
    };

    const changeDifficulty = () => {
        const difficulties = ["easy", "medium", "hard"];
        const currentIndex = difficulties.indexOf(difficulty);
        const nextDifficulty =
            difficulties[(currentIndex + 1) % difficulties.length];
        setDifficulty(nextDifficulty);
        resetGame();
    };

    return {
        squares,
        turn,
        winner,
        isAiMode,
        difficulty,
        updateSquares,
        resetGame,
        toggleAiMode,
        changeDifficulty,
        bestMove,
        squareSize,
        setSquareSize,
    };
};
