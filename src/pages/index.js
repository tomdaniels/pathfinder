import React, { useState, useEffect } from "react";
import { toggleWalls, generateGrid } from "../utils";
import { dijkstra } from "../algo/dijkstra";
import Node from "../components/node";

import styles from "../styles/Grid.module.css";

// grid size
const GRID_COL_LENGTH = 80;
const GRID_ROW_LENGTH = 20;

// start node position
const START_NODE_COL = 10;
const START_NODE_ROW = 10;

// finish node position
const FINISH_NODE_COL = 65;
const FINISH_NODE_ROW = 15;

export default function PathFinder() {
  const [grid, setGrid] = useState([]);
  const [pressedMouse, setPressedMouse] = useState(false);

  function createNode({ col, row }) {
    return {
      col,
      row,
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
    };
  }

  useEffect(() => {
    const cells = generateGrid(GRID_ROW_LENGTH, GRID_COL_LENGTH, createNode);
    setGrid(cells);
  }, []);

  function animate(visitedNodes) {
    for (let i = 0; i < visitedNodes.length; i++) {
      setTimeout(() => {
        const node = visitedNodes[i];
        const _grid = grid.slice();
        const _node = {
          ...node,
          isVisited: true,
        };

        console.log(grid[node.row][node.col]);

        _grid[node.row][node.col] = _node;
        setGrid(_grid);
      }, 50 * i);
    }
  }

  function visualiseDijkstra() {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    animate(visitedNodesInOrder);
  }

  function handleMouseDown(row, col) {
    console.log("rpowcol", row, col);
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
      <button onClick={() => visualiseDijkstra()}>
        {"Visualise Dijkstra's Algorithm"}
      </button>
      <div className={styles.grid}>
        {grid.map((row, rowIdx) => (
          <div key={rowIdx}>
            {row.map((node, nodeIdx) => {
              const { row, col, isStart, isFinish, isVisited, isWall } = node;
              return (
                <Node
                  key={nodeIdx}
                  isWall={isWall}
                  isStart={isStart}
                  isFinish={isFinish}
                  isVisited={isVisited}
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
