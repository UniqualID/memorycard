import { useState, useEffect } from 'react';
import './reset.css';
import './App.css';

const CARDS = ['A', 'B', 'C'];

function App() {
    const [selectedCards, setSelectedCards] = useState(new Set());
    const [gameState, setGameState] = useState('playing');
    const [score, setScore] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [highScore, setHighScore] = useState(0);
    const [dealt, setDealt] = useState(false);
    const [flipped, setFlipped] = useState([false, false, false]);

    useEffect(() => {
        // Start with all cards face down and stacked
        setDealt(false);
        setFlipped([false, false, false]);
        if (gameState === 'playing') {
            // Deal cards after a short delay
            setTimeout(() => {
                setDealt(true);
                // Flip each card with a stagger
                CARDS.forEach((_, i) => {
                    setTimeout(() => {
                        setFlipped(f => {
                            const arr = [...f];
                            arr[i] = true;
                            return arr;
                        });
                    }, 400 + i * 250);
                });
            }, 400);
        }
    }, [gameState]);

    useEffect(() => {
        if (gameState === 'won') {
            setHighScore((prev) => Math.max(prev, score + 1));
        }
    }, [gameState, score]);

    useEffect(() => {
        if (gameState === 'won' || gameState === 'lost') {
            setShowModal(false);
            const timer = setTimeout(() => setShowModal(true), 2000);
            return () => clearTimeout(timer);
        } else {
            setShowModal(false);
        }
    }, [gameState]);

    const handleCardClick = (card, idx) => {
        if (gameState !== 'playing') return;
        if (!flipped[idx]) return; // Ignore clicks before flip

        if (selectedCards.has(card)) {
            setGameState('lost');
            return;
        }

        if (score + 1 === 3) {
            setGameState('won');
            return;
        }

        setSelectedCards(new Set([...selectedCards, card]));
        setScore(score + 1);
    };

    const handlePlayAgain = () => {
        setSelectedCards(new Set());
        setGameState('playing');
        setScore(0);
        setShowModal(false);
    };

    return (
        <>
            <header className="header">
                <h1>🃏 Memory Card Game</h1>
            </header>
            <div className="infobox">
                <span>Score: {score}</span>
                <span>High Score: {highScore}</span>
            </div>
            {gameState === 'playing' && (
                <main>
                    <div className="card-row">
                        {CARDS.map((card, i) => (
                            <div
                                key={card}
                                className={`card-outer`}
                                style={{
                                    '--deal-x': dealt ? `${(i - 1) * 120}px` : '0px',
                                    '--deal-y': dealt ? '0px' : '-80px',
                                    zIndex: 10 - i,
                                }}
                            >
                                <div
                                    className={`card-inner${flipped[i] ? ' flipped' : ''}`}
                                    onClick={() => handleCardClick(card, i)}
                                >
                                    <div className="card-face card-back" />
                                    <div className="card-face card-front">{card}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            )}
            {(gameState === 'won' || gameState === 'lost') && !showModal && (
                <div className="status-message">
                    <h2>{gameState === 'won' ? 'You Won!' : 'You Lost!'}</h2>
                </div>
            )}
            {showModal && (
                <div className="modal">
                    <div className="modal-box">
                        <h2>{gameState === 'won' ? 'You Won!' : 'You Lost!'}</h2>
                        <p>Your score: {score}</p>
                        <button onClick={handlePlayAgain}>Play Again</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default App;
