/* eslint-disable no-param-reassign */
import React, {useEffect, useState} from 'react';
import './App.css';
import {v4 as uuid} from 'uuid';
import _ from 'lodash';

type CellFill = 'red' | 'white' | 'blue';

type Cell = {
  pos: number;
  fill: CellFill;
};

type FigureInfo = {
  rotated: '0' | '90' | '180' | '270';
  name: 'O' | 'J' | 'L' | 'T' | 'I' | 'S' | 'Z';
  pos: number;
  fill: CellFill;
};

const ROW = 10;

const initialGrid: string[] = [];

const drawInitialGrid = () => {
  for (let i = 0; i < 200; i++) {
    initialGrid.push('white');
  }
};

drawInitialGrid();

const nonMovingCells = [
  {pos: 200, fill: 'blue'},
  {pos: 201, fill: 'blue'},
  {pos: 202, fill: 'blue'},
  {pos: 203, fill: 'blue'},
  {pos: 204, fill: 'blue'},
  {pos: 205, fill: 'blue'},
  {pos: 206, fill: 'blue'},
  {pos: 207, fill: 'blue'},
  {pos: 208, fill: 'blue'},
  {pos: 209, fill: 'blue'},
];

const updateGrid = (cellsToChange: (Cell | FigureInfo)[]): string[] => {
  const updatedGrid = [...initialGrid];
  const filledGrid = [...nonMovingCells, ...cellsToChange.slice(0, 4)];
  filledGrid.forEach((cell) => {
    updatedGrid[cell.pos] = cell.fill;
  });
  return updatedGrid;
};

const O_FIGURE: (Cell | FigureInfo)[] = [
  {pos: 4, fill: 'red'},
  {pos: 5, fill: 'red'},
  {pos: 14, fill: 'red'},
  {pos: 15, fill: 'red'},
  {rotated: '0', name: 'O', pos: 500, fill: 'white'},
];

const I_FIGURE: (Cell | FigureInfo)[] = [
  {pos: 4, fill: 'red'},
  {pos: 14, fill: 'red'},
  {pos: 24, fill: 'red'},
  {pos: 34, fill: 'red'},
  {rotated: '0', name: 'I', pos: 500, fill: 'white'},
];

const J_FIGURE: (Cell | FigureInfo)[] = [
  {pos: 4, fill: 'red'},
  {pos: 14, fill: 'red'},
  {pos: 23, fill: 'red'},
  {pos: 24, fill: 'red'},
  {rotated: '0', name: 'J', pos: 500, fill: 'white'},
];

const L_FIGURE: (Cell | FigureInfo)[] = [
  {pos: 4, fill: 'red'},
  {pos: 14, fill: 'red'},
  {pos: 24, fill: 'red'},
  {pos: 25, fill: 'red'},
  {rotated: '0', name: 'L', pos: 500, fill: 'white'},
];

const Z_FIGURE: (Cell | FigureInfo)[] = [
  {pos: 4, fill: 'red'},
  {pos: 14, fill: 'red'},
  {pos: 15, fill: 'red'},
  {pos: 25, fill: 'red'},
  {rotated: '0', name: 'Z', pos: 500, fill: 'white'},
];

const S_FIGURE: (Cell | FigureInfo)[] = [
  {pos: 5, fill: 'red'},
  {pos: 14, fill: 'red'},
  {pos: 15, fill: 'red'},
  {pos: 24, fill: 'red'},
  {rotated: '0', name: 'S', pos: 500, fill: 'white'},
];

const T_FIGURE: (Cell | FigureInfo)[] = [
  {pos: 4, fill: 'red'},
  {pos: 14, fill: 'red'},
  {pos: 15, fill: 'red'},
  {pos: 24, fill: 'red'},
  {rotated: '0', name: 'T', pos: 500, fill: 'white'},
];

const ALL_FIGURES = [O_FIGURE, I_FIGURE, J_FIGURE, S_FIGURE, Z_FIGURE, T_FIGURE, L_FIGURE];

let activeFigure = [...ALL_FIGURES[_.random(6)]];

