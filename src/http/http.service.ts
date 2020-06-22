import instance from './axios.config';
import { AxiosResponse, AxiosRequestConfig } from 'axios';

export interface Result {
  code: number;
  message: string;
  data: any;
}

export default class HttpService {
  static getRequestConfig(query: { [key: string]: any }): AxiosRequestConfig {
    let config = {
      params: query,
    };
    return config;
  }

  static get(url: string, params = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      instance
        .get(url, this.getRequestConfig(params))
        .then((res: AxiosResponse<Result>) => {
          if (res.data.code === 0) {
            resolve(res.data.data);
          } else {
            reject(res.data);
          }
        })
        .catch(err => {
          reject({ err: JSON.stringify(err) });
        });
    });
  }

  static post(url: string, data: any, params?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      instance
        .post(url, data, this.getRequestConfig(params))
        .then((res: AxiosResponse<Result>) => {
          if (res.data.code === 0) {
            resolve(res.data.data);
          } else {
            reject(res.data);
          }
        })
        .catch(err => {
          reject({ err: JSON.stringify(err) });
        });
    });
  }
}
