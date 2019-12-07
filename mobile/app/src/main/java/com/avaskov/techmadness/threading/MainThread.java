package com.avaskov.techmadness.threading;

public interface MainThread {
    void post(final Runnable runnable);
}
