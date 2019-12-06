package com.avaskov.techmadness.utils;

import com.securepreferences.SecurePreferences;
import com.avaskov.techmadness.ui.application.BaseApplication;

public class SecuredSharedPreferences extends SecurePreferences {

    private static volatile SecuredSharedPreferences sInstance;

    public SecuredSharedPreferences() {
        super(BaseApplication.getInstance().getApplicationContext());
    }

    public static SecurePreferences getInstance() {
        if (sInstance == null) {
            sInstance = new SecuredSharedPreferences();
        }

        return sInstance;
    }

}