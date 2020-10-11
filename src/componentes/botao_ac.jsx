import React from 'react';
import './botao_ac.css'

export const BotaoAC = (props) => (
    <div className="botao-ac" onClick={props.handleClear}>
        {props.children}
    </div>
)