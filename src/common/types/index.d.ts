declare interface ApiResponse<T> {
    code: number, // 请求code值
    data: T, // 请求的data
    msg: string, // 请求返回的提示文字
    [propName: string]: any
}