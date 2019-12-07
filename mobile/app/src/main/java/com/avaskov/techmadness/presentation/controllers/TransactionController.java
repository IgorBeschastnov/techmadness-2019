package com.avaskov.techmadness.presentation.controllers;

import com.avaskov.techmadness.domain.executor.Executor;
import com.avaskov.techmadness.domain.models.Offer;
import com.avaskov.techmadness.domain.models.Transaction;
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

    public void sendOfferPressed(String from, String to, String sum) {
        executor.execute(() -> {
            try {
                Transaction transaction = new Transaction(Integer.parseInt(from),
                        Integer.parseInt(to),
                        Integer.parseInt(sum));
                if (userProfileRepository.sendTransaction(transaction)) {
                    mainThread.post(() -> view.showSuccess());
                } else {
                    mainThread.post(() -> view.showError());
                }
            } catch (Exception e) {
                mainThread.post(() -> view.showError());
            }
        });
    }
}
