import { ACTIONS } from "./actions.js";

export const initialState = {
  tasks: {},
  totalSecondsPassed: 0,
  currentActiveTask: null,
};

export const changeCurrentTask = (taskID) => ({
  type: ACTIONS.CHANGE_CURRENT_TASK,
  taskID,
});

export const pauseCurrentTask = () => ({
  type: ACTIONS.PAUSE_CURRENT_TASK,
});

export const addNewTask = (taskName) => ({
  type: ACTIONS.ADD_NEW_TASK,
  taskName,
});

export const runOncePerSecond = () => ({
  type: ACTIONS.RUN_ONCE_PER_SECOND,
});

export function rootReducer(state, action) {
  switch (action.type) {
    case ACTIONS.PAUSE_CURRENT_TASK:
      return { ...state, currentActiveTask: null };

    case ACTIONS.ADD_NEW_TASK: {
      const BIGGEST_ID = 1000;

      // Get random unique ID that is not currently in tasks
      let randomID = Math.floor(Math.random() * BIGGEST_ID);
      while (state.tasks[randomID]) {
        randomID = Math.floor(Math.random() * BIGGEST_ID);
      }

      return {
        ...state,
        tasks: {
          ...state.tasks,
          [randomID]: {
            id: randomID,
            name: action.taskName,
            secondsPassed: 0,
          },
        },
      };
    }

    case ACTIONS.CHANGE_CURRENT_TASK:
      if (!state.tasks[action.taskID]) {
        console.warn(
          `ChangeCurrentTask was given an invalid task number - ${action.taskID}`,
        );
        return state;
      }

      return { ...state, currentActiveTask: action.taskID };

    case ACTIONS.RUN_ONCE_PER_SECOND: {
      // If there's an active task, tick forward both the task and the general time tracker.
      const activeTask = state.tasks[state.currentActiveTask];

      if (activeTask) {
        return {
          ...state,
          totalSecondsPassed: state.totalSecondsPassed + 1,
          tasks: {
            ...state.tasks,
            [activeTask.id]: {
              ...activeTask,
              secondsPassed: activeTask.secondsPassed + 1,
            },
          },
        };
      }

      return state;
    }

    default:
      return state;
  }
}
