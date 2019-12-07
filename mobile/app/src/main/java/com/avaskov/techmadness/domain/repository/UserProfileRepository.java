package com.avaskov.techmadness.domain.repository;

import com.avaskov.techmadness.domain.models.Account;
import com.avaskov.techmadness.domain.models.AccountType;
import com.avaskov.techmadness.domain.models.Offer;
import com.avaskov.techmadness.domain.models.OfferType;
import com.avaskov.techmadness.domain.models.User;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class UserProfileRepository {
    private static UserProfileRepository entity;

    private User user;
    private List<Offer> offers;

    static public UserProfileRepository getEntity() {
        if (entity == null) {
            entity = new UserProfileRepository();
        }
        return entity;
    }

    private UserProfileRepository() {
        this.user = new User(1, "default", "default", new ArrayList<>());
        user.getAccounts().add(new Account(1111222344,"account_1", 1116.78f, 0.12, AccountType.CREDIT));
        user.getAccounts().add(new Account(1222222344,"account_2", 1516.76f, 0.02, AccountType.DEPOSIT));
        user.getAccounts().add(new Account(1333222344,"account_3", 15116.38f, 0.12, AccountType.PAYMENT));
        user.getAccounts().add(new Account(1444222344,"account_4", 11166.88f, 0.16, AccountType.CREDIT));
        this.offers = new ArrayList<>();
        offers.add(new Offer(1, OfferType.CREDIT, "credit_1", new HashMap<>(), 1, ""));
        offers.add(new Offer(2, OfferType.CREDIT, "credit_2", new HashMap<>(), 1, ""));
        offers.add(new Offer(3, OfferType.DEPOSIT, "deposit_1", new HashMap<>(), 1, ""));
        offers.add(new Offer(4, OfferType.CREDIT, "credit_3", new HashMap<>(), 1, ""));
        offers.add(new Offer(5, OfferType.CREDIT, "credit_4", new HashMap<>(), 1, ""));
        offers.add(new Offer(6, OfferType.DEPOSIT, "deposit_2", new HashMap<>(), 1, ""));
        offers.add(new Offer(7, OfferType.IMPORTANTDATE, "birthday_2", new HashMap<>(), 1, ""));
    }

    public User obtainUserData(String login) {
        return user;
    }

    public User getUser() {
        return user;
    }

    public List<Offer> getOffers() {
        return offers;
    }
}
