# [JS] Lippia Test Manager Cucumber10 Adapter

[![Crowdar Official Page](https://img.shields.io/badge/crowdar-official%20page-brightgreen)](https://crowdar.com.ar/)
[![Lippia Official Page](https://img.shields.io/badge/lippia-official%20page-brightgreen)](https://www.lippia.io/)

The Lippia Test Manager adapter allows to ingest cucumber test results into a Lippia Test Manager instance.
To have access to a Lippia Test Manager go to [Lippia.io](https://lippia.io/) website.
To use it you need to have a test automation code project and use Cucumber 10.

## Getting Started

### Install
```bash
$ npm install @ltm/cucumber10-adapter
```

### Configure
In your **cucumber.json** file, add the following format into default section, it looks like this
```json
{
  "default": {
    "paths": ["src/resources/features/"],
    "require": ["src/**/*.js"],
    "format": [
      "html:cucumber-report.html",
      "<syntax-pending>"
    ],
    "parallel": 5
  }
}
```