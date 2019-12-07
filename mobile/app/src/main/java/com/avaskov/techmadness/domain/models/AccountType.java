package com.avaskov.techmadness.domain.models;

import com.google.gson.annotations.SerializedName;

public enum AccountType {
    @SerializedName("1")
    CREDIT,

    @SerializedName("2")
    DEPOSIT,

    @SerializedName("3")
    PAYMENT
}
