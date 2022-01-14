import nodeStyles from "../../styles/Node.module.css";

const MAZE_PATH_SIZE = 4;

function recursiveDivisionMaze(
  grid,
  rowStart,
  rowEnd,
  colStart,
  colEnd,
  orientation = "vertical",
  surroundingWalls,
  type
) {
  if (rowEnd < rowStart || colEnd < colStart) {
    return;
  }
  if (!surroundingWalls) {
    grid.forEach((row) => {
      row.forEach((cell, idx) => {
        const { row: r, col: c } = cell;
        if (
          r === 0 ||
          c === 0 ||
          r === grid.length - 1 ||
          c === row.length - 1
        ) {
          setTimeout(() => {
            let currentHTMLNode = document.getElementById(`node-${r}-${c}`);
            currentHTMLNode.className = `${nodeStyles.node} ${nodeStyles.nodeWall}`;
            cell.isWall = true;
          }, 45 * idx);
        }
      });
    });
    surroundingWalls = true;
  }
  if (orientation === "horizontal") {
    let possibleRows = [];
    for (let number = rowStart; number <= rowEnd; number += MAZE_PATH_SIZE) {
      possibleRows.push(number);
    }
    let possibleCols = [];
    for (
      let number = colStart - 1;
      number <= colEnd + 1;
      number += MAZE_PATH_SIZE
    ) {
      possibleCols.push(number);
    }
    let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    let randomColIndex = Math.floor(Math.random() * possibleCols.length);
    let currentRow = possibleRows[randomRowIndex];
    let colRandom = possibleCols[randomColIndex];
    grid.forEach((row) => {
      row.forEach((cell, idx) => {
        const { row: r, col: c } = cell;

        if (
          r === currentRow &&
          c !== colRandom &&
          c >= colStart - 1 &&
          c <= colEnd + 1
        ) {
          if (!cell.isStart && !cell.isFinish) {
            setTimeout(() => {
              let currentHTMLNode = document.getElementById(`node-${r}-${c}`);
              currentHTMLNode.className = `${nodeStyles.node} ${nodeStyles.nodeWall}`;
              cell.isWall = true;
            }, rowEnd * idx * 3);
          }
        }
      });
    });
    if (currentRow - 2 - rowStart > colEnd - colStart) {
      recursiveDivisionMaze(
        grid,
        rowStart,
        currentRow - 2,
        colStart,
        colEnd,
        orientation,
        surroundingWalls,
        type
      );
    } else {
      recursiveDivisionMaze(
        grid,
        rowStart,
        currentRow - 2,
        colStart,
        colEnd,
        "vertical",
        surroundingWalls,
        type
      );
    }
    if (rowEnd - (currentRow + 2) > colEnd - colStart) {
      recursiveDivisionMaze(
        grid,
        currentRow + 2,
        rowEnd,
        colStart,
        colEnd,
        orientation,
        surroundingWalls,
        type
      );
    } else {
      recursiveDivisionMaze(
        grid,
        currentRow + 2,
        rowEnd,
        colStart,
        colEnd,
        "vertical",
        surroundingWalls,
        type
      );
    }
  } else {
    let possibleCols = [];
    for (let number = colStart; number <= colEnd; number += MAZE_PATH_SIZE) {
      possibleCols.push(number);
    }
    let possibleRows = [];
    for (
      let number = rowStart - 1;
      number <= rowEnd + 1;
      number += MAZE_PATH_SIZE
    ) {
      possibleRows.push(number);
    }
    let randomColIndex = Math.floor(Math.random() * possibleCols.length);
    let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    let currentCol = possibleCols[randomColIndex];
    let rowRandom = possibleRows[randomRowIndex];
    grid.forEach((row, idx) => {
      row.forEach((cell) => {
        const { row: r, col: c } = cell;
        if (
          c === currentCol &&
          r !== rowRandom &&
          r >= rowStart - 1 &&
          r <= rowEnd + 1
        ) {
          setTimeout(() => {
            if (!cell.isStart && !cell.isFinish) {
              let currentHTMLNode = document.getElementById(`node-${r}-${c}`);
              console.log("currentHTMLNode");
              currentHTMLNode.className = `${nodeStyles.node} ${nodeStyles.nodeWall}`;
              cell.isWall = true;
            }
          }, colEnd * idx * 3);
        }
      });
    });

    if (rowEnd - rowStart > currentCol - 2 - colStart) {
      recursiveDivisionMaze(
        grid,
        rowStart,
        rowEnd,
        colStart,
        currentCol - 2,
        "horizontal",
        surroundingWalls,
        type
      );
    } else {
      recursiveDivisionMaze(
        grid,
        rowStart,
        rowEnd,
        colStart,
        currentCol - 2,
        orientation,
        surroundingWalls,
        type
      );
    }
    if (rowEnd - rowStart > colEnd - (currentCol + 2)) {
      recursiveDivisionMaze(
        grid,
        rowStart,
        rowEnd,
        currentCol + 2,
        colEnd,
        "horizontal",
        surroundingWalls,
        type
      );
    } else {
      recursiveDivisionMaze(
        grid,
        rowStart,
        rowEnd,
        currentCol + 2,
        colEnd,
        orientation,
        surroundingWalls,
        type
      );
    }
  }
}

export default recursiveDivisionMaze;
