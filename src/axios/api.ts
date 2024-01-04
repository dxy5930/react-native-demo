import request from "./index";
import { xxxParams } from './interface/demo'
import { ApiResponse } from '../common/types/index'

export function getData<U>(): Promise<ApiResponse<U>> {
    return request.request({
        url: `/one`,
        method: "POST",
    });
}    