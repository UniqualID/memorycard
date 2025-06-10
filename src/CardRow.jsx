import React, { useRef, useLayoutEffect, useEffect, useState } from 'react';

const FLIPINTERVAL = 200;
const SHUFFLEINTERVAL = 400;
const SHUFFLEDURATION = 300; // Duration for shuffle animation
const SHUFFLETIMES = 6; // Number of times to shuffle the cards
export default function CardRow({
    initCards,
    gameState,
    setGameState,
    score,
    setScore,
    selectedCards,
    setSelectedCards,
}) {
    const [cards, setCards] = React.useState(initCards);
    const [dealt, setDealt] = useState(false);
    const [flipped, setFlipped] = useState([false, false, false]);
    const cardsRef = useRef(new Map());
    const dummyCardsRef = useRef(new Map());
    const offsets = useRef([]);

    useEffect(() => {
        // Start with all cards face down and stacked
        setDealt(false);
        setFlipped([false, false, false]);
        if (gameState === 'playing') {
            // Deal cards after a short delay
            setTimeout(() => {
                setDealt(true);
                // Flip each card with a stagger
                cards.forEach((_, i) => {
                    setTimeout(() => {
                        setFlipped((f) => {
                            const arr = [...f];
                            arr[i] = true;
                            return arr;
                        });
                    }, i * FLIPINTERVAL);
                });
            }, 100);
        }
    }, [gameState]);

    useEffect(() => {
        if (gameState === 'shuffle') {
            const intervalIds = [];
            for (let i = 0; i < SHUFFLETIMES; i++) {
                const id = setTimeout(() => {
                    const newCards = [...cards].sort(() => Math.random() - 0.5);
                    setCards(newCards);
                }, i * SHUFFLEINTERVAL + 500);
                intervalIds.push(id);
            }
            // After shuffling, set the game state to 'playing'

            intervalIds.push(
                setTimeout(() => {
                    setGameState('playing');
                }, SHUFFLETIMES * SHUFFLEINTERVAL + 600)
            );
            return () => {
                intervalIds.forEach(clearTimeout);
            };
        }
    }, [gameState]);

    const firstRectsRef = useRef(new Map());

    useLayoutEffect(() => {
        const newRects = new Map();
        cards.forEach((card) => {
            const el = cardsRef.current.get(card.id);
            if (!el) return;
            const newRect = el.getBoundingClientRect();
            newRects.set(card.id, newRect);

            const prev = firstRectsRef.current.get(card.id);
            if (prev) {
                const dx = prev.left - newRect.left;
                const dy = prev.top - newRect.top;

                if (dx || dy) {
                    el.style.transform = `translate(${dx}px, ${dy}px)`;
                    el.style.transition = 'transform 0s ';

                    // Force reflow to apply the transform immediately
                    void el.offsetWidth;

                    el.style.transition = `transform ${SHUFFLEDURATION}ms linear`;
                    // el.style.transition = `transform 2s cubic-bezier(0.4, 2, 0.6, 1)`;
                    el.style.transform = '';
                }
            }
        });
        firstRectsRef.current = newRects;
        const id = setTimeout(() => setGameState('shuffle'), 250);
        return () => clearTimeout(id);
    }, [cards]);

    useEffect(() => {
        cards.forEach((card, i) => {
            const el = cardsRef.current.get(card.id);
            const dummyEl = dummyCardsRef.current.get(i);
            if (!el || !dummyEl) return;
            const rect = el.getBoundingClientRect();
            const dummyRect = dummyEl.getBoundingClientRect();
            offsets.current.push({
                dx: dummyRect.left - rect.left,
                dy: dummyRect.top - rect.top,
            });
        });
        console.log(offsets);
    }, [window.innerWidth, cardsRef.length, dummyCardsRef.length]);

    const handleCardClick = (key, idx) => {
        if (gameState !== 'playing') return;
        if (!flipped[idx]) return; // Ignore clicks before flip

        if (selectedCards.has(key)) {
            setGameState('lost');
            return;
        }

        if (score + 1 === cards.length) {
            setGameState('won');
            return;
        }

        setSelectedCards(new Set([...selectedCards, key]));
        setScore(score + 1);
        setGameState('pre-deal');
    };

    return (
        <>
            <div className="card-row">
                {cards.map((card, i) => (
                    <div
                        key={card.id}
                        ref={(el) => {
                            if (el) {
                                cardsRef.current.set(card.id, el);
                            } else {
                                cardsRef.current.delete(card.id);
                            }
                        }}
                        className={`card-outer`}
                        style={{
                            '--deal-x': dealt
                                ? `${offsets.current[i]['dx']}px`
                                : '0px',
                            '--deal-y': dealt
                                ? `${offsets.current[i]['dy']}px`
                                : '0px',
                        }}
                    >
                        <div
                            className={`card-inner${
                                flipped[i] ? ' flipped' : ''
                            }`}
                            onClick={() => handleCardClick(card.id, i)}
                        >
                            <div className="card-face card-back" />
                            <div className="card-face card-front">
                                {card.component}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="card-display">
                {cards.map((_, i) => (
                    <div
                        className="dummy-card"
                        style={{ outline: '1px solid red' }}
                        key={i}
                        ref={(el) => {
                            if (el) {
                                dummyCardsRef.current.set(i, el);
                            } else {
                                dummyCardsRef.current.delete(i.id);
                            }
                        }}
                    ></div>
                ))}
            </div>
        </>
    );
}
