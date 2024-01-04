package com.reactnativedemo.modules;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.reactnativedemo.BuildConfig;

import java.util.HashMap;
import java.util.Map;

public class AppInfoPackage extends ReactContextBaseJavaModule {

    public AppInfoPackage(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "AppInfoModule";
    }

    @Nullable
    @Override
    // 获取环境
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("APP_ENV", BuildConfig.BUILD_TYPE);
        constants.put("APPLICATION_ID", BuildConfig.APPLICATION_ID);
        constants.put("VERSION_CODE", BuildConfig.VERSION_CODE);
        constants.put("VERSION_NAME", BuildConfig.VERSION_NAME);
        constants.put("IS_HERMES_ENABLED", BuildConfig.IS_HERMES_ENABLED);
        constants.put("IS_NEW_ARCHITECTURE_ENABLED", BuildConfig.IS_NEW_ARCHITECTURE_ENABLED);
        return constants;
    }
}
