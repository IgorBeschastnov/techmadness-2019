package com.avaskov.techmadness.presentation.controllers;

import com.avaskov.techmadness.domain.executor.Executor;
import com.avaskov.techmadness.domain.models.Offer;
import com.avaskov.techmadness.domain.models.OfferType;
import com.avaskov.techmadness.domain.models.User;
import com.avaskov.techmadness.domain.repository.interfaces.MainRepository;
import com.avaskov.techmadness.threading.MainThread;
import com.avaskov.techmadness.ui.activities.MainActivity;

import java.util.ArrayList;
import java.util.List;

public class MainController {
    private MainActivity view;
    private Executor executor;
    private MainThread mainThread;
    private MainRepository mainRepository;

    public MainController(MainActivity view,
                          Executor executor,
                          MainThread mainThread,
                          MainRepository mainRepository) {
        this.view = view;
        this.executor = executor;
        this.mainThread = mainThread;
        this.mainRepository = mainRepository;
    }

    public void obtainOffers() {
        executor.execute(() -> {
            List<Offer> offers = mainRepository.getOffers();

            Offer importantDate = null;
            for (Offer offer : offers) {
                if (offer.getType().equals(OfferType.IMPORTANT_DATE)) {
                    importantDate = offer;
                    break;
                }
            }
            if (importantDate != null) {
                Offer finalImportantDate = importantDate;
                mainThread.post(() -> view.showDate(finalImportantDate));
            }

            List<Offer> creditDepositOffersList = new ArrayList<>();
            for (Offer offer : offers) {
                if (offer.getType().equals(OfferType.CREDIT) ||
                        offer.getType().equals(OfferType.DEPOSIT) ||
                        offer.getType().equals(OfferType.MORTGAGE) ||
                        offer.getType().equals(OfferType.CAR) ||
                        offer.getType().equals(OfferType.INSURANCE) ||
                        offer.getType().equals(OfferType.INVESTMENTS)) {
                    creditDepositOffersList.add(offer);
                }
            }
            mainThread.post(() -> view.showCreditDepositOffers(creditDepositOffersList));

            User user = mainRepository.getUser();

            mainThread.post(() -> view.showAccounts(user.getAccounts()));
        });
    }

    public void offerAccepted(Offer offer) {
        executor.execute(() -> {
            mainRepository.sendOfferAccepted(offer);
            obtainOffers();
        });
    }
}
