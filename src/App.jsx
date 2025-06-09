import { useState } from 'react';
import './reset.css';
import './App.css';

function App() {
    const [selectedCards, setSelectedCards] = useState(new Set());
    const [gameState, setGameState] = useState('playing'); // 'playing', 'won', 'lost'
    const [score, setScore] = useState(0);

    const handleCardClick = (card) => {
        if (gameState !== 'playing') return;

        if (selectedCards.has(card)) {
            // Card already selected, lose
            setGameState('lost');
            return;
        }

        if (score + 1 === 3) {
            // All cards matched, win
            setGameState('won');
            return;
        }

        // Select the card
        setSelectedCards(new Set([...selectedCards, card]));
        setScore(score + 1);
    };

    return (
        <>
            {gameState === 'playing' ? (
                <>
                    <nav>Memory Card Game</nav>
                    <main>
                        <div className="card" onClick={() => handleCardClick('A')}>A</div>
                        <div className="card" onClick={() => handleCardClick('B')}>B</div>
                        <div className="card" onClick={() => handleCardClick('C')}>C</div>
                    </main>
                </>
            ) : (
                <div className="modal">
                    <div className="modal-box">
                        <h2>{gameState === 'won' ? 'You Won!' : 'You Lost!'}</h2>
                        <p>Your score: {score}</p>
                        <button
                            onClick={() => {
                                setSelectedCards(new Set());
                                setGameState('playing');
                                setScore(0);
                            }}
                        >
                            Play Again
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default App;
