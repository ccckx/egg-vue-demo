import axios from 'axios';

const baseUrl = process.env.NODE_ENV === 'production' ? '/api/index' : 'http://127.0.0.1:7001/api/index'
let httpService = axios.create({
  timeout:5000
})

export function get(url,params={}){
  return new Promise((resolve,reject) => {
      httpService({
          url: baseUrl + url,
          method:'get',
          params:params
      }).then(res => {
          resolve(res);
      }).catch(err => {
          reject(err);
      })
  })
}

export default httpService