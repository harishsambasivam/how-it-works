/*
    Soak testing is used to validate reliablity of the system over long time

    Run Soak tests to:
    - verify that our system doesn't suffer from bugs or memory leaks, which will result in crash or restart.
    - verify that expected application restarts wont drop requests
    - find bugs related to data races that appear sporadically
    - Make sure our database doesn't exhaust the allocated storage and stops
    - Make sure our logs don't exhaust the allocated disk space
    - Make sure the external services we depend on dont stop after making certain number of requests are exceeded.

    How to run soak tests:
    - Determine the maximum number of users our system can handle (stress testing)
    - Get the 70-80% of that value
    - set concurrent users to that value
    - Run the test in 3 stages. Ramp up the concurrent users, stay there for 4-12 hours and rump down to 0.

*/

const options = {
    stages: [
        {"duration": "2m", "target": 400}, // ramp up
        {"duration": "3h56m", "target": 400}, // soak
        {"duration": "2m", "target": 10}, // scale down
    ]
}