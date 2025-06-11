import React from 'react';
import './NumberCard.css';

export default function NumberCard({ number }) {
    return (
        <div className="number-card">
            <span className="number-value">{number}</span>
        </div>
    );
} 