package com.avaskov.techmadness.domain.models;

public class Account {
    private int id;
    private String name;
    private float balance;
    private double interest;
    private AccountType type;

    public Account(int id, String name, float balance, double interest, AccountType type) {
        this.id = id;
        this.name = name;
        this.balance = balance;
        this.interest = interest;
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public float getBalance() {
        return balance;
    }

    public double getInterest() {
        return interest;
    }

    public AccountType getType() {
        return type;
    }

    public int getId() {
        return id;
    }
}
