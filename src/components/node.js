import styles from "../styles/Node.module.css";

export default function Node({
  col,
  row,
  isWall,
  isStart,
  isFinish,
  isVisited,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
}) {
  const extraClassName = isFinish
    ? styles.nodeFinish
    : isStart
    ? styles.nodeStart
    : isVisited
    ? styles.nodeVisited
    : isWall
    ? styles.nodeWall
    : "";

  return (
    <div
      id={`node-${row}-${col}`}
      className={`${styles.node} ${extraClassName}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}
    />
  );
}
