import React from 'react';
import './App.css';
import { Botao } from './componentes/Botao';
import { Input } from './componentes/input';
import { BotaoAC } from './componentes/botao_ac';
import * as math from 'mathjs';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: "",
      input2: "",
      calculado: false,
      decimal: false,
      operador: false,
      digitar_junto: true,
      memoria1: "",
      memoria2: "",
      memoria3: "",
      memoria4: "",
      memoriaAtual: 0
    };
  }

  escreverInput = val => {
    // Se é um ponto
    if (val === ".") {
      // se já tiver um ponto não escreve nada
      if (this.state.decimal === true) {}
      else {
        // Se já teve uma operação, ou input vazio
        if (this.state.calculado === true || this.state.input === "") {
          val = "0."
          this.setState({
            input: val,
            input2: val,
            calculado: false,
            decimal: true});
        }
        else {
            this.setState(state => ({
              input: this.state.input + val,
              input2: this.state.input2 + val,
              decimal: true}));
        }
      }
    }
    // Se é um número
    if (!isNaN(val)) {
      // Se já teve uma operação
      if (this.state.calculado === true || this.state.input === "") {
        this.setState({
          input: val,
          input2: val,
          calculado: false,
          digitar_junto: true});
      }
      else {
        // Se deve digitar os números juntos
        if (this.state.digitar_junto === true) {
          this.setState(state => ({
            input: this.state.input + val,
            input2: this.state.input2 + val,
            calculado: false}));
        }
        else {
          this.setState(state => ({
            input: val,
            input2: this.state.input2 + val,
            digitar_junto: true,
            calculado: false}));
        }
      }
    }
    // Se for operador, escreve na memória
    if (val === " X " || val === " + " || val === " - " || val === " ÷ ") {
      if (val === " X ") {
        val = " * ";
        this.setState(state => ({
          input2: this.state.input2 + val,
          operador: true,
          decimal: false,
          digitar_junto: false,
          calculado: false}));
      }

      if (val === " ÷ ") {
        val = " / "
        this.setState(state => ({
          input2: this.state.input2 + val,
          operador: true,
          decimal: false,
          digitar_junto: false,
          calculado: false}));
      }

      else {
        this.setState(state => ({
          input2: this.state.input2 + val,
          operador: true,
          decimal: false,
          digitar_junto: false,
          calculado: false}));
      }
    }
  }

  calcular = () => {
    this.setState(state => ({input: math.evaluate(this.state.input2)}));
    this.setState({
      calculado: true,
      decimal: false,
      digitar_junto: false});
  }

  acoesMemoriaGeral = val => {
    // salvar número na memória
    if (val === "MS") {
      if (this.state.memoria1 === "") {
        this.setState(state => ({
          memoria1: this.state.input,
          memoriaAtual: 1}));
      }
      else {
        if (this.state.memoria2 === "") {
          this.setState(state => ({
            memoria2: this.state.input,
            memoriaAtual: 2}));
        }
        else {
          if (this.state.memoria3 === "") {
            this.setState(state => ({
              memoria3: this.state.input,
              memoriaAtual: 3}));
          }
          else {
            if (this.state.memoria4 === "") {
              this.setState(state => ({
                memoria4: this.state.input,
                memoriaAtual: 4}));
            }
            else {
              if (this.state.memoriaAtual === 0 || this.state.memoriaAtual === 4) {
                this.setState(state => ({
                  memoria1: this.state.input,
                  memoriaAtual: 1}));
              }
              if (this.state.memoriaAtual === 1) {
                this.setState(state => ({
                  memoria2: this.state.input,
                  memoriaAtual: 2}));
              }
              if (this.state.memoriaAtual === 2) {
                this.setState(state => ({
                  memoria3: this.state.input,
                  memoriaAtual: 3}));
              }
              if (this.state.memoriaAtual === 3) {
                this.setState(state => ({
                  memoria4: this.state.input,
                  memoriaAtual: 4}));
              }
            }
          }
        }
      }
    }
    // Apagar toda a memória
    if (val === "MC") {
      this.setState({
        memoria1: "",
        memoria2: "",
        memoria3: "",
        memoria4: "",
        memoriaAtual: 0
      });
    }
    //Recuperar o último valor
    if (val === "MR") {
      if (this.state.memoriaAtual === 1) {
        this.setState(state => ({
          input: this.state.memoria1,
          input2: this.state.memoria1}));
      }
      if (this.state.memoriaAtual === 2) {
        this.setState(state => ({
          input: this.state.memoria2,
          input2: this.state.memoria2}));
      }
      if (this.state.memoriaAtual === 3) {
        this.setState(state => ({
          input: this.state.memoria3,
          input2: this.state.memoria3}));
      }
      if (this.state.memoriaAtual === 4) {
        this.setState(state => ({
          input: this.state.memoria4,
          input2: this.state.memoria4}));
      }
    }

    // Adicionar uma unidade na memória atual
    if (val === "M+") {
      if (this.state.memoriaAtual === 0) {
        this.setState({
          memoria1: 1,
          memoriaAtual: 1});
      }
      else {
        if (this.state.memoriaAtual === 1) {
          this.setState(state => ({memoria1: parseFloat(this.state.memoria1) + 1}));
        }
        if (this.state.memoriaAtual === 2) {
          this.setState(state => ({memoria2: parseFloat(this.state.memoria2) + 1}));
        }
        if (this.state.memoriaAtual === 3) {
          this.setState(state => ({memoria3: parseFloat(this.state.memoria3) + 1}));
        }
        if (this.state.memoriaAtual === 4) {
          this.setState(state => ({memoria4: parseFloat(this.state.memoria4) + 1}));
        }
      }
    }
  }

  acoesMemoria1 = val => {
    if (val === "MR") {
      if (this.state.memoria1 === "") {}
      else {
        this.setState(state => ({
          input: this.state.memoria1,
          input2: this.state.memoria1}));
      }
    }
    else {
      this.setState({memoria1: ""});
    }
  }

  acoesMemoria2 = val => {
    if (val === "MR") {
      if (this.state.memoria2 === "") {}
      else {
        this.setState(state => ({
          input: this.state.memoria2,
          input2: this.state.memoria2}));
      }
    }
    else {
      this.setState({memoria2: ""});
    }
  }

  acoesMemoria3 = val => {
    if (val === "MR") {
      if (this.state.memoria3 === "") {}
      else {
        this.setState(state => ({
          input: this.state.memoria3,
          input2: this.state.memoria3}));
      }
    }
    else {
      this.setState({memoria3: ""});
    }
  }

  acoesMemoria4 = val => {
    if (val === "MR") {
      if (this.state.memoria4 === "") {}
      else {
        this.setState(state => ({
          input: this.state.memoria4,
          input2: this.state.memoria4}));
      }
    }
    else {
      this.setState({memoria4: ""});
    }
  }

  render() {
    return (
      <div className="App">
        <div className="box-calc">
          <Input input={this.state.input2}></Input>
          <Input input={this.state.input}></Input>
          <div id="operacoes" className="linha">
            <Botao handleClick={this.acoesMemoriaGeral}>MC</Botao>
            <Botao handleClick={this.acoesMemoriaGeral}>MR</Botao>
            <Botao handleClick={this.acoesMemoriaGeral}>M+</Botao>
            <Botao handleClick={this.acoesMemoriaGeral}>MS</Botao>
          </div>
          <div id="operacoes" className="linha">
            <Botao handleClick={this.escreverInput}> + </Botao>
            <Botao handleClick={this.escreverInput}> - </Botao>
            <Botao handleClick={this.escreverInput}> X </Botao>
            <Botao handleClick={this.escreverInput}> ÷ </Botao>
          </div>
          <div id="bloco" className="linha">
            <div className="coluna">
              <Botao handleClick={this.escreverInput}>7</Botao>
              <Botao handleClick={this.escreverInput}>4</Botao>
              <Botao handleClick={this.escreverInput}>1</Botao>
              <Botao handleClick={this.escreverInput}>0</Botao>
            </div>
            <div className="coluna">
              <Botao handleClick={this.escreverInput}>8</Botao>
              <Botao handleClick={this.escreverInput}>5</Botao>
              <Botao handleClick={this.escreverInput}>2</Botao>
              <Botao handleClick={this.escreverInput}>.</Botao>
            </div>
            <div className="coluna">
              <Botao handleClick={this.escreverInput}>9</Botao>
              <Botao handleClick={this.escreverInput}>6</Botao>
              <Botao handleClick={this.escreverInput}>3</Botao>
              <BotaoAC handleClear={() => this.setState({input: "", calculado: 'false', decimal: 'false', operador: 'false'})}>AC</BotaoAC>
            </div>
            <div id="igual" className="coluna">
              <Botao handleClick={this.calcular}>=</Botao>
            </div>
          </div>
        </div>
        <div className="box-memoria">
          <h1>Memória</h1>
          <div className="coluna">
            <div className="input-memoria">
              <Input input={this.state.memoria1}></Input>
            </div>
            <div className="acoes-memoria">
              <Botao handleClick={this.acoesMemoria1}>MC</Botao>
              <Botao handleClick={this.acoesMemoria1}>MR</Botao>
            </div>
          </div>
          <div className="coluna">
            <div className="input-memoria">
              <Input input={this.state.memoria2}></Input>
            </div>
            <div className="acoes-memoria">
              <Botao handleClick={this.acoesMemoria2}>MC</Botao>
              <Botao handleClick={this.acoesMemoria2}>MR</Botao>
            </div>
          </div>
          <div className="coluna">
            <div className="input-memoria">
              <Input input={this.state.memoria3}></Input>
            </div>
            <div className="acoes-memoria">
              <Botao handleClick={this.acoesMemoria3}>MC</Botao>
              <Botao handleClick={this.acoesMemoria3}>MR</Botao>
            </div>
          </div>
          <div className="coluna">
            <div className="input-memoria">
              <Input input={this.state.memoria4}></Input>
            </div>
            <div className="acoes-memoria">
              <Botao handleClick={this.acoesMemoria4}>MC</Botao>
              <Botao handleClick={this.acoesMemoria4}>MR</Botao>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
  
export default App;
