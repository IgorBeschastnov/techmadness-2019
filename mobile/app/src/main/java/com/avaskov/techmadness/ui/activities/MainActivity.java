package com.avaskov.techmadness.ui.activities;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.RelativeLayout;
import android.widget.TextView;

import androidx.appcompat.app.AlertDialog;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.avaskov.techmadness.R;
import com.avaskov.techmadness.domain.executor.ThreadExecutor;
import com.avaskov.techmadness.domain.models.Account;
import com.avaskov.techmadness.domain.models.Offer;
import com.avaskov.techmadness.domain.repository.UserProfileRepository;
import com.avaskov.techmadness.presentation.controllers.MainController;
import com.avaskov.techmadness.threading.MainThreadImpl;
import com.avaskov.techmadness.ui.adapters.MainAccountAdapter;
import com.avaskov.techmadness.ui.adapters.MainOfferAdapter;

import java.util.List;

import butterknife.BindView;
import butterknife.ButterKnife;

public class MainActivity extends Activity {

    @BindView(R.id.main_offer_recycler_view)
    RecyclerView recyclerView;

    @BindView(R.id.main_accounts_recycler_view)
    RecyclerView accountsRecyclerView;

    @BindView(R.id.birthday_offer_rl)
    RelativeLayout birthdayLayout;

    @BindView(R.id.birthday_offer_tv)
    TextView birthdayDescription;

    private Offer dateOffer;
    private MainOfferAdapter offersAdapter;
    private MainAccountAdapter mainAccountAdapter;
    private MainController controller;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        ButterKnife.bind(this);

        controller = new MainController(this,
                ThreadExecutor.getInstance(),
                MainThreadImpl.getInstance(),
                UserProfileRepository.getEntity());

        LinearLayoutManager layoutManager
                = new LinearLayoutManager(this, LinearLayoutManager.HORIZONTAL, false);

        recyclerView.setLayoutManager(layoutManager);
        offersAdapter = new MainOfferAdapter(this::showOffer);
        recyclerView.setAdapter(offersAdapter);

        accountsRecyclerView.setLayoutManager(new LinearLayoutManager(this));
        mainAccountAdapter = new MainAccountAdapter(this::showTransaction);
        accountsRecyclerView.setAdapter(mainAccountAdapter);

        controller.obtainOffers();

        birthdayLayout.setGravity(View.GONE);
        birthdayLayout.setOnClickListener((view) -> showImportantDate(dateOffer));
    }

    public void showDate(Offer dateOffer) {
        birthdayLayout.setVisibility(View.VISIBLE);
        this.dateOffer = dateOffer;
        birthdayDescription.setText(dateOffer.getText());
    }

    public void showCreditDepositOffers(List<Offer> offers) {
        offersAdapter.setItems(offers);
    }

    public void showAccounts(List<Account> accounts) {
        mainAccountAdapter.setItems(accounts);
    }

    public void showOffer(Offer offer) {
        AlertDialog.Builder builder = new AlertDialog.Builder(this);

        builder.setMessage("Хотите подключить: " + offer.getText() + "?");

        builder.setPositiveButton("Согласен", (dialog, id) -> controller.offerAccepted(offer));

        builder.setNegativeButton("Скрыть", (dialog, id) -> {
        });

        AlertDialog dialog = builder.create();
        dialog.show();
    }

    public void showImportantDate(Offer offer) {

    }

    public void showTransaction(Account account) {
        //Intent intent = new Intent()
    }
}
