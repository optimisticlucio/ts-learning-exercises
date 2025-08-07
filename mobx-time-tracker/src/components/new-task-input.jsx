import { useState } from "react";
import { observer } from "mobx-react-lite";

export const NewTaskInput = observer(({ addNewTaskFunction }) => {
  const [taskName, setTaskName] = useState("");

  return (
    <div>
      <input
        type="text"
        value={taskName}
        onChange={(event) => {
          setTaskName(event.target.value);
        }}
        placeholder="Write task name here"
      />
      <button
        onClick={() => {
          addNewTaskFunction(taskName);
          setTaskName("");
        }}
      >
        Add Task
      </button>
    </div>
  );
});
