/*
   Load testing is primarily concerned with assessing the current performance of our system in terms of concurrent users or requests per second. 

   Run a load test to:
   - Assess the current performance of our system our typical and peak load
   - To make sure we are continuosly meeting the performance standards  as we make changes to our system

   Can be used to simulate a normal day in our business
*/


const options = {
    stages: [
        {duration: "5m", target: 100}, // simulate ramp up of traffic from 1 t0 100 users over 5m
        {duration: "10m", target: 100}, // stay at 100 users for 5m
        {duration: "5m", target: 10}, // ramp down to 10 users
        {duration: "1m", target: 0}, // ramp down to 0 users
    ],
    thresholds: {
        http_req_duration: ['p(99)<200'] // p99 metric must be below 2s
    }
}