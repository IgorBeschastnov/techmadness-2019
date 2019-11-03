package com.avaskov.kstovohackaton.ui.application;

import android.app.Application;
import android.util.Log;

import com.avaskov.kstovohackaton.BuildConfig;

public class BaseApplication extends Application {
    private static final String TAG = BaseApplication.class.getName();

    private static volatile BaseApplication sApplication;

    public static String getAppVersion() {
        return BuildConfig.VERSION_NAME + "(" + BuildConfig.VERSION_CODE + ")" + BuildConfig.BUILD_TYPE;
    }

    public static BaseApplication getInstance() {
        return sApplication;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        sApplication = this;
    }
}
