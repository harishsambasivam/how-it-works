import http from 'k6/http';

export const options = {
    duration: "30s",
    vus: 50,
}

const params = {
  timeout: '240s'
};

const url = "http://localhost:3000/user/create";

export default () => {
  const res = http.get(url,params);
  console.log(JSON.stringify(res.body,null,2));
};

