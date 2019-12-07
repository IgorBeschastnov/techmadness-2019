package com.avaskov.techmadness.ui.activities;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.RelativeLayout;
import android.widget.TextView;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AlertDialog;

import com.avaskov.techmadness.R;
import com.avaskov.techmadness.domain.executor.ThreadExecutor;
import com.avaskov.techmadness.domain.models.Offer;
import com.avaskov.techmadness.domain.repository.UserProfileRepository;
import com.avaskov.techmadness.presentation.controllers.ResultTransactionController;
import com.avaskov.techmadness.threading.MainThreadImpl;

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

    @BindView(R.id.spin_result)
    ProgressBar progressBar;

    private ResultTransactionController controller;
    private Offer offer;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_result_transaction);
        ButterKnife.bind(this);

        Intent intent = getIntent();

        if (intent.getBooleanExtra("success", false)) {
            indicatorImageView.setBackgroundResource(R.drawable.ic_ok_transaction);
            indicatorTextView.setText("Успешно");
        } else {
            indicatorImageView.setBackgroundResource(R.drawable.ic_close);
            indicatorTextView.setText("Отмена");
        }

        fromTextView.setText(intent.getStringExtra("from"));
        toTextView.setText(intent.getStringExtra("to"));
        sumTextView.setText(intent.getStringExtra("sum"));

        autopayOfferLayout.setVisibility(View.GONE);
        controller = new ResultTransactionController(this,
                ThreadExecutor.getInstance(),
                MainThreadImpl.getInstance(),
                UserProfileRepository.getEntity());

        progressBar.setVisibility(View.GONE);
    }

    public void offerWasAccepted() {
        progressBar.setVisibility(View.GONE);
    }

    public void showOffer(Offer offer) {
        autopayOfferLayout.setVisibility(View.VISIBLE);
        this.offer = offer;
    }

    private void showOfferDialog() {
        AlertDialog.Builder builder = new AlertDialog.Builder(this);

        builder.setMessage("Хотите подключить автоплатеж?");

        builder.setPositiveButton("Хочу!", (dialog, id) -> {
            progressBar.setVisibility(View.VISIBLE);
            controller.offerAccepted(offer);
        });

        builder.setNegativeButton("Скрыть", (dialog, id) -> {
        });

        AlertDialog dialog = builder.create();
        dialog.show();
    }

    @OnClick(R.id.autopay_offer_rl)
    public void offerPressed() {
        showOfferDialog();
    }

    @OnClick(R.id.result_transaction_close_btn)
    public void closeButtonPressed() {
        close();
    }

    @OnClick(R.id.done_btn)
    public void doneButtonPressed() {
        close();
    }

    private void close() {
        progressBar.setVisibility(View.VISIBLE);
        controller.closePressed();
    }
}
