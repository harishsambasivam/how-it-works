/**
  Spike tests are variation of stress tests, but it doesnot gradually increase the load, instead it spikes to extreme load over a very short window of time 
 
   Run a stress test to:
   - Determine how our system will perform under a sudden surge of traffic
   - Determine if our system will recover once traffic has subsided
  
   Success is based on expectations: System will react in 1 of 4 ways

   1. Excellent : system performance is not degraded during the surge of traffic. response time is similiar during low traffic and high traffic
   2. Good : Response time is slower but system does not produce any errors. All requests are handled.
   3. Poor: System produces error during the surge of traffic and recovers to normal after traffic subsides.
   4. Bad: System crashes, and does not recover after the traffic has subsided.
  
 */


const options = {
    stages: [
        { duration: '10s', target: 100 }, // below normal load
        { duration: '1m', target: 100 },
        { duration: '10s', target: 1400 }, // spike to 1400 users
        { duration: '3m', target: 1400 },
        { duration: '10s', target: 100 }, // scale down recovery stage
        { duration: '3m', target: 100 }, // after recovery
        { duration: '10s', target: 10 }
    ]
};