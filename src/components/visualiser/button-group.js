import {
  SegmentedControl,
  SegmentedControlOption,
} from "@leafygreen-ui/segmented-control";

import styles from "../../styles/ButtonGroup.module.css";

const TASK_TYPES = {
  GEN_MAZE: "generate-maze",
  VISUALISE: "visualise",
  CLEAR: "clear",
};

export default function ButtonGroup({
  activeMaze,
  generateMaze,
  visualiseAlgo,
  clear,
}) {
  const TASKS = {
    [TASK_TYPES.VISUALISE]: visualiseAlgo,
    [TASK_TYPES.GEN_MAZE]: generateMaze,
    [TASK_TYPES.CLEAR]: clear,
  };

  function handleTask(type) {
    TASKS[type]();
  }
  return (
    <div className={styles.container}>
      <SegmentedControl
        label="path visualiser"
        size={"default"}
        darkMode={false}
        followFocus={true}
        disabled={activeMaze}
        defaultValue={TASK_TYPES.CLEAR}
        onChange={(type) => {
          handleTask(type);
        }}
      >
        <SegmentedControlOption value={TASK_TYPES.CLEAR}>
          Clear
        </SegmentedControlOption>
        <SegmentedControlOption value={TASK_TYPES.GEN_MAZE}>
          Generate Maze
        </SegmentedControlOption>
        <SegmentedControlOption value={TASK_TYPES.VISUALISE}>
          Visualise
        </SegmentedControlOption>
      </SegmentedControl>
    </div>
  );
}
