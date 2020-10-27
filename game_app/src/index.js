import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) { /* function component means it only contains a render method, so you only need to tell it to take the props you want rendered!*/
/* this is a controlled component from the Board now, since the Board is handling how Square works */
        return(
            <button 
                className="square" 
                onClick= {() => props.onClick()} /* extends function for when there is a click on a square */
            >
                {props.value}
            </button>
        );
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }

    handleClick(i) { /* this is where the code handles placing the 'X'. This is different from handling in in each square*/
        const squares = this.state.squares.slice(); /* slice creates a copy to modify instead of modifying the existing array. This creates immutability*/
            if (calculateWinner(squares) || squares[i]) {
                return;
            }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares, 
            xIsNext: !this.state.xIsNext,
        });
    }

    renderSquare(i) { /* this rerenders the square when a click occurs to reflect a click occurred by showing an X */
        return <Square 
            value={this.state.squares[i]} 
            onClick={() => this.handleClick(i)}
        />;
    }

    render () {
        const winner = calculateWinner(this.state.squares);
            let status;
            if (winner) {
                status = 'Winner: ' +winner;
            } else {
                status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
            }

        
        return (
            <div>
                <div className="status">{status}</div>
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
    render() {
        return(
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol> {/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Game/ >,
    document.getElementById('root')
);

function calculateWinner(squares) {
    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a,b,c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) { return squares[a];
        }
    }
    return null;
}