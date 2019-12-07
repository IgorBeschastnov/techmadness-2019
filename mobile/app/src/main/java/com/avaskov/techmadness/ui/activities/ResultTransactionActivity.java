package com.avaskov.techmadness.ui.activities;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AlertDialog;

import com.avaskov.techmadness.R;
import com.avaskov.techmadness.domain.models.Offer;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;

public class ResultTransactionActivity extends Activity {

    @BindView(R.id.result_transaction_iv)
    ImageView indicatorImageView;

    @BindView(R.id.result_transaction_tv)
    TextView indicatorTextView;

    @BindView(R.id.result_transaction_from_account_tv)
    TextView fromTextView;

    @BindView(R.id.result_transaction_to_account_tv)
    TextView toTextView;

    @BindView(R.id.result_transaction_sum_tv)
    TextView sumTextView;

    @BindView(R.id.autopay_offer_rl)
    RelativeLayout autopayOfferLayout;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_result_transaction);
        ButterKnife.bind(this);

        Intent intent = getIntent();

        if (intent.getBooleanExtra("success", false)) {
            indicatorImageView.setImageResource(R.drawable.ic_ok_transaction);
            indicatorTextView.setText("Успешно");
        } else {
            indicatorImageView.setImageResource(R.drawable.ic_close);
            indicatorTextView.setText("Отмена");
        }

        fromTextView.setText(intent.getStringExtra("from"));
        toTextView.setText(intent.getStringExtra("to"));
        sumTextView.setText(intent.getStringExtra("sum"));

        autopayOfferLayout.setVisibility(View.GONE);
        //controller.obtainOffer(intent.getIntExtra("from", 0));
    }

    public void showOffer(Offer offer) {
        AlertDialog.Builder builder = new AlertDialog.Builder(this);

        builder.setMessage("Хотите подключить: " + offer.getText() + "?");

     //   builder.setPositiveButton("Согласен", (dialog, id) -> controller.offerAccepted(offer));

        builder.setNegativeButton("Скрыть", (dialog, id) -> {
        });

        AlertDialog dialog = builder.create();
        dialog.show();
    }

    @OnClick(R.id.result_transaction_close_btn)
    public void closeButtonPressed() {
        finish();
    }

    @OnClick(R.id.done_btn)
    public void doneButtonPressed() {
        finish();
    }
}
