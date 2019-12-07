package com.avaskov.kstovohackaton.presentation.presenters.base;

public interface BasePresenter {
    void create();
    void start();
    void resume();
    void pause();
    void stop();
    void destroy();
    void setProgressBarEnabled(boolean aValue);
    void showProgress();
    void hideProgress();
}