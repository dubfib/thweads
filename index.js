const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

module.exports = class Thweads {
    constructor({ thweads } = {}) {
        this.thweads = thweads || Math.max(1, Math.floor(require('os').cpus().length / 2));
        this.actions = [];
        this.completedTasks = 0;
    }

    addAction(actionFunction) {
        this.actions.push(actionFunction);
    };

    completedTask() {
        if (++this.completedTasks === this.actions.length) {
            parentPort?.postMessage('workerFinished');
            parentPort?.close();
        };
    };

    async startActions(callback) {
        if (!isMainThread) {
            const actions = workerData.actions.map(fnStr => eval(`(${fnStr})`));
            actions.forEach(action => action());
            parentPort?.postMessage('workerFinished');
            parentPort?.close();
            return;
        };

        const actionsPerThread = Math.ceil(this.actions.length / this.thweads);

        for (let i = 0; i < this.thweads; i++) {
            const start = i * actionsPerThread;
            const end = start + actionsPerThread;
            const threadActions = this.actions.slice(start, end).map(fn => fn.toString());

            const worker = new Worker(__filename, { workerData: { actions: threadActions } });
            worker.on('message', () => this.completedTask());
        };

        if (!this.actions.length) callback();
    };
};