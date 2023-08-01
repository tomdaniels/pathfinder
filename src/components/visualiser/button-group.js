import styles from "../../styles/ButtonGroup.module.css";

export default function ButtonGroup({
  generateMaze,
  visualiseAlgo,
  locked,
  clear,

  children,
}) {
  return (
    <div className={styles.container}>
      <div>
        <button disabled={locked} onClick={() => generateMaze()}>
          Generate maze
        </button>
      </div>
      {children}
      <div className={styles.right}>
        <button disabled={locked} onClick={() => visualiseAlgo('dijkstra')}>
          Solve using Dijkstra
        </button>
        <button disabled={locked} onClick={() => visualiseAlgo('backtracker')}>
          Solve using recursive backtracking
        </button>
        <button disabled={locked} onClick={() => clear()}>
          Clear
        </button>
      </div>
    </div>
  );
}
