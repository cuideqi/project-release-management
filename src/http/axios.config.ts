import axios, { AxiosInstance, AxiosResponse } from "axios";
import { Modal } from 'antd';
import { Result } from "./http.service";
const host = window.location.host;
const systemURL = window.location.protocol + '//' + host;

const axiosInstance: AxiosInstance = axios.create({
    baseURL: systemURL + '/f2',
    timeout: 5000,
});
let modal: any = null;
axiosInstance.interceptors.response.use((data: AxiosResponse<Result>) => data, () => {
    if (!modal) {
        modal = Modal.warning({
            title: '请求错误',
            content: '请刷新页面或稍后再试',
            onOk: () => {
                modal = null;
            }
        });
    }
});


export default axiosInstance;