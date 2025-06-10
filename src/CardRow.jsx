import React, { useRef, useLayoutEffect, useEffect, useState } from 'react';

const SHUFFLETIMES = 10; // Number of times to shuffle the cards
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
                    }, 400 + i * 250);
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
                }, i * 250 + 500);
                intervalIds.push(id);
            }
            // After shuffling, set the game state to 'playing'

            intervalIds.push(
                setTimeout(() => {
                    setGameState('playing');
                }, SHUFFLETIMES * 250 + 600)
            );
            return () => {
                intervalIds.forEach(clearTimeout);
            };
        }
    }, [gameState]);

    const firstRectsRef = useRef(new Map());

    useLayoutEffect(() => {
        const newRects = new Map();
        cards.forEach((key, i) => {
            const el = cardsRef.current.get(key);
            if (!el) return;
            const newRect = el.getBoundingClientRect();
            newRects.set(key, newRect);

            const prev = firstRectsRef.current.get(key);
            if (prev) {
                const dx = prev.left - newRect.left;
                const dy = prev.top - newRect.top;

                if (dx || dy) {
                    el.style.transform = `translate(${dx}px, ${dy}px)`;
                    el.style.transition = 'transform 0s ';

                    // Force reflow to apply the transform immediately
                    void el.offsetWidth;

                    el.style.transition = 'transform 250ms';
                    el.style.transform = '';
                }
            }
        });
        firstRectsRef.current = newRects;
        const id = setTimeout(() => setGameState('shuffle'), 250);
        return () => clearTimeout(id);
    }, [cards]);
    const handleCardClick = (card, idx) => {
        if (gameState !== 'playing') return;
        if (!flipped[idx]) return; // Ignore clicks before flip

        if (selectedCards.has(card)) {
            setGameState('lost');
            return;
        }

        if (score + 1 === cards.length) {
            setGameState('won');
            return;
        }

        setSelectedCards(new Set([...selectedCards, card]));
        setScore(score + 1);
        setGameState('pre-deal');
    };
    return (
        <div className="card-row">
            {cards.map((card, i) => (
                <div
                    key={card}
                    ref={(el) => {
                        if (el) {
                            cardsRef.current.set(card, el);
                        } else {
                            cardsRef.current.delete(card);
                        }
                    }}
                    className={`card-outer`}
                    style={{
                        '--deal-x': dealt ? `${(i - 1) * 120}px` : '0px',
                        '--deal-y': dealt ? '80px' : '0px',
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
    );
}
