export function log(target, name, descriptor) {
    const original = descriptor.value;
    console.log(name)
    descriptor.value = function (...args) {
        try {
            return original.apply(this, args);
        } catch (error) {
            console.error(`Function ${name} crashed with error: ${error}`);
            // 这里可以选择将错误信息记录到日志文件或者发送到远程日志服务器
            throw error; // 重新抛出错误，以便上层代码能够继续处理
        }
    };
    return descriptor;
}