import {useState, useEffect} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {useTicTacToe} from "./hooks/useTicTacToe";
import Button from "./components/Button";
import Square from "./components/Square";
import GIF from "./ressources/Cat_GIF.gif";
import './index.css';
import clickSound from './ressources/buttonSound.mp3';
import Lottie from 'lottie-react';
import confettiAnimation from './ressources/confettiAnimation.json';

function App() {

    
    
    const [audio] = useState(new Audio(clickSound));
    const {
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
        setSquareSize
    } = useTicTacToe();
    
    useEffect(() => {
        const game = document.getElementById("game");
        if (game) {
            game.style.setProperty("grid-template-columns", "repeat(" + squareSize + ", 1fr)");
        }
    }, [squareSize]);

    const handleSquareClick = (index) => {
        audio.play();
        updateSquares(index);
    };

    return (
        <div className="Repartition">
            <div id="OIA_1">
                <img src={GIF} alt="Cool animation"/>
            </div>

            <div className="tic-tac-toe">
                <h1>
                    TIC-TAC-TOE
                    {isAiMode
                        ? ` (AI Mode - ${
                            difficulty.charAt(0).toUpperCase() + difficulty.slice(1)
                        } Level)`
                        : ""}
                </h1>
                <h2>Algorithm Exploration</h2>
                <h3>Min Max</h3>

                <div className="game-controls">
                    <Button resetGame={resetGame} text="Reset Game"/>
                    <button onClick={toggleAiMode} className="ai-toggle">
                        {isAiMode ? "Disable AI" : "Enable AI"}
                    </button>
                    {isAiMode && (
                        <button onClick={changeDifficulty} className="difficulty-toggle">
                            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                        </button>
                    )}
                </div>

                <div className="game" id='game'>
                {
                Array.from({ length: squareSize*squareSize }, (_, ind) => (
                    <Square
                        key={ind}
                        ind={ind}
                        updateSquares={handleSquareClick}
                        clsName={squares[ind]}
                    />
                ))}
                </div>

                <div className={`turn ${turn === "x" ? "left" : "right"}`}>
                    <Square clsName="x"/>
                    <Square clsName="o"/>
                </div>

                <div className="bestMove">
                    Best Move given by MinMax Algorithm is :
                </div>
                <div id="blocMove">
                    <div className="bestMove">line <span className={turn}>{bestMove[0]}</span> : column <span
                        className={turn}>{bestMove[1]}</span></div>
                </div>

                <div id="changeSquareSize">
                    <div id="rowButton">
                        <button onClick={() => {
                            setSquareSize(Math.max(3, squareSize - 1))
                            const game = document.getElementById("game");
                            if (game) {
                                game.style.setProperty("grid-template-columns", "repeat(" + squareSize + ", 1fr)");
                            }
                        }}>Decrease Square Size</button>
                        Actual Square Size : {squareSize}
                        <button onClick={() =>  {
                            setSquareSize(squareSize+1)
                            const game = document.getElementById("game");
                            if (game) {
                                game.style.setProperty("grid-template-columns", "repeat(" + squareSize + ", 1fr)");
                            }
                        }}>Increase Square Size</button>
                    </div>
                </div>
                <AnimatePresence>
                    {winner && (
                        <motion.div
                            key={"parent-box"}
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            className="winner"
                        >
                            <motion.div
                                key={"child-box"}
                                initial={{scale: 0}}
                                animate={{scale: 1}}
                                exit={{
                                    scale: 0,
                                    opacity: 0,
                                }}
                                className="text"
                            >
                                <motion.h2
                                    initial={{
                                        scale: 0,
                                        y: 100,
                                    }}
                                    animate={{
                                        scale: 1,
                                        y: 0,
                                        transition: {
                                            y: {
                                                delay: 0.7,
                                            },
                                            duration: 0.7,
                                        },
                                    }}
                                >
                                    {winner === "x | o"
                                        ? "Tie :/"
                                        : "Winner!! :)"}
                                </motion.h2>
                                <motion.div
                                    initial={{
                                        scale: 0,
                                    }}
                                    animate={{
                                        scale: 1,
                                        transition: {
                                            delay: 1.3,
                                            duration: 0.2,
                                        },
                                    }}
                                    className="win"
                                >
                                    {winner === "x | o" ? (
                                        <>
                                            <Square clsName="x"/>
                                            <Square clsName="o"/>
                                        </>
                                    ) : (
                                        <>
                                            <Square clsName={winner}/>
                                        </>
                                    )}
                                </motion.div>
                                <motion.div
                                    initial={{
                                        scale: 0,
                                    }}
                                    animate={{
                                        scale: 1,
                                        transition: {
                                            delay: 1.5,
                                            duration: 0.3,
                                        },
                                    }}
                                >
                                    <Button resetGame={resetGame} text="Play Again"/>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div id="OIA_2">
                <img src={GIF} alt="Cool animation"/>
            </div>

            {winner && (
                <>
                    <div className="confetti-left">
                        <Lottie animationData={confettiAnimation} loop={true}/>
                    </div>
                    <div className="confetti-right">
                        <Lottie animationData={confettiAnimation} loop={true}/>
                    </div>
                </>
            )}
        </div>
    );
}

export default App;