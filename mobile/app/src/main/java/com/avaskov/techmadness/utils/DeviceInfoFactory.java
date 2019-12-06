package com.avaskov.techmadness.utils;

import android.annotation.SuppressLint;
import android.content.Context;
import android.os.Build;
import android.provider.Settings;
import android.util.DisplayMetrics;
import android.view.WindowManager;

import com.avaskov.techmadness.ui.application.BaseApplication;

import java.util.Locale;

import static android.os.Build.VERSION.SDK_INT;

public class DeviceInfoFactory {

    private final static String ANDROID_OS_NAME = "Android";

    private Context mContext;
    private Locale mLocale;
    private DisplayMetrics mDisplayMetrics;

    public DeviceInfoFactory(Context aContext) {
        mContext = aContext;
        mLocale = Locale.getDefault();
        mDisplayMetrics = new DisplayMetrics();
        WindowManager wm = (WindowManager) mContext.getSystemService(Context.WINDOW_SERVICE); // the results will be higher than using the activity context object or the getWindowManager() shortcut
        if (wm != null) {
            wm.getDefaultDisplay().getRealMetrics(mDisplayMetrics);
        }
    }

    public DeviceInfo getDeviceInfo() {
        return new DeviceInfo(getDeviceId(),
                getPlatformName(),
                getOSVersion(),
                getLocale());
    }

    private String getPlatformName() {
        return ANDROID_OS_NAME;
    }

    private String getOSVersion() {
        return Build.VERSION.RELEASE;
    }

    @SuppressLint("HardwareIds")
    private String getDeviceId() {
        return Settings.Secure.getString(mContext.getContentResolver(), Settings.Secure.ANDROID_ID);
    }

    private String getLocale() {
        String language;
        if ( SDK_INT >= Build.VERSION_CODES.LOLLIPOP ) {
            language = mLocale.toLanguageTag();
        } else {
            language = mLocale.getLanguage() + "-" + mLocale.getCountry();
        }
        return language;
    }


    private int getScreenWidth() {
        return mDisplayMetrics.widthPixels;
    }

    private int getScreenHeight() {
        return mDisplayMetrics.heightPixels;
    }

    public String getBundleId() {
        return mContext.getPackageName();
    }

    public String getAppVersion() {
        return BaseApplication.getAppVersion();
    }
}
