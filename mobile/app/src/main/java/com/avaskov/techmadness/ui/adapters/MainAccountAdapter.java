package com.avaskov.techmadness.ui.adapters;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import com.avaskov.techmadness.R;
import com.avaskov.techmadness.domain.models.Account;
import com.avaskov.techmadness.domain.models.Offer;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Locale;

import butterknife.BindView;
import butterknife.ButterKnife;

public class MainAccountAdapter extends RecyclerView.Adapter<MainAccountAdapter.BookmarkViewHolder> {
    private List<Account> offerList = new ArrayList<>();
    private AccountAdapterClickListener mListener;

    public MainAccountAdapter(AccountAdapterClickListener mListener) {
        this.mListener = mListener;
    }

    @Override
    public BookmarkViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.main_account_item, parent, false);
        return new BookmarkViewHolder(view);
    }

    @Override
    public void onBindViewHolder(BookmarkViewHolder holder, int position) {
        holder.bind(offerList.get(position));
        holder.setOnClickListener(aView -> {
            if (mListener != null) {
                mListener.onAccountSelected(offerList.get(position));
            }
        });
    }

    @Override
    public int getItemCount() {
        return offerList.size();
    }

    public void setItems(Collection<Account> accounts) {
        offerList.addAll(accounts);
        notifyDataSetChanged();
    }

    public void clearItems() {
        offerList.clear();
        notifyDataSetChanged();
    }

    public interface AccountAdapterClickListener {
        void onAccountSelected(Account account);
    }


    class BookmarkViewHolder extends RecyclerView.ViewHolder {

        @BindView(R.id.main_account_name_tv)
        TextView title;

        @BindView(R.id.main_account_interesting_tv)
        TextView interesing;

        @BindView(R.id.main_account_balance)
        TextView balance;

        @BindView(R.id.main_account_number_tv)
        TextView number;

        public BookmarkViewHolder(View itemView) {
            super(itemView);

            ButterKnife.bind(this, itemView);
        }

        public void bind(Account account) {
            switch (account.getType()) {
                case CREDIT:
                    title.setText("Кредитный счет");
                    interesing.setText(String.format(Locale.getDefault(), "%.2f %%", account.getInterest()));
                    break;
                case DEPOSIT:
                    title.setText("Сберегательный счет");
                    interesing.setText(String.format(Locale.getDefault(), "%4s %%", account.getInterest()));
                    break;
                case PAYMENT:
                    title.setText("Счет");
                    interesing.setVisibility(View.INVISIBLE);
                    break;
            }

            balance.setText(String.format("%s руб.", account.getBalance()));
            number.setText(String.valueOf(account.getId()));
        }

        void setOnClickListener(View.OnClickListener aListener) {
            itemView.setOnClickListener(aListener);
        }
    }
}