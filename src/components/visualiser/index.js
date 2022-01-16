import React, { useState, useEffect } from "react";
import { toggleWalls, generateGrid } from "../../utils";
import { dijkstra, getNodesInShortestPathOrder } from "../../algo/dijkstra";
import { recursive } from "../../algo/maze";
// import { MAZE_TYPES } from "../../constants";
import ButtonGroup from "./button-group";
import Node from "../node";

import styles from "../../styles/Grid.module.css";
import nodeStyles from "../../styles/Node.module.css";

export default function Visualiser({ gridCnfg }) {
  const [grid, setGrid] = useState([]);
  const [locked, setLocked] = useState(false);
  const [render, renderFlag] = useState(false);
  const [pressedMouse, setPressedMouse] = useState(false);
  const [activeMaze, setActiveMaze] = useState(false);

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
    for (let i = 0; i < path.length; i++) {
      setTimeout(() => {
        const node = path[i];
        if (!(node.isStart || node.isFinish)) {
          document.getElementById(
            `node-${node.row}-${node.col}`
          ).className = `${nodeStyles.node} ${nodeStyles.nodeShortestPath}`;
        }
      }, 55 * i);
    }
  }

  function animate(visitedNodes, shortestPath) {
    for (let i = 0; i <= visitedNodes.length; i++) {
      if (i === visitedNodes.length) {
        setTimeout(() => {
          animateShortestPath(shortestPath);
        }, 15 * i);
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
      }, 15 * i);
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
    recursive(grid, 2, GRID_ROW_LENGTH - 2, 2, GRID_COL_LENGTH - 3);
    setActiveMaze(true);
  }

  function clear() {
    grid.forEach((row) => {
      row
        .filter((cell) => !(cell.isFinish || cell.isStart))
        .forEach((cell) => {
          cell.isWall = false;
          const node = document.getElementById(`node-${cell.row}-${cell.col}`);
          node.className = `${nodeStyles.node}`;
        });
    });
    setActiveMaze(false);
    renderFlag(true);
  }

  function handleMouseDown(row, col) {
    if (activeMaze) return;
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
        activeMaze={activeMaze}
        locked={locked}
        onClear={clear}
      />
      <div className={styles.grid}>
        {grid.map((row, rowIdx) => (
          <div key={rowIdx} className={styles.row}>
            {row.map((node, nodeIdx) => {
              const { row, col, isStart, isFinish, isWall } = node;
              return (
                <Node
                  key={nodeIdx}
                  isWall={isWall}
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
