import React, { useState, useEffect } from "react";
import { toggleWalls, generateGrid } from "../../utils";
import { dijkstra, getNodesInShortestPathOrder } from "../../algo/dijkstra";
import recursiveMaze from "../../algo/maze/recursive-divison";
import ButtonGroup from "./button-group";
import Node from "../node";

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
          document.getElementById(
            `node-${node.row}-${node.col}`
          ).className = `${nodeStyles.node} ${nodeStyles.nodeShortestPath}`;
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
          // this feels anti react... must be a "better" way to do this..
          document.getElementById(
            `node-${node.row}-${node.col}`
          ).className = `${nodeStyles.node} ${nodeStyles.nodeVisited}`;
        }
      }, DELAY * i);
    }
  }

  function visualiseAlgo() {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animate(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  function generateMaze() {
    setLocked(true);
    const DELAY = 10;
    const maze = recursiveMaze(
      grid,
      2,
      GRID_ROW_LENGTH - 2,
      2,
      GRID_COL_LENGTH - 3
    );
    maze.forEach((cell, idx) => {
      if (idx === maze.length - 1) {
        setTimeout(() => {
          setLocked(false);
        }, DELAY * idx);
      }
      setTimeout(() => {
        cell.isWall = true;
        cell.isMaze = true;
        document.getElementById(
          `node-${cell.row}-${cell.col}`
        ).className = `${nodeStyles.node} ${nodeStyles.nodeMaze} ${nodeStyles.nodeWall}`;
      }, DELAY * idx);
    });
  }

  function clear() {
    setLocked(true);
    grid.forEach((row) => {
      row
        .filter((cell) => !(cell.isFinish || cell.isStart))
        .forEach((cell) => {
          cell.isWall = false;
          cell.isMaze = false;
          const node = document.getElementById(`node-${cell.row}-${cell.col}`);
          node.className = `${nodeStyles.node}`;
        });
    });

    setTimeout(() => {
      setLocked(false);
      renderFlag(true);
    }, 200);
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
      />
      <div className={styles.grid}>
        {grid.map((row, rowIdx) => (
          <div key={rowIdx} className={styles.row}>
            {row.map((node, nodeIdx) => {
              const { row, col, isStart, isFinish, isMaze, isWall } = node;
              return (
                <Node
                  key={nodeIdx}
                  isWall={isWall}
                  isMaze={isMaze}
                  isStart={isStart}
                  isFinish={isFinish}
                  onMouseDown={handleMouseDown}
                  onMouseEnter={handleMouseEnter}
                  onMouseUp={handleMouseUp}
                  row={row}
                  col={col}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
