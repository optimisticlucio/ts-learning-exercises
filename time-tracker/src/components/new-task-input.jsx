import { addNewTask } from "../pure-redux/reducers.js";
import { useState } from "react";
import {store} from "../pure-redux/store.js";

export default function NewTaskInput() {
  const [inputValue, setInputValue] = useState("");

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
        placeholder="Write task name here"
      />
      <button onClick={() => {
          store.dispatch(addNewTask(inputValue));
          setInputValue("");
      }}>Add Task</button>
    </div>
  );
}
