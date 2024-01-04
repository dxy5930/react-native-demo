import { NativeModules, Platform } from 'react-native';
const { AppInfoModule } = NativeModules;
// 明确告知 TypeScript 对象的结构
interface EnvironmentDictionary {
    [key: string]: string;
}
const { APP_ENV: app_env } = AppInfoModule;
//可按需引入安卓代码AppInfoPackage.java中定义的变量
// @Nullable
// @Override
// // 获取环境
// public Map<String, Object> getConstants() {
//     final Map<String, Object> constants = new HashMap<>();
//     constants.put("APP_ENV", BuildConfig.BUILD_TYPE);
//     constants.put("APPLICATION_ID", BuildConfig.APPLICATION_ID);
//     constants.put("VERSION_CODE", BuildConfig.VERSION_CODE);
//     constants.put("VERSION_NAME", BuildConfig.VERSION_NAME);
//     constants.put("BASE_URL", BuildConfig.BASE_URL);
//     constants.put("IS_HERMES_ENABLED", BuildConfig.IS_HERMES_ENABLED);
//     constants.put("IS_NEW_ARCHITECTURE_ENABLED", BuildConfig.IS_NEW_ARCHITECTURE_ENABLED);
//     return constants;
// }
const envDic: EnvironmentDictionary = Platform.select<EnvironmentDictionary>({
    ios: {
        "1": 'debug',
        "2": 'test',
        "3": 'stage',
        "4": 'production'
    },
    android: {
        debug: 'debug',
        releaseTest: 'test',
        releaseStage: 'stage',
        release: 'production',
    }
}) as EnvironmentDictionary;

const appEnv = envDic[app_env] || 'production';
console.log('当前环境', appEnv);

export default {
    appEnv,
    AppInfoModule,
    isDebug: appEnv === 'debug',
    isTest: appEnv === 'test',
    isStage: appEnv === 'stage',
    isProd: appEnv === 'production',
};
