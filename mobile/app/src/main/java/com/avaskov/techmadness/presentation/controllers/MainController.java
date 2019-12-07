package com.avaskov.techmadness.presentation.controllers;

import com.avaskov.techmadness.domain.executor.Executor;
import com.avaskov.techmadness.domain.models.Offer;
import com.avaskov.techmadness.domain.models.OfferType;
import com.avaskov.techmadness.domain.models.User;
import com.avaskov.techmadness.domain.repository.UserProfileRepository;
import com.avaskov.techmadness.threading.MainThread;
import com.avaskov.techmadness.ui.activities.MainActivity;

import java.util.ArrayList;
import java.util.List;

public class MainController {
    private MainActivity view;
    private Executor executor;
    private MainThread mainThread;
    private UserProfileRepository userProfileRepository;

    public MainController(MainActivity view, Executor executor, MainThread mainThread, UserProfileRepository userProfileRepository) {
        this.view = view;
        this.executor = executor;
        this.mainThread = mainThread;
        this.userProfileRepository = userProfileRepository;
    }

    public void obtainOffers() {
        executor.execute(() -> {
            List<Offer> offers = userProfileRepository.getOffers();
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
                if (offer.getType().equals(OfferType.CREDIT) || offer.getType().equals(OfferType.DEPOSIT)) {
                    creditDepositOffersList.add(offer);
                }
            }
            mainThread.post(() -> view.showCreditDepositOffers(creditDepositOffersList));

            User user = userProfileRepository.getUser();

            mainThread.post(() -> view.showAccounts(user.getAccounts()));
        });
    }

    public void offerAccepted(Offer offer) {

    }
}
