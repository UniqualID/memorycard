import React from 'react';
import './PokemonCard.css';

const truncate = (str, maxLen) =>
    str.length > maxLen ? str.slice(0, maxLen - 1) + '…' : str;

export default function PokemonCard({ name, image }) {
    const displayName = truncate(name.replace(/-/g, ' '), 16);
    return (
        <div className="pokemon-card">
            <div className="pokemon-image-container">
                <img
                    className="pokemon-image"
                    src={image}
                    alt={displayName}
                    loading="lazy"
                />
            </div>
            <div className="pokemon-name">{displayName}</div>
        </div>
    );
} 