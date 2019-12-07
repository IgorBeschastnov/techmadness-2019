package com.avaskov.techmadness.domain.models;

import com.google.gson.annotations.SerializedName;

public enum OfferType {
    @SerializedName("1")
    CREDIT,

    @SerializedName("2")
    DEPOSIT,

    @SerializedName("3")
    AUTOTRANSACTION,

    @SerializedName("4")
    IMPORTANT_DATE,

    @SerializedName("5")
    CAR,

    @SerializedName("6")
    MORTGAGE,

    @SerializedName("7")
    INSURANCE,

    @SerializedName("8")
    INVESTMENTS
}
