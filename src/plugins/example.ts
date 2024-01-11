// 一个简单的Metro插件示例
function simplePlugin(context) {
    return {
        transform({ src, filename, options }) {
            // 在控制台输出文件名和代码
            console.log(`Transforming file ${filename}:`);
            console.log(src);
            // 返回转换后的代码
            return src;
        },
        // 可选的getCacheKey方法，用于缓存
        getCacheKey() {
            // 返回一个唯一的标识符，用于缓存
            return 'simplePlugin';
        }
    };
}

module.exports = simplePlugin;