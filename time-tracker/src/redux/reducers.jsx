import { createAction, createReducer } from "@reduxjs/toolkit";

export const changeCurrentTask = createAction("changeCurrentTask");
export const pauseAllTasks = createAction("pauseAllTasks");
export const addNewTask = createAction(
  "addNewTask",
  (taskName = "TASK NAME NOT SET") => {
    return {
      payload: {
        taskName: taskName,
      },
    };
  },
);
export const runOncePerSecond = createAction("runOncePerSecond");

const initialState = {
  tasks: {},
  totalTimePassedInSeconds: 0,
  currentActiveTask: null,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(runOncePerSecond, (state) => {
      // If there's an active task, tick forward both the task and the general time tracker.
      const activeTask = state.tasks[state.currentActiveTask];
      if (activeTask) {
        activeTask.timePassedInSeconds += 1;
        state.totalTimePassedInSeconds += 1;
      }
    })
    .addCase(changeCurrentTask, (state, action) => {
      if (!state.tasks[action.payload]) {
        console.warn(
          `ChangeCurrentTask was given an invalid task number - ${action.payload}`,
        );
        return;
      }

      state.currentActiveTask = action.payload;
    })
    .addCase(addNewTask, (state, action) => {
      const BIGGEST_ID = 1000;

      // Get random unique ID that is not currently in tasks
      let randomID = Math.floor(Math.random() * BIGGEST_ID);
      while (state.tasks[randomID]) {
        randomID = Math.floor(Math.random() * BIGGEST_ID);
      }

      state.tasks[randomID] = {
        id: randomID,
        name: action.payload.taskName,
        timePassedInSeconds: 0,
      };
    })
    .addCase(pauseAllTasks, (state) => {
      state.currentActiveTask = null;
    });
});
