# [JS] Lippia Test Manager Cucumber10 Adapter

[![Crowdar Official Page](https://img.shields.io/badge/crowdar-official%20page-brightgreen)](https://crowdar.com.ar/)
[![Lippia Official Page](https://img.shields.io/badge/lippia-official%20page-brightgreen)](https://www.lippia.io/)

The Lippia Test Manager adapter **allows to ingest** cucumber test **results** into a **Lippia Test Manager** instance.  
To have access to a Lippia Test Manager go to **[Lippia.io](https://lippia.io)** website.  
To use it you need to have a test automation code project and use **Cucumber 10**.  

## Requirements
- **[Node](https://nodejs.org/en)** `required`  
- **[Docker](https://www.docker.com/products/docker-desktop/)** `optional`

### Environment Variables
_The following table represents the variables through which you will try to establish the connection to Lippia Test Manager_

| Key                           | Meaning                         | Mandatory |
|-------------------------------|---------------------------------|-----------|
| **TEST_MANAGER_USERNAME**     | Represents the username         | True      |
| **TEST_MANAGER_PASSWORD**     | Represents the password         | True      |
| **TEST_MANAGER_API_HOST**     | Represents the api host where x | True      |
| **TEST_MANAGER_API_PORT**     | Represents the api port where x | False     |
| **TEST_MANAGER_RUN_NAME**     | Represents the run name         | True      |
| **TEST_MANAGER_PROJECT_CODE** | Represents the project code     | True      |

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