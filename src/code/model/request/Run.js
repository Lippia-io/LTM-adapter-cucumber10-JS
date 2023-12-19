class Run {
    constructor(runName, projectCode) {
        this.runName = runName;
        this.projectCode = projectCode;
    }

    getRunName() {
        return this.runName;
    }

    getProjectCode() {
        return this.projectCode;
    }
}

module.exports = Run