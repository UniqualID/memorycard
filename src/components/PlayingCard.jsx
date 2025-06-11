import React from 'react';

const PlayingCard = ({ cardString }) => {
    // Parse the card string
    const [value, suit] = cardString.split('_');
    
    // Define suit symbols and colors
    const suitSymbols = {
        hearts: '♥',
        diamonds: '♦',
        clubs: '♣',
        spades: '♠'
    };
    
    const suitColors = {
        hearts: 'red',
        diamonds: 'red',
        clubs: 'black',
        spades: 'black'
    };

    return (
        <div className="playing-card" style={{ color: suitColors[suit] }}>
            <div className="card-corner top-left">
                <div className="card-value">{value}</div>
                <div className="card-suit">{suitSymbols[suit]}</div>
            </div>
            <div className="card-center">
                <div className="card-suit large">{suitSymbols[suit]}</div>
            </div>
            <div className="card-corner bottom-right">
                <div className="card-value">{value}</div>
                <div className="card-suit">{suitSymbols[suit]}</div>
            </div>
        </div>
    );
};

export default PlayingCard; 