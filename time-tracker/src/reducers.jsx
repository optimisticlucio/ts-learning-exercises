import {createAction, createReducer} from "@reduxjs/toolkit";

export const changeCurrentTask = createAction("changeCurrentTask");
export const addNewTask = createAction("addNewTask");
export const runOncePerSecond = createAction("runOncePerSecond");

const initialState = {
    tasks: {
    },
    totalTimePassedInSeconds: 0,
    currentActiveTask: null
};

export const reducer = createReducer(initialState, (builder) => {
    builder
        .addCase(runOncePerSecond, (state) => {
            // If there's an active task, tick forward both the task and the general time tracker.
            const activeTask = state.tasks[state.currentActiveTask];
            if (activeTask) {
                activeTask.totalTimePassedInSeconds += 1;
                state.totalTimePassedInSeconds += 1;
            }
        })
        .addCase(changeCurrentTask, (state, action) => {
            if (!state.tasks[action.payload]) {
                console.warn(`ChangeCurrentTask was given an invalid task number - ${action.payload}`);
                return;
            }

            state.currentActiveTask = action.payload;
        })
        .addCase(addNewTask, (state, action) => {

        })
})