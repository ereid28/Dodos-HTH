import React from 'react';
import './GameBorder.css';

const GameBorder = () => {

    return (
        <div className="game-border">
            <div className="row"></div>
            <div className="row">
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
            </div>
            <div className="row"></div>
        </div>
    );
}

export default GameBorder;