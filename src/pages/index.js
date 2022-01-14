import React, { useState, useEffect } from "react";
import { toggleWalls, generateGrid } from "../utils";
import { dijkstra, getNodesInShortestPathOrder } from "../algo/dijkstra";
import recursiveDivisionMaze from "../algo/maze/recursive-divison";
import Node from "../components/node";

import styles from "../styles/Grid.module.css";
import nodeStyles from "../styles/Node.module.css";

const GRID_ROW_LENGTH = 25;
const START_NODE_COL = 10;
const START_NODE_ROW = 15;
const FINISH_NODE_ROW = 10;

export default function PathFinder() {
  const [grid, setGrid] = useState([]);
  const [gridColLength, setGridLength] = useState(0);
  const [finishNodeCol, setFinishNodeCol] = useState(0);
  const [pressedMouse, setPressedMouse] = useState(false);

  function createNodeWithFinishCol(finishNodeCol) {
    return function ({ col, row }) {
      return {
        col,
        row,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === finishNodeCol,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null,
      };
    };
  }

  useEffect(() => {
    // build grid & set finish node using current browser width
    const GRID_COL_LENGTH = Math.floor(window.innerWidth / 22);
    const FINISH_NODE_COL = Math.floor(GRID_COL_LENGTH - 10);

    setGridLength(GRID_COL_LENGTH); // accessed from maze gen
    setFinishNodeCol(FINISH_NODE_COL); // accessed from click handlers

    const cells = generateGrid(
      GRID_ROW_LENGTH,
      GRID_COL_LENGTH,
      createNodeWithFinishCol(FINISH_NODE_COL)
    );
    setGrid(cells);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentional, once per render.

  function animateShortestPath(path) {
    for (let i = 0; i < path.length; i++) {
      setTimeout(() => {
        const node = path[i];
        document.getElementById(
          `node-${node.row}-${node.col}`
        ).className = `${nodeStyles.node} ${nodeStyles.nodeShortestPath}`;
      }, 50 * i);
    }
  }

  function animate(visitedNodes, shortestPath) {
    for (let i = 0; i <= visitedNodes.length; i++) {
      if (i === visitedNodes.length) {
        setTimeout(() => {
          animateShortestPath(shortestPath);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodes[i];

        // this is a lil' gross... bit of a no no but a much better alternative
        // to re-render the entire grid every 10ms.. maybe a ref would be better :thinking:
        document.getElementById(
          `node-${node.row}-${node.col}`
        ).className = `${nodeStyles.node} ${nodeStyles.nodeVisited}`;
      }, 10 * i);
    }
  }

  function visualiseDijkstra() {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][finishNodeCol];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animate(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  function generateMaze() {
    const maze = recursiveDivisionMaze(
      grid,
      2,
      GRID_ROW_LENGTH,
      2,
      gridColLength,
      "horizontal"
    );
    console.log(maze);
  }

  function handleMouseDown(row, col) {
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
      <button onClick={() => generateMaze()}>Generate Maze</button>
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
