const axios = require('axios');
require('dotenv').config();

class TestManagerAPIClient {
    static #apiUrl;
    static #runId;

    static getRunId() {
        return this.#runId;
    }

    static setRunId(runId) {
        return this.#runId = runId;
    }

    static getApiHeaders() {
        return {
            'Content-Type': 'application/json',
            'username': process.env.TEST_MANAGER_USERNAME,
            'password': process.env.TEST_MANAGER_PASSWORD
        };
    }

    // technical debt
    static getAPIUrl() {
        if (this.#apiUrl) { // ?
            return this.#apiUrl;
        }

        let uri = process.env.TEST_MANAGER_API_HOST;

        if (process.env.TEST_MANAGER_API_PORT) {
            uri += `:${process.env.TEST_MANAGER_API_PORT}`;
        }

        return uri;
    }

    static createRun() {
        return Promise.resolve().then(async () => {
            const run = {
                runName: process.env.TEST_MANAGER_RUN_NAME,
                projectCode: process.env.TEST_MANAGER_PROJECT_CODE
            };

            const url = `${this.getAPIUrl()}/runs/runs`;

            try {
                const result = await axios.post(url, run, {headers: this.getApiHeaders()});
                this.#runId = result.data.id;
            } catch (error) {
                throw new Error(error);
            }
        });
    }

    static createTest(test) {
        return Promise.resolve().then(async () => {
            const url = `${this.getAPIUrl()}/runs/tests`;

            try {
                await axios.post(url, test, { headers: this.getApiHeaders() });
            } catch (error) {
                throw new Error(error);
            }
        });
    }
}

module.exports = TestManagerAPIClient;
