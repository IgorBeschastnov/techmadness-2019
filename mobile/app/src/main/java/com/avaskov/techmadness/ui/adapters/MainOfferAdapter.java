package com.avaskov.techmadness.ui.adapters;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import com.avaskov.techmadness.R;
import com.avaskov.techmadness.domain.models.Offer;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import butterknife.BindView;
import butterknife.ButterKnife;

public class MainOfferAdapter extends RecyclerView.Adapter<MainOfferAdapter.BookmarkViewHolder> {
    private List<Offer> offerList = new ArrayList<>();
    private CreditDebetAdapterClickListener mListener;

    public MainOfferAdapter(CreditDebetAdapterClickListener mListener) {
        this.mListener = mListener;
    }

    @Override
    public BookmarkViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.main_offer_item, parent, false);
        return new BookmarkViewHolder(view);
    }

    @Override
    public void onBindViewHolder(BookmarkViewHolder holder, int position) {
        holder.bind(offerList.get(position));
        holder.setOnClickListener(aView -> {
            if (mListener != null) {
                mListener.onOfferSelected(offerList.get(position));
            }
        });
    }

    @Override
    public int getItemCount() {
        return offerList.size();
    }

    public void setItems(Collection<Offer> tweets) {
        clearItems();
        offerList.addAll(tweets);
        notifyDataSetChanged();
    }

    public void clearItems() {
        offerList.clear();
        notifyDataSetChanged();
    }

    public interface CreditDebetAdapterClickListener {
        void onOfferSelected(Offer offer);
    }

    class BookmarkViewHolder extends RecyclerView.ViewHolder {

        @BindView(R.id.offer_title_tv)
        TextView categoryInfo;

        @BindView(R.id.offer_ll)
        LinearLayout layout;

        public BookmarkViewHolder(View itemView) {
            super(itemView);

            ButterKnife.bind(this, itemView);
        }

        public void bind(Offer offer) {
            switch (offer.getType()) {
                case DEPOSIT:
                    layout.setBackgroundResource(R.drawable.case_img);
                    break;
                case CREDIT:
                    layout.setBackgroundResource(R.drawable.tree);
                    break;
                case CAR:
                    layout.setBackgroundResource(R.drawable.car);
                    break;
                case INVESTMENTS:
                    layout.setBackgroundResource(R.drawable.invest);
                    break;
                case MORTGAGE:
                    layout.setBackgroundResource(R.drawable.mort);
                    break;
                case INSURANCE:
                    layout.setBackgroundResource(R.drawable.insur);
                    break;
                default:
                    layout.setBackgroundResource(R.drawable.man);
                    break;
            }
            categoryInfo.setText(offer.getText());
        }

        void setOnClickListener(View.OnClickListener aListener) {
            itemView.setOnClickListener(aListener);
        }
    }
}