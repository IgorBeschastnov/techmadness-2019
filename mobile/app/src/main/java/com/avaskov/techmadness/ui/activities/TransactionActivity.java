package com.avaskov.techmadness.ui.activities;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.TextView;

import androidx.annotation.Nullable;

import com.avaskov.techmadness.R;

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

        fromBalanceTextView.setText(String.valueOf(getIntent().getFloatExtra("balance", 0)));
        fromNumberTextView.setText(String.valueOf(intent.getIntExtra("number", 0)));
    }

    @OnClick(R.id.transaction_btn)
    public void transactionPressed() {
        Intent intent = new Intent(this, ResultTransactionActivity.class);

        intent.putExtra("success", true);
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
