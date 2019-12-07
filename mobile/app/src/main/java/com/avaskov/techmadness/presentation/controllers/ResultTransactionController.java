package com.avaskov.techmadness.presentation.controllers;

import com.avaskov.techmadness.domain.executor.Executor;
import com.avaskov.techmadness.domain.models.Offer;
import com.avaskov.techmadness.domain.repository.UserProfileRepository;
import com.avaskov.techmadness.threading.MainThread;
import com.avaskov.techmadness.ui.activities.ResultTransactionActivity;

import java.util.List;

public class ResultTransactionController {
    private ResultTransactionActivity view;
    private Executor executor;
    private MainThread mainThread;
    private UserProfileRepository userProfileRepository;

    public ResultTransactionController(ResultTransactionActivity view, Executor executor, MainThread mainThread, UserProfileRepository userProfileRepository) {
        this.view = view;
        this.executor = executor;
        this.mainThread = mainThread;
        this.userProfileRepository = userProfileRepository;
    }

    public void obtainOffer(String to) {
        executor.execute(() -> {
            List<Offer> offers = userProfileRepository.getOffers();
            for (Offer offer : offers) {
                if (offer.getData().get("to_account").equals(to)) {
                    mainThread.post(() -> view.showOffer(offer));
                }
            }
        });
    }

    public void closePressed() {
        executor.execute(() -> {
            userProfileRepository.obtainUserData(String.valueOf(userProfileRepository.getUser().getId()));
            view.finish();
        });
    }

    public void offerAccepted(Offer offer) {
        executor.execute(() -> {
            userProfileRepository.sendOfferAccepted(offer);
            mainThread.post(() -> view.offerWasAccepted());
        });
    }
}
