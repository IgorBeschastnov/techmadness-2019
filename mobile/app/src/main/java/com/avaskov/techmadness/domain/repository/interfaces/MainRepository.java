package com.avaskov.techmadness.domain.repository.interfaces;

import com.avaskov.techmadness.domain.models.Offer;
import com.avaskov.techmadness.domain.models.User;

import java.util.List;

public interface MainRepository {
    List<Offer> getOffers();
    User getUser();
    void sendOfferAccepted(Offer offer);
}
