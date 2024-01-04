import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import qs from 'qs';
import { ApiResponse } from '../common/types/index';


const request: AxiosInstance = axios.create({
    baseURL: 'https://api.xygeng.cn', // API 请求的默认前缀，可根据环境变量自行配置
    timeout: 60000, // 请求超时时间
});

// 异常拦截处理器
const errorHandler = (error: AxiosError) => {
    if (error.response) {
        switch (error.response.status) {
            case 401:
                // 登录过期错误处理
                break;
            case 500:
                // 服务器错误处理
                break;
            default:
        }
    }
    return Promise.reject(error);
};

// request interceptor
request.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    /**
     * 如果token 存在，则给请求头加token
     */
    const token = '1111';
    if (token) {
        config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    }

    // qs是axios自带的序列化参数方式
    if (config.headers && config.headers["Content-Type"] && config.headers["Content-Type"] === "application/x-www-form-urlencoded") {
        config.params = qs.stringify(config.params);
    }
    return config;
}, errorHandler);

// response interceptor
request.interceptors.response.use((response: AxiosResponse) => {


    return response.data;
}, errorHandler);

export default request;

