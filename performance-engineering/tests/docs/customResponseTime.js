import { Trend } from 'k6/metrics';

const uptimeTrendCheck = new Trend('/GET API uptime');
const todoCreationTrend = new Trend('/POST Create a todo');


export let options = {
   stages: [
       { duration: '0.5m', target: 3 }, // simulate ramp-up of traffic from 0 to 3Vus
   ],
};

export default function () {
   group('API uptime check', () => {
       const response = http.get('https://todo-app-barkend.herokuapp.com/todos/');
       uptimeTrendCheck.add(response.timings.duration);
       check(response, {
           "status code should be 200": res => res.status === 200,
       });
   });
}