package com.avaskov.kstovohackaton.domain.executor;

public interface MainThread {

    void post(final Runnable runnable);
}
