package com.avaskov.techmadness.domain.models;

import java.util.List;

public class User {
    private int id;
    private String login;
    private String address;
    private List<Account> accounts;

    public User(int id, String login, String address, List<Account> accounts) {
        this.id = id;
        this.login = login;
        this.address = address;
        this.accounts = accounts;
    }

    public int getId() {
        return id;
    }

    public String getLogin() {
        return login;
    }

    public String getAddress() {
        return address;
    }

    public List<Account> getAccounts() {
        return accounts;
    }
}
