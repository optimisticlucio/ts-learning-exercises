
import { useDispatch } from 'react-redux';
import { addNewTask } from './reducers.jsx';
import {useState} from "react";

export default function TaskAdder() {
    const [inputValue, setInputValue] = useState("");
    const dispatch = useDispatch();

    return (
        <div>
            <input type="text"
                   value={inputValue}
                   onChange={(e) => {setInputValue(e.target.value)}}
                   placeholder="Write task name here"
            />
            <button
                onClick={() => dispatch(addNewTask(inputValue))}
            >
                Add Task
            </button>
        </div>
    );
}