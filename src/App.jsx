import { useLayoutEffect, useState, useEffect, useRef } from 'react';
import CardRow from './CardRow.jsx';
import './reset.css';
import './App.css';

const INITIALCARDS = ['A', 'B', 'C'];
const SHUFFLETIMES = 10; // Number of times to shuffle the cards

function App() {
    // State to track the game state: 'pre-deal', 'playing', 'won', or 'lost'
    const [gameState, setGameState] = useState('pre-deal');
    const [score, setScore] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const highScore = useRef(0);

    useEffect(() => {
        if (gameState === 'won' || gameState === 'lost') {
            setShowModal(false);
            const timer = setTimeout(() => setShowModal(true), 2000);
            return () => clearTimeout(timer);
        } else {
            setShowModal(false);
        }
    }, [gameState]);

    const handlePlayAgain = () => {
        setSelectedCards(new Set());
        setGameState('playing');
        setScore(0);
        setShowModal(false);
    };

    highScore.current = Math.max(highScore.current, score);
    return (
        <>
            <header className="header">
                <h1>🃏 Memory Card Game</h1>
            </header>
            <div className="infobox">
                <span>Score: {score}</span>
                <span>High Score: {highScore.current}</span>
            </div>

            <CardRow
                initCards={INITIALCARDS}
                gameState={gameState}
                setGameState={setGameState}
                score={score}
                setScore={setScore}
            />

            {(gameState === 'won' || gameState === 'lost') && !showModal && (
                <div className="status-message">
                    <h2>{gameState === 'won' ? 'You Won!' : 'You Lost!'}</h2>
                </div>
            )}
            {showModal && (
                <div className="modal">
                    <div className="modal-box">
                        <h2>
                            {gameState === 'won' ? 'You Won!' : 'You Lost!'}
                        </h2>
                        <p>Your score: {score}</p>
                        <button onClick={handlePlayAgain}>Play Again</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default App;
