import React from 'react';

export default function StartForm({ setCardType, setDifficultyLevel, setGameState, setShowStartModal }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = document.getElementById('startingForm');
        const formData = new FormData(form);
        setCardType(formData.get('cardType'));
        setDifficultyLevel(formData.get('difficultyLevel'));
        setGameState('loading');
        setShowStartModal(false);
    };

    return (
        <div className="modal">
            <div className="modal-box start-modal">
                <h1>Welcome to the Memory Card Game!</h1>
                <p>
                    Please select the type of card you would like to
                    play with, along with the difficulty level.
                </p>
                <form id="startingForm" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Card Type:</label>
                        <div className="radio-group">
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    name="cardType"
                                    value="playingcards"
                                    defaultChecked
                                />
                                <span>Playing Cards</span>
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

                    <button type="submit">
                        Start Game
                    </button>
                </form>
            </div>
        </div>
    );
} 