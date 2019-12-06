package com.avaskov.techmadness.utils;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

import java.io.Serializable;

public class DeviceInfo implements Serializable {

    private final String mDeviceId;
    private final String mPlatform;
    private final String mOSVersion;
    private final String mLocale;

    DeviceInfo(String aDeviceId, String aPlatform, String aOSVersion, String aLocale) {
        mDeviceId = aDeviceId;
        mPlatform = aPlatform;
        mOSVersion = aOSVersion;
        mLocale = aLocale;
    }

    public String getOSVersion() {
        return mOSVersion;
    }

    public String getLocale() {
        return mLocale;
    }

    public String getDeviceId() {
        return mDeviceId;
    }

    public String getPlatform() {
        return mPlatform;
    }

    @Override
    public boolean equals(final Object aO) {
        if (this == aO) return true;

        if (aO == null || getClass() != aO.getClass()) return false;

        final DeviceInfo that = (DeviceInfo) aO;

        return new EqualsBuilder()
                .append(mDeviceId, that.mDeviceId)
                .append(mPlatform, that.mPlatform)
                .append(mOSVersion, that.mOSVersion)
                .append(mLocale, that.mLocale)
                .isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37)
                .append(mDeviceId)
                .append(mPlatform)
                .append(mOSVersion)
                .append(mLocale)
                .toHashCode();
    }
}