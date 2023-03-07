import styles from "../../styles/ButtonGroup.module.css";

export default function ButtonGroup({
  generateMaze,
  visualiseAlgo,
  locked,
  clear,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <button disabled={locked} onClick={() => generateMaze()}>
          Generate maze
        </button>
        <button disabled={locked} onClick={() => clear()}>
          Clear
        </button>
      </div>
      <button disabled={locked} onClick={() => visualiseAlgo()}>
        Visualise
      </button>
    </div>
  );
}
