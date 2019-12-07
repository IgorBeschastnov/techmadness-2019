package com.avaskov.techmadness.presentation.controllers;

import com.avaskov.techmadness.domain.executor.Executor;
import com.avaskov.techmadness.domain.models.Offer;
import com.avaskov.techmadness.domain.repository.UserProfileRepository;
import com.avaskov.techmadness.threading.MainThread;
import com.avaskov.techmadness.ui.activities.TransactionActivity;

public class TransactionController {
    private TransactionActivity view;
    private Executor executor;
    private MainThread mainThread;
    private UserProfileRepository userProfileRepository;

    public TransactionController(TransactionActivity view, Executor executor, MainThread mainThread, UserProfileRepository userProfileRepository) {
        this.view = view;
        this.executor = executor;
        this.mainThread = mainThread;
        this.userProfileRepository = userProfileRepository;
    }

    public void sendOfferPressed() {

    }
}
