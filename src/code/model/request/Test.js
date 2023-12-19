class Test {
    constructor(title, runId, status, feature, type, tags, steps) {
        this.title = title
        this.runId = runId
        this.status = status
        this.feature = feature
        this.type = type
        this.tags = tags
        this.steps = steps
    }

    getTitle() {
        return this.title
    }

    getRunId() {
        return this.runId
    }

    getStatus() {
        return this.status
    }

    getFeature() {
        return this.feature
    }

    getType() {
        return this.type
    }

    getTags() {
        return this.tags
    }

    getSteps() {
        return this.steps
    }
}

module.exports = Test