package com.avaskov.techmadness.domain.repository.interfaces;

import com.avaskov.techmadness.domain.models.User;

public interface LoginRepository {
    User obtainUserData(String login);
}
