## Installation:

```
1. Open command line under UP42ApiAutomationTestingProject location
2. Run npm install cypress --save-dev
```

## Running from the CLI

```
./node_modules/.bin/cypress run
```

## Test cases:

**Create and run job with valid input data - verify job details**
Steps:

```
Add a new job to prepared workflow and run it
Get job details
```

Expected results:

```
Job details response includes ...
```

**Create and run job with invalid auth token - verify error message**
Steps:

```
Try to add a new job to prepared workflow using outdated auth token
Get error message
```

Expected results:

```
Error message response includes '"code":401' and '"message":"Unauthorized"'
```

**Create and run job with not existing flow id - verify error message**
Steps:

```
Try to add a new job to not existing workflow
Get error message
```

Expected results:

```
Error message response includes ...
```
