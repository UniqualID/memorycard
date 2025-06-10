import { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import CardRow from './CardRow.jsx';
import './reset.css';
import './App.css';

// const INITIALCARDS = ['A', 'B', 'C'];
const INITIALCARDS = [
    { id: uuidv4(), component: <>A</> },
    { id: uuidv4(), component: <>B</> },
    { id: uuidv4(), component: <>C</> },
    { id: uuidv4(), component: <>D</> },
    { id: uuidv4(), component: <>E</> },
    { id: uuidv4(), component: <>F</> },
    { id: uuidv4(), component: <>G</> },
    { id: uuidv4(), component: <>H</> },
    { id: uuidv4(), component: <>I</> },
    { id: uuidv4(), component: <>J</> },
    { id: uuidv4(), component: <>K</> },
    { id: uuidv4(), component: <>L</> },
];
const SHUFFLETIMES = 10; // Number of times to shuffle the cards

export default function App() {
    // State to track the game state: 'pre-deal', 'shuffle', 'playing', 'won', or 'lost'
    const [gameState, setGameState] = useState('pre-deal');
    const [score, setScore] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const highScore = useRef(0);
    const [selectedCards, setSelectedCards] = useState(new Set());

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

    // if (gameState === 'pre-deal') {
    //     //allow some time for the cards to return to "deal" state
    //     setTimeout(() => {
    //         setGameState('shuffle');
    //     }, 500);
    // }

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

            <main>
                <CardRow
                    initCards={INITIALCARDS}
                    gameState={gameState}
                    setGameState={setGameState}
                    score={score}
                    setScore={setScore}
                    selectedCards={selectedCards}
                    setSelectedCards={setSelectedCards}
                />
            </main>

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
