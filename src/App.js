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
      calculado: 'false',
      decimal: 'false',
      operador: 'false',
      digitar_junto: 'true'
    };
  }

  escreverInput = val => {
    // Se é um ponto
    if (val === ".") {
      // se já tiver um ponto não escreve nada
      if (this.state.decimal === 'true') {
        this.setState({input: this.state.input});
        this.setState({input2: this.state.input2});
      }
      else {
        // Se já teve uma operação, ou input vazio
        if (this.state.calculado === 'true' || this.state.input === "") {
          val = "0."
          this.setState({input: val});
          this.setState({input2: val});
          this.setState({calculado: 'false'});
          // Marca que já tem ponto
          this.setState({decimal: 'true'});
        }
        else {
            this.setState({input: this.state.input + val});
            this.setState({input2: this.state.input2 + val});
            // Marca que já tem ponto
            this.setState({decimal: 'true'});
        }
      }
    }
    // Se é um número
    if (!isNaN(val)) {
      // Se já teve uma operação
      if (this.state.calculado === 'true' || this.state.input === "") {
        this.setState({input: val});
        this.setState({input2: val});
        this.setState({calculado: 'false'});
      }
      else {
        // Se  deve digitar os números juntos
        if (this.state.digitar_junto === 'true') {
          this.setState({input: this.state.input + val});
          this.setState({input2: this.state.input2 + val});
          this.setState({calculado: 'false'});
        }
        else {
          this.setState({input: val});
          this.setState({input2: this.state.input2 + val});
          this.setState({digitar_junto: 'true'});
          this.setState({calculado: 'false'});
        }
      }
    }
    // Se for operador, escreve na memória
    if (val === " X " || val === " + " || val === " - " || val === " ÷ ") {
      if (val === " X ") {
        val = " * ";
        this.setState({input2: this.state.input2 + val});

        // Indica que foi inserido um operador
        this.setState({operador: 'true'});
        // Remove a restrição do ponto
        this.setState({decimal: 'false'});
        // Marca que se deve digitar um número novo após um operador
        this.setState({digitar_junto: 'false'});
        this.setState({calculado: 'false'});
      }
      if (val === " ÷ ") {
        val = " / "
        this.setState({input2: this.state.input2 + val});

        // Indica que foi inserido um operador
        this.setState({operador: 'true'});
        // Remove a restrição do ponto
        this.setState({decimal: 'false'});
        // Marca que se deve digitar um número novo após um operador
        this.setState({digitar_junto: 'false'});
        this.setState({calculado: 'false'});
      }
      else {
        this.setState({input2: this.state.input2 + val});

        // Indica que foi inserido um operador
        this.setState({operador: 'true'});
        // Remove a restrição do ponto
        this.setState({decimal: 'false'});
        // Marca que se deve digitar um número novo após um operador
        this.setState({digitar_junto: 'false'});
        this.setState({calculado: 'false'});
      }
    }
  }

  calcular = () => {
    this.setState({input: math.evaluate(this.state.input2)});
    this.setState({calculado: 'true'});
    this.setState({decimal: 'false'});
    // Marca que se deve digitar um número novo após uma operação
    this.setState({digitar_junto: 'false'});
  }

  acoesMemoriaGeral = (val, ) => {

  }

  acoesMemoria1 = (val, ) => {

  }

  acoesMemoria2 = (val, ) => {

  }

  acoesMemoria3 = (val, ) => {

  }

  acoesMemoria4 = (val, ) => {

  }

  render() {
    return (
      <div className="App">
        <div className="box-calc">
          <Input input={this.state.input2}></Input>
          <Input input={this.state.input}></Input>
          <div id="operacoes" className="linha">
            <Botao handleClick={this.acoesMemoriaGeral}> MC </Botao>
            <Botao handleClick={this.acoesMemoriaGeral}> MR </Botao>
            <Botao handleClick={this.acoesMemoriaGeral}> M+ </Botao>
            <Botao handleClick={this.acoesMemoriaGeral}> MS </Botao>
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
              <BotaoAC handleClear={() => this.setState({input: "", input2: "", calculado: 'false', decimal: 'false', operador: 'false'})}>AC</BotaoAC>
            </div>
            <div id="igual" className="coluna">
              <Botao handleClick={this.calcular}>=</Botao>
            </div>
          </div>
        </div>
        <div className="box-memoria">
          <h1>Memória</h1>
          <div className="linha">
            <Input memoria1={this.state.memoria1} id="input-memoria"></Input>
            <Botao handleClick={this.acoesMemoria1}> MC </Botao>
            <Botao handleClick={this.acoesMemoria1}> MR </Botao>
          </div>
          <div className="linha">
            <Input memoria1={this.state.memoria2} id="input-memoria"></Input>
            <Botao handleClick={this.acoesMemoria2}> MC </Botao>
            <Botao handleClick={this.acoesMemoria2}> MR </Botao>
          </div>
          <div className="linha">
            <Input memoria1={this.state.memoria2} id="input-memoria"></Input>
            <Botao handleClick={this.acoesMemoria3}> MC </Botao>
            <Botao handleClick={this.acoesMemoria3}> MR </Botao>
          </div>
          <div className="linha">
            <Input memoria1={this.state.memoria4} id="input-memoria"></Input>
            <Botao handleClick={this.acoesMemoria4}> MC </Botao>
            <Botao handleClick={this.acoesMemoria4}> MR </Botao>
          </div>
        </div>
      </div>
    );
  }
}
  
export default App;
