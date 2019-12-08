package com.avaskov.techmadness.domain.repository;

import com.avaskov.techmadness.domain.models.Offer;
import com.avaskov.techmadness.domain.models.OfferType;
import com.avaskov.techmadness.domain.models.Transaction;
import com.avaskov.techmadness.domain.models.User;
import com.avaskov.techmadness.domain.repository.interfaces.LoginRepository;
import com.avaskov.techmadness.domain.repository.interfaces.MainRepository;
import com.avaskov.techmadness.domain.repository.interfaces.ResultTransactionRepository;
import com.avaskov.techmadness.domain.repository.interfaces.TransactionRepository;
import com.google.gson.Gson;

import java.util.ArrayList;
import java.util.List;

public class UserProfileRepository implements MainRepository, LoginRepository, ResultTransactionRepository, TransactionRepository {
    private static UserProfileRepository entity;

    private User user;
    private List<Offer> offers;

    private UserProfileRepository() {
//        this.user = new User(1, "default", "default", new ArrayList<>());
//        user.getAccounts().add(new Account(1111222344,"account_1", 1116.78f, 0.12, AccountType.CREDIT));
//        user.getAccounts().add(new Account(1222222344,"account_2", 1516.76f, 0.02, AccountType.DEPOSIT));
//        user.getAccounts().add(new Account(1333222344,"account_3", 15116.38f, 0.12, AccountType.PAYMENT));
//        user.getAccounts().add(new Account(1444222344,"account_4", 11166.88f, 0.16, AccountType.CREDIT));
        this.offers = new ArrayList<>();
        offers.add(new Offer(1, 1, OfferType.CREDIT, "credit_1", 1, ""));
        offers.add(new Offer(2, 2, OfferType.CREDIT, "credit_2", 1, ""));
        offers.add(new Offer(3, 3, OfferType.DEPOSIT, "deposit_1", 1, ""));
        offers.add(new Offer(4, 4, OfferType.CREDIT, "credit_3", 1, ""));
        offers.add(new Offer(5, 5, OfferType.CREDIT, "credit_4", 1, ""));
        offers.add(new Offer(6, 6, OfferType.DEPOSIT, "deposit_2", 1, ""));
        offers.add(new Offer(7, 7, OfferType.IMPORTANT_DATE, "birthday_2", 1, ""));
    }

    static public UserProfileRepository getEntity() {
        if (entity == null) {
            entity = new UserProfileRepository();
        }
        return entity;
    }

    public User obtainUserData(String login) {
        user = RequestService.getRequestForOneEntity("users/" + login, User.class);
        offers = RequestService.getRequest("offers?user_id=" + user.getId(), Offer.class);
        return user;
    }

    public User getUser() {
        return user;
    }

    public List<Offer> getOffers() {
        return offers;
    }

    public boolean sendTransaction(Transaction transaction) {
        Gson gson = new Gson();
        return RequestService.postRequest(gson.toJson(transaction, Transaction.class), "transactions");
    }

    public void sendOfferAccepted(Offer offer) {
        RequestService.postRequest("", "offers/accept/" + offer.getId());
    }
}
