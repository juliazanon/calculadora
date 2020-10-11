import React from 'react';
import './Botao.css';

const Operador = val => {
    return !isNaN(val) || val === "." || val === "=";
};

export const Botao = props => (
    // se a função retornar true, className é box-botao, se false, é operador
    <div className={`box-botao ${
        Operador(props.children) ? null : "operador"
    }`}
    onClick={() => props.handleClick(props.children)}
    > 
        {props.children}
    </div>
);