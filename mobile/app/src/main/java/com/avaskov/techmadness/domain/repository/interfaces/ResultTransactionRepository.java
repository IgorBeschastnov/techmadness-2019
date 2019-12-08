package com.avaskov.techmadness.domain.repository.interfaces;

import com.avaskov.techmadness.domain.models.Offer;
import com.avaskov.techmadness.domain.models.User;

import java.util.List;

public interface ResultTransactionRepository {
    User obtainUserData(String login);
    void sendOfferAccepted(Offer offer);
    List<Offer> getOffers();
    User getUser();
}
