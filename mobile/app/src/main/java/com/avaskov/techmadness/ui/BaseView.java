package com.avaskov.techmadness.ui;

public interface BaseView {
    void showProgress();
    void hideProgress();

    void showMessage(String message);
    void showMessage(Integer stringID);

    void finishActivity();
    void logout();
}
