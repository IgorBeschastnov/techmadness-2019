package com.avaskov.techmadness.ui.adapters;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
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

    @Override
    public BookmarkViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.main_offer_item, parent, false);
        return new BookmarkViewHolder(view);
    }

    @Override
    public void onBindViewHolder(BookmarkViewHolder holder, int position) {
        holder.bind(offerList.get(position));
    }

    @Override
    public int getItemCount() {
        return offerList.size();
    }

    public void setItems(Collection<Offer> tweets) {
        offerList.addAll(tweets);
        notifyDataSetChanged();
    }

    public void clearItems() {
        offerList.clear();
        notifyDataSetChanged();
    }

    class BookmarkViewHolder extends RecyclerView.ViewHolder {

        @BindView(R.id.offer_title_tv)
        TextView categoryInfo;

        public BookmarkViewHolder(View itemView) {
            super(itemView);

            ButterKnife.bind(this, itemView);
        }

        public void bind(Offer offer) {
            categoryInfo.setText(offer.getText());
        }
    }
}