import {action, makeObservable, observable} from "mobx";

class TaskList {
    tasks= {};
    totalSecondsPassed= 0;
    currentActiveTask= null;

    constructor() {
        makeObservable(this,{
            tasks: observable,
            // I could make totalSecondsPassed computable, but then it requires recalculating it
            // every update, which seems wasteful.
            totalSecondsPassed: observable,
            currentActiveTask: observable,
            runOncePerSecond: action,
            changeCurrentTask: action,
            addNewTask: action,
            pauseCurrentTask: action
        })
    }

    runOncePerSecond() {
        // If there's an active task, tick forward both the task and the general time tracker.
        const activeTask = this.tasks[this.currentActiveTask];

        if (activeTask) {
            this.totalSecondsPassed += 1;
            activeTask.totalSeconds += 1;
        }
    }

    changeCurrentTask(taskID) {
        if (!this.tasks[taskID]) {
            console.warn(
                `ChangeCurrentTask was given an invalid task number - ${taskID}`,
            );
            return;
        }

        this.currentActiveTask = taskID;
    }

    addTask(taskName) {
        const BIGGEST_ID = 1000;

        // Get random unique ID that is not currently in tasks
        let randomID = Math.floor(Math.random() * BIGGEST_ID);
        while (this.tasks[randomID]) {
            randomID = Math.floor(Math.random() * BIGGEST_ID);
        }

        this.tasks[randomID] = {
            id: randomID,
            secondsPassed: 0,
            name: taskName
        };
    }

    pauseCurrentTask() {
        this.currentActiveTask = null;
    }
}