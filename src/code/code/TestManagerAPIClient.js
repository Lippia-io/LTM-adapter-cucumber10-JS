const axios = require('axios');

class TestManagerAPIClient {
    static #apiUrl = 'https://run-result-import.dev.lippia.io';
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
            'username': process.env.TEST_MANAGER_USERNAME || 'admin',
            'password': process.env.TEST_MANAGER_PASSWORD || 'admin'
        };
    }

    static getAPIUrl() {
        if (this.#apiUrl) {
            return this.#apiUrl;
        }

        let uri = process.env.TEST_MANAGER_API_HOST || 'https://run-result-import.dev.lippia.io';

        if (process.env.TEST_MANAGER_API_PORT) {
            uri += `:${process.env.TEST_MANAGER_API_PORT}`;
        }

        return uri;
    }

    static createRun() {
        return Promise.resolve().then(async () => {
            const run = {
                runName: process.env.TEST_MANAGER_RUN_NAME || '[formatter] cucumber-js adapter byafuauuuuuuU #1',
                projectCode: process.env.TEST_MANAGER_PROJECT_CODE || 'REPORTES'
            };

            const url = `${this.getAPIUrl()}/runs`;

            try {
                const result = await axios.post(url, run, {headers: this.getApiHeaders()});
                this.#runId = result.data.id;
            } catch (error) {
                throw error;
            }
        });
    }

    static createTest(test) {
        return Promise.resolve().then(async () => {
            const url = `${this.getAPIUrl()}/tests`;

            try {
                await axios.post(url, test, { headers: this.getApiHeaders() });
            } catch (error) {
                console.info(error);
            }
        });
    }
}

module.exports = TestManagerAPIClient;
