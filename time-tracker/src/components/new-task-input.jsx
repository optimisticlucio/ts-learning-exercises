import { useDispatch } from "react-redux";
import { addNewTask } from "../redux-toolkit/reducers.js";
import { useState } from "react";

export default function NewTaskInput() {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

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
          dispatch(addNewTask(inputValue));
          setInputValue("");
      }}>Add Task</button>
    </div>
  );
}
