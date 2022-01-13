import styles from "../styles/Node.module.css";

export default function Node({ row, col, isStart, isFinish }) {
  const extraClassName = isFinish
    ? styles.nodeFinish
    : isStart
    ? styles.nodeStart
    : "";

  return <div className={`${styles.node} ${extraClassName}`}></div>;
}
