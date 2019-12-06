package com.avaskov.techmadness.utils;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

import java.io.Serializable;

public class CustomStrings implements Serializable {

    private final String mStringKey;

    private final String mStringValue;

    public CustomStrings(final String aStringKey, final String aStringValue) {
        mStringKey = aStringKey;
        mStringValue = aStringValue;
    }

    public String getStringKey() {
        return mStringKey;
    }

    public String getStringValue() {
        return mStringValue;
    }

    @Override
    public boolean equals(final Object aO) {
        if (this == aO) return true;

        if (aO == null || getClass() != aO.getClass()) return false;

        final CustomStrings that = (CustomStrings) aO;

        return new EqualsBuilder()
                .append(mStringKey, that.mStringKey)
                .append(mStringValue, that.mStringValue)
                .isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37)
                .append(mStringKey)
                .append(mStringValue)
                .toHashCode();
    }
}