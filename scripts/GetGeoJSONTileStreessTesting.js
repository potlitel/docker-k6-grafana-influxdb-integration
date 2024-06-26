import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 100 }, 
    { duration: '5m', target: 100 },
    { duration: '2m', target: 200 }, 
    { duration: '5m', target: 200 },
    { duration: '2m', target: 300 }, 
    { duration: '5m', target: 300 },
    { duration: '2m', target: 600 }, 
    { duration: '5m', target: 600 },
    { duration: '10m', target: 0 }, 
  ],
};

export default function () {
  const BASE_URL = 'https://test-api.k6.io';
  const responses = http.batch([
    ['GET', `${BASE_URL}/public/crocodiles/1/`, null, { tags: { name: 'PublicCrocs' } }],
    ['GET', `${BASE_URL}/public/crocodiles/2/`, null, { tags: { name: 'PublicCrocs' } }],
    ['GET', `${BASE_URL}/public/crocodiles/3/`, null, { tags: { name: 'PublicCrocs' } }],
    ['GET', `${BASE_URL}/public/crocodiles/4/`, null, { tags: { name: 'PublicCrocs' } }],
  ]);

  sleep(1);
}
