import React, { useState, useEffect } from "react";
import Node from "../components/node";

import styles from "../styles/Grid.module.css";

export default function PathFinder() {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    const cells = [];
    for (let row = 0; row < 35; row++) {
      const currentRow = [];
      for (let col = 0; col < 110; col++) {
        const currentNode = {
          col,
          row,
          isStart: row === 10 && col === 5,
          isFinish: row === 20 && col === 80,
        };
        currentRow.push(currentNode);
      }
      cells.push(currentRow);
    }
    setNodes(cells);
  }, []);

  return (
    <div className={styles.grid}>
      {nodes.map((row, rowIdx) => (
        <div key={rowIdx}>
          {row.map((node, nodeIdx) => {
            console.log(node);
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
  );
}
