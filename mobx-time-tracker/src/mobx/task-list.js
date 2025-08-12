import {action, autorun, makeObservable, observable, computed} from "mobx";

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
      availableID: computed,
      runOncePerSecond: action,
      changeCurrentTask: action,
      addTask: action,
      pauseCurrentTask: action,
    });

    autorun(() =>
      setInterval(() => {
        this.incrementSeconds();
        console.log(`Tick, ${JSON.stringify(this)}`); // For Debugging
      }, 1000),
    );
  }

  get availableID() {
    const BIGGEST_ID = 1000;

    // If the task amount is equal to the biggest ID, the list is filled up.
    if (BIGGEST_ID === self.tasks.length) {
      return null;
    }

    // Get random unique ID that is not currently in tasks
    let randomID = Math.floor(Math.random() * BIGGEST_ID);
    while (this.tasks[randomID]) {
      randomID = Math.floor(Math.random() * BIGGEST_ID);
    }

    return randomID;
  }

  incrementSeconds = () => {
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
    let availableID = this.availableID;

    this.tasks[availableID] = {
      id: availableID,
      secondsPassed: 0,
      name: taskName,
    };
  };

  pauseCurrentTask = () => {
    this.currentActiveTask = null;
  };
}
