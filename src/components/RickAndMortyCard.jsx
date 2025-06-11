import React from 'react';
import './RickAndMortyCard.css';

const truncate = (str, maxLen) =>
    str.length > maxLen ? str.slice(0, maxLen - 1) + '…' : str;

export default function RickAndMortyCard({ name, image }) {
    const displayName = truncate(name, 18);
    return (
        <div className="ram-card">
            <div className="ram-image-container">
                <img
                    className="ram-image"
                    src={image}
                    alt={displayName}
                    loading="lazy"
                />
            </div>
            <div className="ram-name">{displayName}</div>
        </div>
    );
} 