import http from 'k6/http';
import { check, sleep } from 'k6';
const { testType = "smoke" } = __ENV;

const config = {
  smoke: [
    { duration: "2s", target: "1" } // minimal load with 1 concurrent user 
  ],
  load: [
    { duration: "5m", target: 50 }, // simulate ramp up of traffic from 1 t0 100 users over 5m
    { duration: "5m", target: 50 }, // stay at 100 users for 5m
    { duration: "1m", target: 10 }, // ramp down to 10 users
    { duration: "1m", target: 0 }, // ramp down to 0 users
  ],
  soak: [
    { "duration": "2m", "target": 400 }, // ramp up
    { "duration": "3h56m", "target": 400 }, // soak
    { "duration": "2m", "target": 10 }, // scale down
  ],
  spike: [
    { duration: '10s', target: 100 }, // below normal load
    { duration: '1m', target: 100 },
    { duration: '10s', target: 1400 }, // spike to 1400 users
    { duration: '3m', target: 1400 },
    { duration: '10s', target: 100 }, // scale down recovery stage
    { duration: '3m', target: 100 }, // after recovery
    { duration: '10s', target: 10 }
  ],
  stress: [
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
}


export const options = {
  stages: config[testType],
  thresholds: {
    'http_req_duration{status:200}': ['max>=0'],
    'http_req_duration{status:403}': ['max>=0'],
    'http_req_duration{p99:below 1000}': ['p(99)<1000'], // 99% of requests must complete below 1.0s
  },
  'summaryTrendStats': ['min', 'med', 'avg', 'p(90)', 'p(95)', 'max', 'count'],
};

const BASE_URL = 'https://d1a1-3-110-86-72.in.ngrok.io';

export default () => {
  const payload = JSON.stringify({
    email: 'aaa',
    password: 'bbb',
  });
  const getUser = http.get(`${BASE_URL}/subscribe?userId=1`);
  const addSubscription = http.post(`${BASE_URL}/subscribe?userId=1`,payload);
  const updateSubscription = http.put(`${BASE_URL}/subscribe?userId=1`,payload);
  const deleteSubscription = http.del(`${BASE_URL}/subscribe?userId=1`);
  sleep(1);
};


export function handleSummary(data) {
  return {
    'summary.json': JSON.stringify(data), // and a JSON with all the details...
  };
}
