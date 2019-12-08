package com.avaskov.techmadness.domain.models;

import java.util.Map;

public class Offer {

    private class OfferTemplate {
        String text;
        Map<String, String> data;
        OfferType type;
    }

    private int id;
    private int offer_template_id;
    private String text;
    private int user_id;
    private String create_at;
    private OfferTemplate offer_template;

    public Offer(int id, int offer_template_id, OfferType type, String text, int user_id, String create_at) {
        this.offer_template = new OfferTemplate();
        this.id = id;
        this.offer_template.type = type;
        this.offer_template.text = text;
        this.user_id = user_id;
        this.create_at = create_at;
        this.offer_template_id = offer_template_id;
    }

    public int getId() {
        return id;
    }

    public OfferType getType() {
        return offer_template.type;
    }

    public String getText() {
        return offer_template.text;
    }

    public int getOffer_template_id() {
        return offer_template_id;
    }

    public Map<String, String> getData() {
        return offer_template.data;
    }

    public String getDescription() {
        return offer_template.data.get("description");
    }

    public int getUser_id() {
        return user_id;
    }

    public String getCreate_at() {
        return create_at;
    }
}
