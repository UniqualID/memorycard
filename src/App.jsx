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
    // State to track the game state: 'start', 'pre-deal', 'shuffle', 'playing', 'won', or 'lost'
    const [gameState, setGameState] = useState('start');
    const [score, setScore] = useState(0);
    const [showStartModal, setShowStartModal] = useState(true);
    const [showEndModal, setShowEndModal] = useState(false);
    const highScore = useRef(0);
    const [selectedCards, setSelectedCards] = useState(new Set());

    useEffect(() => {
        if (gameState === 'won' || gameState === 'lost') {
            setShowEndModal(false);
            const timer = setTimeout(() => setShowEndModal(true), 2000);
            return () => clearTimeout(timer);
        } else {
            setShowEndModal(false);
        }
    }, [gameState]);

    const handlePlayAgain = () => {
        setSelectedCards(new Set());
        setGameState('playing');
        setScore(0);
        setShowEndModal(false);
    };

    if (gameState === 'pre-deal') {
        //allow some time for the cards to return to "deal" state
        setTimeout(() => {
            setGameState('shuffle');
        }, 100);
    }

    highScore.current = Math.max(highScore.current, score);
    if (gameState === 'start') {
        return (
            <>
                <div className="modal">
                    <div className="modal-box start-modal">
                        <h1>Welcome to the Memory Card Game!</h1>
                        <h2>
                            Please select the type of card you would like to
                            play with, along with the difficulty level.
                        </h2>
                        <form id="startingForm">
                            <div className="form-group">
                                <label>Card Type:</label>
                                <div className="radio-group">
                                    <label className="radio-label">
                                        <input
                                            type="radio"
                                            name="cardType"
                                            value="letters"
                                            defaultChecked
                                        />
                                        <span>Letters</span>
                                    </label>
                                    <label className="radio-label">
                                        <input
                                            type="radio"
                                            name="cardType"
                                            value="numbers"
                                        />
                                        <span>Numbers</span>
                                    </label>
                                    <label className="radio-label">
                                        <input
                                            type="radio"
                                            name="cardType"
                                            value="symbols"
                                        />
                                        <span>Symbols</span>
                                    </label>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Difficulty Level:</label>
                                <div className="radio-group">
                                    <label className="radio-label">
                                        <input
                                            type="radio"
                                            name="difficultyLevel"
                                            value="easy"
                                            defaultChecked
                                        />
                                        <span>Easy</span>
                                    </label>
                                    <label className="radio-label">
                                        <input
                                            type="radio"
                                            name="difficultyLevel"
                                            value="medium"
                                        />
                                        <span>Medium</span>
                                    </label>
                                    <label className="radio-label">
                                        <input
                                            type="radio"
                                            name="difficultyLevel"
                                            value="hard"
                                        />
                                        <span>Hard</span>
                                    </label>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => {
                                    setGameState('pre-deal');
                                    setShowStartModal(false);
                                }}
                            >
                                Start Game
                            </button>
                        </form>
                    </div>
                </div>
            </>
        );
    }
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

            {(gameState === 'won' || gameState === 'lost') && !showEndModal && (
                <div className="status-message">
                    <h2>{gameState === 'won' ? 'You Won!' : 'You Lost!'}</h2>
                </div>
            )}
            {showEndModal && (
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
