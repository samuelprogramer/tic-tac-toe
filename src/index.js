import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Dia 25/12/2022
//https://pt-br.reactjs.org/tutorial/tutorial.html#adding-time-travel

function Square(props){
    return(
        <button className="square" onClick={()=>{
            props.onClick()
        }}>
          {props.value}
        </button>
    );
}

function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  
class Board extends React.Component {

    
    
    renderSquare(i) {
        return <Square value={this.props.squares[i]}  onClick={() => this.props.onClick(i)}/>;
    }

    render() {
        return (
            <div>
                
                <div className="board-row">
                {this.renderSquare(0)}
                {this.renderSquare(1)}
                {this.renderSquare(2)}
                </div>
                <div className="board-row">
                {this.renderSquare(3)}
                {this.renderSquare(4)}
                {this.renderSquare(5)}
                </div>
                <div className="board-row">
                {this.renderSquare(6)}
                {this.renderSquare(7)}
                {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {

    handleClick(i) { 
        const history = this.state.history.slice(0, this.state.stepNumber + 1);   
        
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
        return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }
    jumpTo(step) {
        this.setState({
          stepNumber: step,
          xIsNext: (step % 2) === 0,
        });
      }

    constructor(props) {
        super(props);
        this.state = {
          history: [{
            squares: Array(9).fill(null),
          }],
          stepNumber: 0,
          xIsNext: true,
          empate: false
        };
      }
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
              'Movimento #' + move :
              'Ir para o inicio do jogo';
            return (
              <li key={move}>
                <button onClick={() => this.jumpTo(move)}>{desc}</button>
              </li>
            );
          });

          
        let status;
        if (winner) {
            status = 'Ganhou: ' + winner;
        } else {
            status = 'Proximo a jogar: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        if(this.state.history.length===10&&!this.state.empate){
            
            this.state.empate = true;
            status = 'EMPATE';
        }else{
            this.state.empate = false;
        }
        return (
            <div>
                <h1>tic tac toe</h1>
                <div className="game">
                
                <div className="game-board">
                  <Board
                    squares={current.squares}
                    onClick={(i) => this.handleClick(i)}
                  />
                </div>
                <div className="game-info">
                  <div>{status}</div>
                  <ol>{moves}</ol>
                </div>
              </div>
            </div>
            
          );
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
  