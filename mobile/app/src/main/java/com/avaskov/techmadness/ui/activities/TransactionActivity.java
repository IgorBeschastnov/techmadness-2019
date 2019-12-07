package com.avaskov.techmadness.ui.activities;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.widget.EditText;
import android.widget.TextView;

import androidx.annotation.Nullable;

import com.avaskov.techmadness.R;
import com.avaskov.techmadness.domain.executor.ThreadExecutor;
import com.avaskov.techmadness.domain.repository.UserProfileRepository;
import com.avaskov.techmadness.presentation.controllers.TransactionController;
import com.avaskov.techmadness.threading.MainThreadImpl;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;

public class TransactionActivity extends Activity {

    @BindView(R.id.from_account_tv)
    TextView fromNameTextView;

    @BindView(R.id.from_account_current_tv)
    TextView fromNumberTextView;

    @BindView(R.id.from_account_balance_tv)
    TextView fromBalanceTextView;

    @BindView(R.id.to_account_current_et)
    TextView toNumberTextView;

    @BindView(R.id.sum_of_transaction_et)
    EditText sumOfTransaction;

    private TransactionController controller;

    @SuppressLint("SetTextI18n")
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_transaction);
        ButterKnife.bind(this);

        Intent intent = getIntent();

        switch (intent.getIntExtra("type", 2)) {
            case 0:
                fromNameTextView.setText("Кредитный счет");
                break;
            case 1:
                fromNameTextView.setText("Сберегательный счет");
                break;
            case 2:
                fromNameTextView.setText("Счет");
                break;
        }

        fromBalanceTextView.setText(String.valueOf(getIntent().getIntExtra("balance", 0)));
        fromNumberTextView.setText(String.valueOf(intent.getIntExtra("number", 0)));

        controller = new TransactionController(this,
                ThreadExecutor.getInstance(),
                MainThreadImpl.getInstance(),
                UserProfileRepository.getEntity());

        toNumberTextView.setText("12");
    }

    public void showError() {
        showResult(false);
    }

    public void showSuccess() {
        showResult(true);
    }

    @OnClick(R.id.transaction_btn)
    public void transactionPressed() {
        try {
            if (!fromNumberTextView.getText().toString().isEmpty() ||
                    !toNumberTextView.getText().toString().isEmpty() ||
            Integer.parseInt(sumOfTransaction.getText().toString()) > Integer.parseInt(fromBalanceTextView.getText().toString())) {
                controller.sendOfferPressed(fromNumberTextView.getText().toString(),
                        toNumberTextView.getText().toString(),
                        sumOfTransaction.getText().toString());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void showResult(boolean isSuccess) {
        Intent intent = new Intent(this, ResultTransactionActivity.class);

        intent.putExtra("success", isSuccess);
        intent.putExtra("from", fromNumberTextView.getText().toString());
        intent.putExtra("to", toNumberTextView.getText().toString());
        intent.putExtra("sum", sumOfTransaction.getText().toString());

        startActivity(intent);
    }

    @OnClick(R.id.transaction_close_btn)
    public void closePressed() {
        finish();
    }
}
