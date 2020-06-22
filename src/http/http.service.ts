import instance from './axios.config';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SafeAny = any;
export interface Result {
  code: number;
  message: string;
  data: SafeAny;
}

export default class HttpService {
  static getRequestConfig(query: { [key: string]: SafeAny }): AxiosRequestConfig {
    const config = {
      params: query,
    };
    return config;
  }

  static get(url: string, params = {}): Promise<SafeAny> {
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

  static post(url: string, data: SafeAny, params?: SafeAny): Promise<SafeAny> {
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
