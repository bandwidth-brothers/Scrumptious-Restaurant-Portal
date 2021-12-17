
const base_url = 'http://dualstack.application-load-balancer-1001380647.us-east-1.elb.amazonaws.com';


export const environment = {
  production: false,
  LOGIN_URL: base_url + '/login',
  BASE_RESTAURANT_URL: base_url,
};

// export const environment = {
//     production: false,
//     LOGIN_URL: 'http://localhost:8000/login',
//     BASE_RESTAURANT_URL: 'http://localhost:8010',
//   };