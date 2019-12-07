package com.avaskov.techmadness.presentation.services;

public class ProgressHUDTrackingService {
    private static final ProgressHUDTrackingService sInstance = new ProgressHUDTrackingService();

    private Integer mTrackedCount = 0;

    public static ProgressHUDTrackingService getInstance() { return sInstance; }

    private ProgressHUDTrackingService() { mTrackedCount = 0; }

    public void addTracking() { mTrackedCount++; }
    public void removeTracking() {
        if (mTrackedCount > 0) {
            mTrackedCount--;
        }
    }

    public boolean canHide() { return mTrackedCount == 0; }
}
