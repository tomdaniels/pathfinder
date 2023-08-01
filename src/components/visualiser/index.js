import React, { useState, useEffect } from "react";

import recursiveDivisionMaze from "../../algo/maze/generators/recursive-divison";
import mazeSolvers from "../../algo/maze/solvers";

import Node from "../node";
import ButtonGroup from "./button-group";

import updateNodeStyles from "../../utils/update-node-style";
import { clearNodes, toggleWalls, generateGrid } from "../../utils";

import styles from "../../styles/Grid.module.css";
import nodeStyles from "../../styles/Node.module.css";

export default function Visualiser({ gridCnfg }) {
  const [grid, setGrid] = useState([]);
  const [locked, setLocked] = useState(false);
  const [render, renderFlag] = useState(false);
  const [pressedMouse, setPressedMouse] = useState(false);

  const {
    gridHeight: GRID_ROW_LENGTH,
    gridWidth: GRID_COL_LENGTH,
    startRow: START_NODE_ROW,
    startCol: START_NODE_COL,
    finishRow: FINISH_NODE_ROW,
    finishCol: FINISH_NODE_COL,
  } = gridCnfg;

  function configureNodes({ start, finish }) {
    return function ({ col, row }) {
      return {
        col,
        row,
        isStart: row === start.row && col === start.col,
        isFinish: row === finish.row && col === finish.col,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        isMaze: false,
        previousNode: null,
      };
    };
  }

  useEffect(() => {
    const start = { row: START_NODE_ROW, col: START_NODE_COL };
    const finish = { row: FINISH_NODE_ROW, col: FINISH_NODE_COL };

    const cells = generateGrid(
      GRID_ROW_LENGTH,
      GRID_COL_LENGTH,
      configureNodes({ start, finish })
    );

    setGrid(cells);
    renderFlag(false);
  }, [
    GRID_ROW_LENGTH,
    GRID_COL_LENGTH,
    START_NODE_ROW,
    START_NODE_COL,
    FINISH_NODE_ROW,
    FINISH_NODE_COL,
    render,
  ]);

  function animateShortestPath(path) {
    const DELAY = 55;
    for (let i = 0; i < path.length; i++) {
      if (i === path.length - 1) {
        setTimeout(() => {
          setLocked(false);
          return;
        }, DELAY * i);
      }
      setTimeout(() => {
        const node = path[i];
        if (!(node.isStart || node.isFinish)) {
          updateNodeStyles(
            `node-${node.row}-${node.col}`,
            `${nodeStyles.node} ${nodeStyles.nodeShortestPath}`
          );
        }
      }, DELAY * i);
    }
  }

  function animate(visitedNodes, shortestPath) {
    setLocked(true);
    const DELAY = 15;
    for (let i = 0; i <= visitedNodes.length; i++) {
      if (i === visitedNodes.length) {
        setTimeout(() => {
          animateShortestPath(shortestPath);
        }, DELAY * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodes[i];

        if (!(node.isStart || node.isFinish)) {
          updateNodeStyles(
            `node-${node.row}-${node.col}`,
            `${nodeStyles.node} ${nodeStyles.nodeVisited}`
          );
        }
      }, DELAY * i);
    }
  }

  function visualiseAlgo(type) {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];

    const solver = mazeSolvers.get(type)
    const {visitedNodesInOrder, nodesInShortestPathOrder} = solver(grid, startNode, finishNode);
    animate(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  function generateMaze() {
    setLocked(true);
    const DELAY = 10;
    const wallsToAnimate = recursiveDivisionMaze(
      grid,
      2,
      GRID_ROW_LENGTH - 2,
      2,
      GRID_COL_LENGTH - 3
    );
    wallsToAnimate.forEach((cell, idx) => {
      if (idx === wallsToAnimate.length - 1) {
        setTimeout(() => {
          setLocked(false);
        }, DELAY * idx);
      }
      setTimeout(() => {
        cell.isWall = true;
        cell.isMaze = true;
        updateNodeStyles(
          `node-${cell.row}-${cell.col}`,
          `${nodeStyles.node} ${nodeStyles.nodeMaze} ${nodeStyles.nodeWall}`
        );
      }, DELAY * idx);
    });
  }

  function clear() {
    for (let row of grid) {
      for (let cell of row) {
        if (!(cell.isStart || cell.isFinish)) {
          updateNodeStyles(
            `node-${cell.row}-${cell.col}`,
            `${nodeStyles.node}`
          );
        }
      }
    }
    setGrid((_grid) => [...clearNodes(_grid)]);
  }

  function handleMouseDown(row, col) {
    if (locked) return;
    const _grid = toggleWalls(grid, row, col);
    setGrid(_grid);
    setPressedMouse(true);
  }

  function handleMouseEnter(row, col) {
    if (!pressedMouse) return;
    const _grid = toggleWalls(grid, row, col);
    setGrid(_grid);
  }

  function handleMouseUp() {
    setPressedMouse(false);
  }

  return (
    <div className={styles.container}>
      <ButtonGroup
        visualiseAlgo={visualiseAlgo}
        generateMaze={generateMaze}
        locked={locked}
        clear={clear}
      >
        Draw some walls or generate a maze
      </ButtonGroup>
      <div className={styles.grid}>
        {grid.map((row, rowIdx) => (
          <div key={rowIdx} className={styles.row}>
            {row.map((node) => {
              const { row, col } = node;
              return (
                <Node
                  key={`${row}-${col}`}
                  onMouseDown={handleMouseDown}
                  onMouseEnter={handleMouseEnter}
                  onMouseUp={handleMouseUp}
                  row={row}
                  col={col}
                  {...node}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
