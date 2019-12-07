package com.avaskov.techmadness.domain.models;

public class Transaction {
    private int from_account;
    private int to_account;
    private int amount;

    public Transaction(int from_account, int to_account, int amount) {
        this.from_account = from_account;
        this.to_account = to_account;
        this.amount = amount;
    }

    public int getFrom_account() {
        return from_account;
    }

    public int getTo_account() {
        return to_account;
    }

    public int getAmount() {
        return amount;
    }
}
