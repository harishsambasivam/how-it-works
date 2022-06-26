/**
  Stress testing is a type of load testing used to determine the limits of the system
  
  Purpose:
   The purpose is to verify the stability and reliability of the system under extreme conditions
  
   Run a stress test to:
    - Determine how system will behave in extreme conditions
    - Determine what is the maximum capacity of our system in terms of users or throughput
    - Determine the breaking point of system and failure mode.
    - Determine if your system will recover without any manual intervention after the stress test is over.
 */

const options = {
    stages: [
        // { duration: <duration to run the test>, target: <number of simulated concurrent users> }
        { duration: "2m", target: 100 }, // below normal load
        { duration: "5m", target: 100 },
        { duration: "2m", target: 200 }, // normal load
        { duration: "5m", target: 200 },
        { duration: "2m", target: 300 }, // around the breaking point
        { duration: "5m", target: 300 },
        { duration: "2m", target: 400 }, // beyond the breaking point
        { duration: "5m", target: 400 },
        { duration: "2m", target: 10 }, // scale down, recovery stage 
    ]
};