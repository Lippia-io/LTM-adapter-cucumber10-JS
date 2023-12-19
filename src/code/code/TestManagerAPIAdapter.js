const Step = require("../model/request/Step");
const Test = require("../model/request/Test");

const TestManagerAPIClient = require("./TestManagerAPIClient");

const { Mutex } = require("async-mutex");

const { SummaryFormatter, formatterHelpers } = require("@cucumber/cucumber");

const { GherkinDocumentParser, PickleParser } = formatterHelpers;
const { getGherkinStepMap } = GherkinDocumentParser;
const { getPickleStepMap } = PickleParser;
class TestManagerAPIAdapter extends SummaryFormatter {
    steps = [];
    mutex = new Mutex();

    constructor(options) {
        super(options);

        options.eventBroadcaster.on("envelope", this.parseEnvelope.bind(this));
    }

    parseEnvelope(envelope) {
        return Promise.resolve().then(async () => {
            await this.mutex.runExclusive(async () => {
                if (envelope.testRunStarted) await this.onTestRunStarted(envelope.testRunStarted);
                if (envelope.testCaseStarted) await this.onTestCaseStarted(envelope.testCaseStarted);
                if (envelope.testStepStarted) await this.onTestStepStarted(envelope.testStepStarted);
                if (envelope.testStepFinished) await this.onTestStepFinished(envelope.testStepFinished);
                if (envelope.testCaseFinished) await this.onTestCaseFinished(envelope.testCaseFinished);
                if (envelope.testRunFinished) await this.onTestRunFinished(envelope.testRunFinished);
            });
        });
    }

    async onTestRunStarted(testRunStarted) {
        await TestManagerAPIClient.createRun();
    }

    async onTestRunFinished(testRunFinished) {
    }

    async onTestCaseStarted(testCaseStarted) {
    }

    async onTestStepStarted(testStepStarted) {
    }

    async onTestStepFinished(testStepFinished) {
        const { gherkinDocument, pickle, testCase } =
            this.eventDataCollector.getTestCaseAttempt(
                testStepFinished.testCaseStartedId || ''
            );

        const { message, status } = testStepFinished.testStepResult || {};
        const pickleStepMap = getPickleStepMap(pickle);
        const gherkinStepMap = getGherkinStepMap(gherkinDocument);
        const testStep = (testCase.testSteps || []).find(
            (item) => item.id === testStepFinished.testStepId
        );

        if (testStep && testStep.pickleStepId) {
            const pickleStep = pickleStepMap[testStep.pickleStepId];
            const astNodeId = pickleStep.astNodeIds[0];
            const gherkinStep = gherkinStepMap[astNodeId];

            const keyword = gherkinStep.keyword;
            const stepText = pickleStep.text;

            const title = keyword + stepText;

            if (status) {
                this.steps.push(new Step(title, message || '', "", this.formatStatus(status)));
            }
        }
    }

    // technical debt
    async onTestCaseFinished(testCaseFinished) {
        const { gherkinDocument, pickle, worstTestStepResult } =
            this.eventDataCollector.getTestCaseAttempt(testCaseFinished.testCaseStartedId || '');

        const featureName = gherkinDocument.feature.name;
        const name = pickle.name;
        const status = this.formatStatus(worstTestStepResult.status);
        const tags = [];

        pickle.tags.forEach(tag => {
            tags.push(tag.name);
        });

        const test = new Test(
            name,
            TestManagerAPIClient.getRunId(),
            status,
            featureName,
            'SCENARIO',
            tags,
            this.steps
        );

        await TestManagerAPIClient.createTest(test);

        this.steps = [];
    }

    formatStatus(status) {
        return status.substring(0, status.toString().length - 2);
    }
}

module.exports = TestManagerAPIAdapter;