const App = () => {
  const [grid, setGrid] = useState(initialGrid);

  useEffect(() => {
    newFigure();
  }, []);

  const newFigure = () => {
    activeFigure = [];
    const newActiveFigureCells = [...ALL_FIGURES[_.random(6)]];
    newActiveFigureCells.forEach((cell) => {
      activeFigure.push({...cell});
    });
    setGrid(updateGrid(activeFigure));
  };

  const moveDown = (figure: Cell[]) => {
    if (figureMustStop(figure)) {
      const additionalNonMovingCells = [...figure];
      
      additionalNonMovingCells.forEach((cell) => {
        cell.fill = 'blue';
        nonMovingCells.push({...cell});
      });
      figure.splice(0, 4);
    } else {
      figure.forEach((cell) => {
        // eslint-disable-next-line no-param-reassign
        cell.pos += ROW;
      });
    }
    setGrid(updateGrid(figure));
  };

  const moveLeft = (figure: Cell[]) => {
    figure.forEach((cell) => {
      // eslint-disable-next-line no-param-reassign
      cell.pos -= 1;
    });
    setGrid(updateGrid(figure));
  };

  const moveRight = (figure: Cell[]) => {
    figure.forEach((cell) => {
      // eslint-disable-next-line no-param-reassign
      cell.pos += 1;
    });
    setGrid(updateGrid(figure));
  };

  const figureMustStop = (figure: Cell[]) => {
    let answer = false;
    figure.forEach((cell) => {
      if (!answer) {
        answer = nonMovingCells.some((staticCell) => {
          return staticCell.pos === cell.pos + ROW;
        });
      }
    });
    return answer;
  };

  // pirms rotācijas vajag pārbaudīt, vai pēc rotācijas nesakritīs figūras šūnas ar kādu no šūnām, kas nonMovingCells
  const rotate = (figure: (Cell | FigureInfo)[]) => {
    // @ts-ignore
    const {name} = figure[4];
    // @ts-ignore
    const {rotated} = figure[4];
    switch (name) {
      case 'I':
        if (rotated === '0') {
          figure[0].pos += 19;
          figure[1].pos += 10;
          figure[2].pos += 1;
          figure[3].pos -= 8;
          // @ts-ignore
          figure[4].rotated = '90';
        } else if (rotated === '90') {
          figure[0].pos -= 19;
          figure[1].pos -= 10;
          figure[2].pos -= 1;
          figure[3].pos += 8;
          // @ts-ignore
          figure[4].rotated = '180';
        } else if (rotated === '180') {
          figure[0].pos += 19;
          figure[1].pos += 10;
          figure[2].pos += 1;
          figure[3].pos -= 8;
          // @ts-ignore
          figure[4].rotated = '270';
        } else {
          figure[0].pos -= 19;
          figure[1].pos -= 10;
          figure[2].pos -= 1;
          figure[3].pos += 8;
          // @ts-ignore
          figure[4].rotated = '0';
        }
        break;
      case 'J':
        if (rotated === '0') {
          figure[0].pos += -2;
          figure[1].pos += -2;
          figure[2].pos += -10;
          figure[3].pos += -10;
          // @ts-ignore
          figure[4].rotated = '90';
        } else if (rotated === '90') {
          figure[0].pos += 1;
          figure[1].pos += -8;
          figure[2].pos += 0;
          figure[3].pos += 9;
          // @ts-ignore
          figure[4].rotated = '180';
        } else if (rotated === '180') {
          figure[0].pos += -1;
          figure[1].pos += -1;
          figure[2].pos += -9;
          figure[3].pos += -9;
          // @ts-ignore
          figure[4].rotated = '270';
        } else {
          figure[0].pos += 2;
          figure[1].pos += 11;
          figure[2].pos += 19;
          figure[3].pos += 10;
          // @ts-ignore
          figure[4].rotated = '0';
        }
        break;
      case 'L':
        if (rotated === '0') {
          figure[0].pos += -1;
          figure[1].pos += -10;
          figure[2].pos += -19;
          figure[3].pos += -12;
          // @ts-ignore
          figure[4].rotated = '90';
        } else if (rotated === '90') {
          figure[0].pos += 1;
          figure[1].pos += 1;
          figure[2].pos += 10;
          figure[3].pos += 12;
          // @ts-ignore
          figure[4].rotated = '180';
        } else if (rotated === '180') {
          figure[0].pos += 1;
          figure[1].pos += 8;
          figure[2].pos += -1;
          figure[3].pos += -10;
          // @ts-ignore
          figure[4].rotated = '270';
        } else {
          figure[0].pos += -1;
          figure[1].pos += 1;
          figure[2].pos += 10;
          figure[3].pos += 10;
          // @ts-ignore
          figure[4].rotated = '0';
        }
        break;
      case 'Z':
        console.log('Z');
        if (rotated === '0') {
          figure[0].pos += 0;
          figure[1].pos += -9;
          figure[2].pos += -2;
          figure[3].pos += -11;
          // @ts-ignore
          figure[4].rotated = '90';
        } else if (rotated === '90') {
          figure[0].pos += 0;
          figure[1].pos += 9;
          figure[2].pos += 2;
          figure[3].pos += 11;
          // @ts-ignore
          figure[4].rotated = '180';
        } else if (rotated === '180') {
          figure[0].pos += 0;
          figure[1].pos += -9;
          figure[2].pos += -2;
          figure[3].pos += -11;
          // @ts-ignore
          figure[4].rotated = '270';
        } else {
          figure[0].pos += 0;
          figure[1].pos += 9;
          figure[2].pos += 2;
          figure[3].pos += 11;
          // @ts-ignore
          figure[4].rotated = '0';
        }
        break;
      case 'S':
        console.log('S');
        if (rotated === '0') {
          figure[0].pos += -1;
          figure[1].pos += -9;
          figure[2].pos += 0;
          figure[3].pos += -8;
          // @ts-ignore
          figure[4].rotated = '90';
        } else if (rotated === '90') {
          figure[0].pos += 1;
          figure[1].pos += 9;
          figure[2].pos += 0;
          figure[3].pos += 8;
          // @ts-ignore
          figure[4].rotated = '180';
        } else if (rotated === '180') {
          figure[0].pos += -1;
          figure[1].pos += -9;
          figure[2].pos += 0;
          figure[3].pos += -8;
          // @ts-ignore
          figure[4].rotated = '270';
        } else {
          figure[0].pos += 1;
          figure[1].pos += 9;
          figure[2].pos += 0;
          figure[3].pos += 8;
          // @ts-ignore
          figure[4].rotated = '0';
        }
        break;
      case 'T':
        if (rotated === '0') {
          figure[0].pos += -1;
          figure[1].pos += -10;
          figure[2].pos += -10;
          figure[3].pos += -10;
          // @ts-ignore
          figure[4].rotated = '90';
        } else if (rotated === '90') {
          figure[0].pos += 1;
          figure[1].pos += 9;
          figure[2].pos += 9;
          figure[3].pos += 10;
          // @ts-ignore
          figure[4].rotated = '180';
        } else if (rotated === '180') {
          figure[0].pos += 0;
          figure[1].pos += 0;
          figure[2].pos += 0;
          figure[3].pos += -9;
          // @ts-ignore
          figure[4].rotated = '270';
        } else {
          figure[0].pos += 0;
          figure[1].pos += 1;
          figure[2].pos += 1;
          figure[3].pos += 9;
          // @ts-ignore
          figure[4].rotated = '0';
        }
        break;
      default:
        console.log('defaults');
    }
    setGrid(updateGrid(figure));
  };

  return (
    <div className="field">
      <h1>tetris</h1>
      <button type="button" onClick={() => moveDown(activeFigure)}>
        MOVE DOWN
      </button>
      <button type="button" onClick={() => moveLeft(activeFigure)}>
        MOVE Left
      </button>
      <button type="button" onClick={() => moveRight(activeFigure)}>
        MOVE Right
      </button>
      <button disabled={!activeFigure} type="button" onClick={() => rotate(activeFigure)}>
        Rotate
      </button>
      <button type="button" onClick={() => newFigure()}>
        New Figure
      </button>
      <div className="row">
        <div className="col-xs-12 griden">
          {grid.map((cell, index) => {
            return (
              index < 200 && <div key={uuid()} className="cell" style={{backgroundColor: cell}} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
