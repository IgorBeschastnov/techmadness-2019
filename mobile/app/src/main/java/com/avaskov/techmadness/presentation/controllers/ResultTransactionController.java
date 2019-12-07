package com.avaskov.techmadness.presentation.controllers;

import com.avaskov.techmadness.domain.executor.Executor;
import com.avaskov.techmadness.domain.models.Offer;
import com.avaskov.techmadness.domain.repository.interfaces.ResultTransactionRepository;
import com.avaskov.techmadness.threading.MainThread;
import com.avaskov.techmadness.ui.activities.ResultTransactionActivity;

import java.util.List;
import java.util.Objects;

public class ResultTransactionController {
    private ResultTransactionActivity view;
    private Executor executor;
    private MainThread mainThread;
    private ResultTransactionRepository resultTransactionRepository;

    public ResultTransactionController(ResultTransactionActivity view,
                                       Executor executor,
                                       MainThread mainThread,
                                       ResultTransactionRepository resultTransactionRepository) {
        this.view = view;
        this.executor = executor;
        this.mainThread = mainThread;
        this.resultTransactionRepository = resultTransactionRepository;
    }

    public void obtainOffer(String to) {
        executor.execute(() -> {
            List<Offer> offers = resultTransactionRepository.getOffers();
            for (Offer offer : offers) {
                if (Objects.equals(offer.getData().get("to_account"), to)) {
                    mainThread.post(() -> view.showOffer(offer));
                }
            }
        });
    }

    public void closePressed() {
        executor.execute(() -> {
            resultTransactionRepository.obtainUserData(String.valueOf(resultTransactionRepository.getUser().getId()));
            view.finish();
        });
    }

    public void offerAccepted(Offer offer) {
        executor.execute(() -> {
            resultTransactionRepository.sendOfferAccepted(offer);
            mainThread.post(() -> view.offerWasAccepted());
        });
    }
}
