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
  for (let i = 0; i < 240; i++) {
    initialGrid.push('white');
  }
};

let deletedRowsCount = 0;

drawInitialGrid();

const nonMovingCells: Cell[] = [];

const NON_MOVING_CELLS_DEFAULT: Cell[] = [
  {pos: 240, fill: 'blue'},
  {pos: 241, fill: 'blue'},
  {pos: 242, fill: 'blue'},
  {pos: 243, fill: 'blue'},
  {pos: 244, fill: 'blue'},
  {pos: 245, fill: 'blue'},
  {pos: 246, fill: 'blue'},
  {pos: 247, fill: 'blue'},
  {pos: 248, fill: 'blue'},
  {pos: 249, fill: 'blue'},
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

let activeFigure: (Cell | FigureInfo)[] = [];

type Stage = 'before' | 'game' | 'end';

let keyNow = '';
let gameStageCopy: Stage;
let gridCopy: string[];

let activeTimeOut: NodeJS.Timeout;

let helper1 = 0;

let delay = 1000;

const App = () => {
  const [grid, setGrid] = useState(initialGrid);
  const [gameStage, setGameStage] = useState<Stage>('before');
  const [helper2, setHelper2] = useState(false);

  gameStageCopy = gameStage;
  gridCopy = grid;

  useEffect(() => {
    document.body.addEventListener('keydown', (event) => {
      keyNow = event.key;
      if (gameStageCopy === 'game') {
        if (keyNow === 'ArrowLeft') moveLeft(activeFigure);
        if (keyNow === 'ArrowDown') moveDown(activeFigure);
        if (keyNow === 'ArrowUp') rotate(activeFigure);
        if (keyNow === 'ArrowRight') moveRight(activeFigure);
      }
    });
    return () => {
      document.body.removeEventListener('keydown', (event) => {
        keyNow = event.key;
      });
    };
  }, []);

  useEffect(() => {
    // Nodrošina, ka šis useEffect NEnostrādās uz MOUNT
    if (helper1 < 1) {
      helper1 = 1;
      return;
    }
    activeTimeOut = setTimeout(() => {
      moveDown(activeFigure);
      setHelper2(!helper2);
    }, delay);
  }, [helper2]);

  const newFigure = () => {
    activeFigure = [];
    const newActiveFigureCells = [...ALL_FIGURES[_.random(6)]];
    newActiveFigureCells.forEach((cell) => {
      activeFigure.push({...cell});
    });
    setGrid(updateGrid(activeFigure));
  };

  const isGameOver = (figure1: Cell[]) => {
    let answer = false;
    nonMovingCells.forEach((cell) => {
      if (cell.pos < 40) answer = true;
    });
    return answer;
    // figure1.forEach(cell => {
    //   nonMovingCells.forEach(cell1 => {
    //     if (cell1.pos === cell.pos) answer = true;
    //   });
    // });
    // return answer;
  };

  const moveDown = (figure: Cell[]) => {
    if (figureMustStop(figure)) {
      const additionalNonMovingCells = [...figure.slice(0, 4)];
      additionalNonMovingCells.forEach((cell) => {
        cell.fill = 'blue';
        nonMovingCells.push({...cell});
      });
      figure.splice(0, 6);
      deleteFullrows();
      newFigure();
      if (isGameOver(activeFigure)) {
        clearTimeout(activeTimeOut);
        setGameStage('end');
      }
    } else {
      figure.forEach((cell) => {
        // eslint-disable-next-line no-param-reassign
        cell.pos += ROW;
      });
    }
    setGrid(updateGrid(figure));
  };

  const moveLeft = (figure: Cell[]) => {
    if (
      !figure.some((cell) => {
        if (cell.pos < 240) {
          return cell.pos % 10 === 0;
        }
        return false;
      }) &&
      isLeftSideFree(figure)
    ) {
      figure.forEach((cell) => {
        // eslint-disable-next-line no-param-reassign
        cell.pos -= 1;
      });
      setGrid(updateGrid(figure));
    }
  };

  const isLeftSideFree = (figure1: Cell[]) => {
    let answer = true;
    figure1.forEach((cell) => {
      if (gridCopy[cell.pos - 1] === 'blue') answer = false;
    });
    return answer;
  };

  const isRightSideFree = (figure1: Cell[]) => {
    let answer = true;
    figure1.forEach((cell) => {
      if (gridCopy[cell.pos + 1] === 'blue') answer = false;
    });
    return answer;
  };

  const moveRight = (figure: Cell[]) => {
    if (
      !figure.some((cell) => {
        if (cell.pos < 240) {
          return cell.pos % 10 === 9;
        }
        return false;
      }) &&
      isRightSideFree(figure)
    ) {
      figure.forEach((cell) => {
        // eslint-disable-next-line no-param-reassign
        cell.pos += 1;
      });
      setGrid(updateGrid(figure));
    }
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

  const checkIfRotationPossible = (a: number, b: number, c: number, d: number) => {
    let answer = true;
    nonMovingCells.some((cell) => {
      if (cell.pos === a || cell.pos === b || cell.pos === c || cell.pos === d) {
        answer = false;
        return true;
      }
      return false;
    });
    return answer;
  };

  const rotate = (figure: (Cell | FigureInfo)[]) => {
    if (figure.length === 0) return;
    // @ts-ignore
    const {name} = figure[4];
    // @ts-ignore
    const {rotated} = figure[4];
    switch (name) {
      case 'I':
        if (rotated === '0') {
          let a = 0;
          if (figure[0].pos % 10 === 9) a = -2;
          if (figure[0].pos % 10 === 8) a = -1;
          if (figure[0].pos % 10 === 0) a = 1;
          if (
            !checkIfRotationPossible(
              figure[0].pos + 19 + a,
              figure[1].pos + 10 + a,
              figure[2].pos + 1 + a,
              figure[3].pos - 8 + a
            )
          )
            return;
          figure[0].pos += 19 + a;
          figure[1].pos += 10 + a;
          figure[2].pos += 1 + a;
          figure[3].pos += -8 + a;
          // @ts-ignore
          figure[4].rotated = '90';
        } else if (rotated === '90') {
          if (
            !checkIfRotationPossible(
              figure[0].pos - 19,
              figure[1].pos - 10,
              figure[2].pos - 1,
              figure[3].pos + 8
            )
          )
            return;
          figure[0].pos -= 19;
          figure[1].pos -= 10;
          figure[2].pos -= 1;
          figure[3].pos += 8;
          // @ts-ignore
          figure[4].rotated = '180';
        } else if (rotated === '180') {
          let a = 0;
          if (figure[0].pos % 10 === 9) a = -2;
          if (figure[0].pos % 10 === 8) a = -1;
          if (figure[0].pos % 10 === 0) a = 1;
          if (
            !checkIfRotationPossible(
              figure[0].pos + 19 + a,
              figure[1].pos + 10 + a,
              figure[2].pos + 1 + a,
              figure[3].pos - 8 + a
            )
          )
            return;
          figure[0].pos += 19 + a;
          figure[1].pos += 10 + a;
          figure[2].pos += 1 + a;
          figure[3].pos += -8 + a;
          // @ts-ignore
          figure[4].rotated = '270';
        } else {
          if (
            !checkIfRotationPossible(
              figure[0].pos - 19,
              figure[1].pos - 10,
              figure[2].pos - 1,
              figure[3].pos + 8
            )
          )
            return;
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
          let a = 0;
          if (figure[0].pos % 10 === 1) a = 1;
          if (
            !checkIfRotationPossible(
              figure[0].pos - 2 + a,
              figure[1].pos - 2 + a,
              figure[2].pos - 10 + a,
              figure[3].pos - 10 + a
            )
          )
            return;
          figure[0].pos += -2 + a;
          figure[1].pos += -2 + a;
          figure[2].pos += -10 + a;
          figure[3].pos += -10 + a;
          // @ts-ignore
          figure[4].rotated = '90';
        } else if (rotated === '90') {
          if (
            !checkIfRotationPossible(
              figure[0].pos + 1,
              figure[1].pos - 8,
              figure[2].pos,
              figure[3].pos + 9
            )
          )
            return;
          figure[0].pos += 1;
          figure[1].pos += -8;
          figure[2].pos += 0;
          figure[3].pos += 9;
          // @ts-ignore
          figure[4].rotated = '180';
        } else if (rotated === '180') {
          let a = 0;
          if (figure[0].pos % 10 === 0) a = 1;
          if (
            !checkIfRotationPossible(
              figure[0].pos - 1 + a,
              figure[1].pos - 1 + a,
              figure[2].pos - 9 + a,
              figure[3].pos - 9 + a
            )
          )
            return;
          figure[0].pos += -1 + a;
          figure[1].pos += -1 + a;
          figure[2].pos += -9 + a;
          figure[3].pos += -9 + a;
          // @ts-ignore
          figure[4].rotated = '270';
        } else {
          if (
            !checkIfRotationPossible(
              figure[0].pos + 2,
              figure[1].pos + 11,
              figure[2].pos + 19,
              figure[3].pos + 10
            )
          )
            return;
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
          let a = 0;
          if (figure[0].pos % 10 === 0) a = 1;
          if (
            !checkIfRotationPossible(
              figure[0].pos - 1 + a,
              figure[1].pos - 10 + a,
              figure[2].pos - 19 + a,
              figure[3].pos - 12 + a
            )
          )
            return;
          figure[0].pos += -1 + a;
          figure[1].pos += -10 + a;
          figure[2].pos += -19 + a;
          figure[3].pos += -12 + a;
          // @ts-ignore
          figure[4].rotated = '90';
        } else if (rotated === '90') {
          if (
            !checkIfRotationPossible(
              figure[0].pos + 1,
              figure[1].pos + 1,
              figure[2].pos + 10,
              figure[3].pos + 12
            )
          )
            return;
          figure[0].pos += 1;
          figure[1].pos += 1;
          figure[2].pos += 10;
          figure[3].pos += 12;
          // @ts-ignore
          figure[4].rotated = '180';
        } else if (rotated === '180') {
          let a = 0;
          if (figure[0].pos % 10 === 0) a = 1;
          if (
            !checkIfRotationPossible(
              figure[0].pos + 1 + a,
              figure[1].pos + 8 + a,
              figure[2].pos - 1 + a,
              figure[3].pos - 10 + a
            )
          )
            return;
          figure[0].pos += 1 + a;
          figure[1].pos += 8 + a;
          figure[2].pos += -1 + a;
          figure[3].pos += -10 + a;
          // @ts-ignore
          figure[4].rotated = '270';
        } else {
          if (
            !checkIfRotationPossible(
              figure[0].pos - 1,
              figure[1].pos + 1,
              figure[2].pos + 10,
              figure[3].pos + 10
            )
          )
            return;
          figure[0].pos += -1;
          figure[1].pos += 1;
          figure[2].pos += 10;
          figure[3].pos += 10;
          // @ts-ignore
          figure[4].rotated = '0';
        }
        break;
      case 'Z':
        if (rotated === '0') {
          let a = 0;
          if (figure[0].pos % 10 === 0) a = 1;
          if (
            !checkIfRotationPossible(
              figure[0].pos + a,
              figure[1].pos - 9 + a,
              figure[2].pos - 2 + a,
              figure[3].pos - 11 + a
            )
          )
            return;
          figure[0].pos += +a;
          figure[1].pos += -9 + a;
          figure[2].pos += -2 + a;
          figure[3].pos += -11 + a;
          // @ts-ignore
          figure[4].rotated = '90';
        } else if (rotated === '90') {
          if (
            !checkIfRotationPossible(
              figure[0].pos,
              figure[1].pos + 9,
              figure[2].pos + 2,
              figure[3].pos + 11
            )
          )
            return;
          figure[0].pos += 0;
          figure[1].pos += 9;
          figure[2].pos += 2;
          figure[3].pos += 11;
          // @ts-ignore
          figure[4].rotated = '180';
        } else if (rotated === '180') {
          let a = 0;
          if (figure[0].pos % 10 === 0) a = 1;
          if (
            !checkIfRotationPossible(
              figure[0].pos + a,
              figure[1].pos - 9 + a,
              figure[2].pos - 2 + a,
              figure[3].pos - 11 + a
            )
          )
            return;
          figure[0].pos += +a;
          figure[1].pos += -9 + a;
          figure[2].pos += -2 + a;
          figure[3].pos += -11 + a;
          // @ts-ignore
          figure[4].rotated = '270';
        } else {
          if (
            !checkIfRotationPossible(
              figure[0].pos,
              figure[1].pos + 9,
              figure[2].pos + 2,
              figure[3].pos + 11
            )
          )
            return;
          figure[0].pos += 0;
          figure[1].pos += 9;
          figure[2].pos += 2;
          figure[3].pos += 11;
          // @ts-ignore
          figure[4].rotated = '0';
        }
        break;
      case 'S':
        if (rotated === '0') {
          let a = 0;
          if (figure[0].pos % 10 === 9) a = -1;
          if (
            !checkIfRotationPossible(
              figure[0].pos - 1 + a,
              figure[1].pos - 9 + a,
              figure[2].pos + a,
              figure[3].pos - 8 + a
            )
          )
            return;
          figure[0].pos += -1 + a;
          figure[1].pos += -9 + a;
          figure[2].pos += a;
          figure[3].pos += -8 + a;
          // @ts-ignore
          figure[4].rotated = '90';
        } else if (rotated === '90') {
          if (
            !checkIfRotationPossible(
              figure[0].pos + 1,
              figure[1].pos + 9,
              figure[2].pos,
              figure[3].pos + 8
            )
          )
            return;
          figure[0].pos += 1;
          figure[1].pos += 9;
          figure[2].pos += 0;
          figure[3].pos += 8;
          // @ts-ignore
          figure[4].rotated = '180';
        } else if (rotated === '180') {
          let a = 0;
          if (figure[0].pos % 10 === 9) a = -1;
          if (
            !checkIfRotationPossible(
              figure[0].pos - 1 + a,
              figure[1].pos - 9 + a,
              figure[2].pos + a,
              figure[3].pos - 8 + a
            )
          )
            return;
          figure[0].pos += -1 + a;
          figure[1].pos += -9 + a;
          figure[2].pos += a;
          figure[3].pos += -8 + a;
          // @ts-ignore
          figure[4].rotated = '270';
        } else {
          if (
            !checkIfRotationPossible(
              figure[0].pos + 1,
              figure[1].pos + 9,
              figure[2].pos,
              figure[3].pos + 8
            )
          )
            return;
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
          let a = 0;
          if (figure[0].pos % 10 === 0) a = 1;
          if (
            !checkIfRotationPossible(
              figure[0].pos - 1 + a,
              figure[1].pos - 10 + a,
              figure[2].pos - 10 + a,
              figure[3].pos - 10 + a
            )
          )
            return;
          figure[0].pos += -1 + a;
          figure[1].pos += -10 + a;
          figure[2].pos += -10 + a;
          figure[3].pos += -10 + a;
          // @ts-ignore
          figure[4].rotated = '90';
        } else if (rotated === '90') {
          if (
            !checkIfRotationPossible(
              figure[0].pos + 1,
              figure[1].pos + 9,
              figure[2].pos + 9,
              figure[3].pos + 10
            )
          )
            return;
          figure[0].pos += 1;
          figure[1].pos += 9;
          figure[2].pos += 9;
          figure[3].pos += 10;
          // @ts-ignore
          figure[4].rotated = '180';
        } else if (rotated === '180') {
          let a = 0;
          if (figure[0].pos % 10 === 9) a = -1;
          if (
            !checkIfRotationPossible(
              figure[0].pos + a,
              figure[1].pos + a,
              figure[2].pos + a,
              figure[3].pos - 9 + a
            )
          )
            return;
          figure[0].pos += a;
          figure[1].pos += a;
          figure[2].pos += a;
          figure[3].pos += -9 + a;
          // @ts-ignore
          figure[4].rotated = '270';
        } else {
          if (
            !checkIfRotationPossible(
              figure[0].pos,
              figure[1].pos + 1,
              figure[2].pos + 1,
              figure[3].pos + 9
            )
          )
            return;
          figure[0].pos += 0;
          figure[1].pos += 1;
          figure[2].pos += 1;
          figure[3].pos += 9;
          // @ts-ignore
          figure[4].rotated = '0';
        }
        break;
      default:
    }
    setGrid(updateGrid(figure));
  };

  const deleteFullrows = () => {
    nonMovingCells.sort((prev, next) => (prev.pos > next.pos ? 1 : -1));
    const rowsToDelete: number[] = [];
    nonMovingCells.forEach((cell, index) => {
      if (cell.pos % 10 === 0) {
        let helper = 1;
        while (cell.pos === nonMovingCells[index + helper].pos - helper) {
          helper += 1;
          if (helper === 10) {
            rowsToDelete.push(cell.pos / 10);
            break;
          }
        }
      }
    });
    const copyOfNonMovingCells = [...nonMovingCells];
    rowsToDelete.forEach((row) => {
      if (row < 24) {
        copyOfNonMovingCells.forEach((cell) => {
          if (Math.floor(cell.pos / 10) === row) {
            nonMovingCells.splice(nonMovingCells.indexOf(cell), 1);
          }
        });
        nonMovingCells.forEach((cell) => {
          if (Math.floor(cell.pos / 10) < row) cell.pos += ROW;
        });
        deletedRowsCount += 1;
        if (deletedRowsCount%5 === 0) delay *= 0.8;
      }
    });
  };

  const startGame = () => {
    setGrid(initialGrid);
    setHelper2(!helper2);
    nonMovingCells.length = 0;
    nonMovingCells.push(...NON_MOVING_CELLS_DEFAULT);
    deletedRowsCount = 0;
    newFigure();
    setGameStage('game');
  };

  const endGame = () => {
    setGrid(initialGrid);
    nonMovingCells.length = 0;
    nonMovingCells.push(...NON_MOVING_CELLS_DEFAULT);
    clearTimeout(activeTimeOut);
    setGameStage('end');
  };

  return (
    <div className="field">
      <div className="row center-xs wrapper">
        <h1> TETRIS. Score: {deletedRowsCount.toFixed(0)}</h1>
        <h2>{gameStage === 'game' && 'PLAY'}</h2>
        <h2>{gameStage === 'end' && 'GAME OVER! Press Start to play'}</h2>
        <h2>{gameStage === 'before' && 'Press Start to play'}</h2>
        <h4>Use Arrows on keyboard</h4>
        <div>
          <button type="button" onClick={startGame}>
            START
          </button>
          <button type="button" onClick={endGame}>
            END
          </button>
        </div>
        <div className="col-xs-12 griden">
          {grid.map((cell, index) => {
            return (
              index < 240 &&
              index > 39 && <div key={uuid()} className="cell" style={{backgroundColor: cell}} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
