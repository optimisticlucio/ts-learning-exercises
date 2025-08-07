import { action, autorun, makeObservable, observable } from "mobx";

export default class TaskList {
  tasks = {};
  totalSecondsPassed = 0;
  currentActiveTask = null;

  constructor() {
    makeObservable(this, {
      tasks: observable,
      // I could make totalSecondsPassed computable, but then it requires recalculating it
      // every update, which seems wasteful.
      totalSecondsPassed: observable,
      currentActiveTask: observable,
      runOncePerSecond: action,
      changeCurrentTask: action,
      addTask: action,
      pauseCurrentTask: action,
    });

    autorun(() =>
      setInterval(() => {
        this.runOncePerSecond();
        console.log(`Tick, ${JSON.stringify(this)}`); // For Debugging
      }, 1000),
    );
  }

  runOncePerSecond = () => {
    // If there's an active task, tick forward both the task and the general time tracker.
    const activeTask = this.tasks[this.currentActiveTask];

    if (activeTask) {
      this.totalSecondsPassed += 1;
      activeTask.secondsPassed += 1;
    }
  };

  changeCurrentTask = (taskID) => {
    if (!this.tasks[taskID]) {
      console.warn(
        `ChangeCurrentTask was given an invalid task number - ${taskID}`,
      );
      return;
    }

    this.currentActiveTask = taskID;
  };

  addTask = (taskName) => {
    const BIGGEST_ID = 1000;

    // Get random unique ID that is not currently in tasks
    let randomID = Math.floor(Math.random() * BIGGEST_ID);
    while (this.tasks[randomID]) {
      randomID = Math.floor(Math.random() * BIGGEST_ID);
    }

    this.tasks[randomID] = {
      id: randomID,
      secondsPassed: 0,
      name: taskName,
    };
  };

  pauseCurrentTask = () => {
    this.currentActiveTask = null;
  };
}
