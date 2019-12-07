package com.avaskov.techmadness.domain.repository;

import com.avaskov.techmadness.domain.models.User;

import java.util.ArrayList;

public class UserProfileRepository {
    private User user;

    public UserProfileRepository() {
        this.user = new User("default", "default", new ArrayList<>());
    }

    public User obtainUserData(String login) {
        return user;
    }

    public User getUser() {
        return user;
    }
}
