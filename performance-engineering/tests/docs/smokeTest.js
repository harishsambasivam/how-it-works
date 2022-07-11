/*
    Smoke test is a regular load test, configured for minimal load. You want to run a smoke test as a sanity check every time you write a new script or modify an existing script.

    You want to run a smoke test to:

    1. Verify that your test script doesn't have errors.
    2. Verify that your system doesn't throw any errors when under minimal load.
*/

const options = {
    stages: [
        { duration: "2m", target:"1" } // minimal load with 1 concurrent user 
    ]
}