package com.avaskov.techmadness.ui.activities;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.ProgressBar;

import androidx.annotation.Nullable;

import com.avaskov.techmadness.R;
import com.avaskov.techmadness.domain.executor.ThreadExecutor;
import com.avaskov.techmadness.domain.repository.UserProfileRepository;
import com.avaskov.techmadness.presentation.controllers.LoginController;
import com.avaskov.techmadness.threading.MainThreadImpl;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;

public class LoginActivity extends Activity {

    @BindView(R.id.user_login_ed)
    EditText loginEditText;

    @BindView(R.id.spin_kit)
    ProgressBar progressBar;

    private LoginController controller;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        ButterKnife.bind(this);

        controller = new LoginController(ThreadExecutor.getInstance(),
                MainThreadImpl.getInstance(),
                this,
                UserProfileRepository.getEntity());

        progressBar.setVisibility(View.GONE);
    }

    public void showMain() {
        Intent intent = new Intent(this, MainActivity.class);
        startActivity(intent);
    }

    @OnClick(R.id.login_btn)
    public void onLoginButtonPressed() {
        progressBar.setVisibility(View.VISIBLE);
        controller.loginPressed(loginEditText.getText().toString());
    }
}
