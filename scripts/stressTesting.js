import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '5s', target: 5 },    // Stage 1(5 seconds): Ramp - up to 5 virtual users over 5 seconds.
        { duration: '30s', target: 5 },   // Stage 2 (30 seconds): Stay at 5 virtual users for 30 seconds.
        { duration: '5s', target: 50 },   // Stage 3 (5 seconds): Ramp-up to 50 virtual users over 5 seconds.
        { duration: '30s', target: 50 },  // Stage 4 (30 seconds): Stay at 50 virtual users for 30 seconds.
        { duration: '5s', target: 100 },  // Stage 5 (5 seconds): Ramp-up to 100 virtual users over 5 seconds.
        { duration: '30s', target: 100 }, // Stage 6 (30 seconds): Stay at 100 virtual users for 30 seconds.
        { duration: '5s', target: 300 },  // Stage 7 (5 seconds): Ramp-up to 300 virtual users over 5 seconds.
        { duration: '30s', target: 300 }, // Stage 8 (30 seconds): Stay at 300 virtual users for 30 seconds.
        { duration: '5s', target: 0 },    // Stage 9 (5 seconds): Ramp-down to 0 virtual users over 5 seconds.
    ],
    thresholds: {
        http_req_duration: ['p(95)<1000'], // 95% of requests must complete within 1000ms
        http_req_failed: ['rate<0.1'],     // Request failure rate should be less than 0.1%
    },
};

export default function () {
    var response = http.get('https://localhost:7003/api/Map/GetGeoJSONTile?x=103081&y=140573&z=18&filter=A^Default|MT^Default|BT^Default|P^Default|I^Default|S^Default|vwIP^Default|vwMED^Default|PA^Default|&version=1&activelayer=&activefilter'); // HTTP Get all books

    check(response, {
        'is status 200': (x) => x.status === 200 // An assertion
    });

    sleep(0.1); // Wait for 0.1 second between each request (adjust as needed for higher stress)
}