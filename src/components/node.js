import styles from "../styles/Node.module.css";

export default function Node({ isStart, isFinish, isVisited }) {
  const extraClassName = isFinish
    ? styles.nodeFinish
    : isStart
    ? styles.nodeStart
    : isVisited
    ? styles.nodeVisited
    : "";

  return <div className={`${styles.node} ${extraClassName}`} />;
}
