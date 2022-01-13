import React, { useState, useEffect } from "react";
import generateGrid from "../utils/generate-grid";
import { dijkstra } from "../algo/dijkstra";
import Node from "../components/node";

import styles from "../styles/Grid.module.css";

const GRID_COL_LENGTH = 110;
const GRID_ROW_LENGTH = 35;
const START_NODE_COL = 10;
const START_NODE_ROW = 5;
const FINISH_NODE_COL = 80;
const FINISH_NODE_ROW = 20;

export default function PathFinder() {
  const [grid, setGrid] = useState([]);

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

  function visualiseDijkstra() {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    console.log(visitedNodesInOrder);
  }

  return (
    <>
      <button onClick={() => visualiseDijkstra()}>
        {"Visualise Dijkstra's Algorithm"}
      </button>
      <div className={styles.grid}>
        {grid.map((row, rowIdx) => (
          <div key={rowIdx}>
            {row.map((node, nodeIdx) => {
              const { isStart, isFinish } = node;
              return (
                <React.Fragment key={nodeIdx}>
                  <Node
                    // row={rowIdx}
                    // col={nodeIdx}
                    isStart={isStart}
                    isFinish={isFinish}
                  />
                </React.Fragment>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}
