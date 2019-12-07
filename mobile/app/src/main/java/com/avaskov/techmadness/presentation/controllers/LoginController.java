package com.avaskov.techmadness.presentation.controllers;

import com.avaskov.techmadness.domain.executor.Executor;
import com.avaskov.techmadness.domain.models.User;
import com.avaskov.techmadness.domain.repository.UserProfileRepository;
import com.avaskov.techmadness.threading.MainThread;
import com.avaskov.techmadness.ui.activities.LoginActivity;

public class LoginController {
    private Executor executor;
    private MainThread mainThread;
    private LoginActivity view;
    private UserProfileRepository userProfileRepository;

    public LoginController(Executor executor,
                           MainThread mainThread,
                           LoginActivity view,
                           UserProfileRepository userProfileRepository) {
        this.executor = executor;
        this.mainThread = mainThread;
        this.view = view;
        this.userProfileRepository = userProfileRepository;
    }

    public void loginPressed(String login) {
        executor.execute(() -> {
            User user = userProfileRepository.obtainUserData(login);
            if (user != null) {
                mainThread.post(() -> view.showMain());
            } else {
                mainThread.post(() -> view.showError());
            }
        });
    }
}
