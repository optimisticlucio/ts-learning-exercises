import { addNewTask } from "../pure-redux/reducers.js";
import { useState } from "react";
import { store } from "../pure-redux/store.js";

export default function NewTaskInput() {
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
          store.dispatch(addNewTask(taskName));
          setTaskName("");
        }}
      >
        Add Task
      </button>
    </div>
  );
}
