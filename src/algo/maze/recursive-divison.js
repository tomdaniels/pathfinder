import nodeStyles from "../../styles/Node.module.css";

function recursiveDivisionMaze(
  grid,
  rowStart,
  rowEnd,
  colStart,
  colEnd,
  orientation = "",
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
          }, 20 * idx);
        }
      });
    });
    surroundingWalls = true;
  }
  if (orientation === "horizontal") {
    let possibleRows = [];
    for (let number = rowStart; number <= rowEnd; number += 4) {
      possibleRows.push(number);
    }
    let possibleCols = [];
    for (let number = colStart - 1; number <= colEnd + 1; number += 4) {
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
          setTimeout(() => {
            if (!cell.isStart && !cell.isFinish) {
              let currentHTMLNode = document.getElementById(`node-${r}-${c}`);
              currentHTMLNode.className = `${nodeStyles.node} ${nodeStyles.nodeWall}`;
              cell.isWall = true;
            }
          }, 30 * idx);
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
    for (let number = colStart; number <= colEnd; number += 4) {
      possibleCols.push(number);
    }
    let possibleRows = [];
    for (let number = rowStart - 1; number <= rowEnd + 1; number += 4) {
      possibleRows.push(number);
    }
    let randomColIndex = Math.floor(Math.random() * possibleCols.length);
    let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    let currentCol = possibleCols[randomColIndex];
    let rowRandom = possibleRows[randomRowIndex];
    grid.forEach((row) => {
      row.forEach((cell, idx) => {
        const { row: r, col: c } = cell;
        if (
          c === currentCol &&
          r !== rowRandom &&
          r >= rowStart - 1 &&
          r <= rowEnd + 1
        ) {
          let currentHTMLNode = document.getElementById(`node-${r}-${c}`);
          if (!cell.isStart && !cell.isFinish) {
            setTimeout(() => {
              currentHTMLNode.className = `${nodeStyles.node} ${nodeStyles.nodeWall}`;
              cell.isWall = true;
            }, 50 * idx);
          }
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
