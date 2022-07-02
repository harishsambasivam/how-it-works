import http from 'k6/http';

export const options = {
    iterations: 10, // number of time to run the test
    vus: 10, // creating concurrent tcp connections
    thresholds: {
        'http_req_duration{status:200}': ['max>=0'],
        'http_req_duration{status:403}': ['max>=0'],
        'http_req_duration{p99:below 1000}': ['p(99)<1000'], // 99% of requests must complete below 1.0s
    },
    'summaryTrendStats': ['min', 'med', 'avg', 'p(90)', 'p(95)', 'max', 'count'],
};


export default () => {
  http.get(`http://localhost:3000`);
};


// After spinning up the server, try running following k6 script
// k6 run k6-script.js 