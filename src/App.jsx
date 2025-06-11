import { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import CardRow from './CardRow.jsx';
import StartForm from './StartForm.jsx';
import Loading from './Loading.jsx';
import PlayingCards from './utils/playingcards.jsx';
import PokemonCards from './utils/pokemoncards.jsx';
import NumberCards from './utils/numbercards.jsx';
import RickAndMortyCards from './utils/rickandmortycards.jsx';
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
const MINLOADTIME = 1000; // Minimum time to load the cards

export default function App() {
    // State to track the game state: 'start', 'loading', 'pre-deal', 'shuffle', 'playing', 'won', or 'lost'
    const [gameState, setGameState] = useState('start');
    const [score, setScore] = useState(0);
    const [showStartModal, setShowStartModal] = useState(true);
    const [showEndModal, setShowEndModal] = useState(false);
    const highScore = useRef(0);
    const [selectedCards, setSelectedCards] = useState(new Set());
    const [cardType, setCardType] = useState('');
    const [difficultyLevel, setDifficultyLevel] = useState('');
    const [cards, setCards] = useState(null);

    useEffect(() => {
        if (gameState === 'won' || gameState === 'lost') {
            setShowEndModal(false);
            const timer = setTimeout(() => setShowEndModal(true), 2000);
            return () => clearTimeout(timer);
        } else {
            setShowEndModal(false);
        }
    }, [gameState]);

    useEffect(() => {
        async function loadCards() {
            if (gameState === 'loading') {
                const startTime = Date.now();
                console.log('loading difficulty level: ', difficultyLevel);
                console.log('loading card type: ', cardType);

                const numCards = {
                    easy: 5,
                    medium: 10,
                    hard: 15,
                }[difficultyLevel];

                const callBack = {
                    playingcards: PlayingCards,
					pokemon: PokemonCards,
                    numbers: NumberCards,
                    rickandmorty: RickAndMortyCards,
                }[cardType];

                const cards = await callBack(numCards);
				
				const endTime = Date.now();
				const loadTime = endTime - startTime;
                setTimeout(() => {
					setCards(cards);
                    setGameState('pre-deal');
                }, Math.max(0, Math.min(MINLOADTIME, MINLOADTIME - loadTime)));
            }
        }
        loadCards();
    }, [gameState]);

    const handlePlayAgain = () => {
        setSelectedCards(new Set());
        setGameState('playing');
        setScore(0);
        setShowEndModal(false);
    };

    const handleChangeSettings = () => {
        setShowStartModal(true);
        setShowEndModal(false);
		setGameState('start');
		setScore(0);
		setCards(null);
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
            <StartForm
                setCardType={setCardType}
                setDifficultyLevel={setDifficultyLevel}
                setGameState={setGameState}
                setShowStartModal={setShowStartModal}
            />
        );
    }
    if (gameState === 'loading') {
        return <Loading />;
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
                    cards={cards}
                    setCards={setCards}
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
                    <div className="modal-box end-modal">
                        <h2>
                            {gameState === 'won' ? 'You Won!' : 'You Lost!'}
                        </h2>
                        <p>Your score: {score}</p>
                        <button onClick={handlePlayAgain}>Play Again</button>
                        <button onClick={handleChangeSettings}>Change Settings</button>
                    </div>
                </div>
            )}
        </>
    );
}
