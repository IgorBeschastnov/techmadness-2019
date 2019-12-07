package com.avaskov.techmadness.domain.models;

import java.util.Map;

public class Offer {
    private int id;
    private OfferType type;
    private String text;
    private Map<String, String> data;
    private int user_id;
    private String create_at;

    public Offer(int id, OfferType type, String text, Map<String, String> data, int user_id, String create_at) {
        this.id = id;
        this.type = type;
        this.text = text;
        this.data = data;
        this.user_id = user_id;
        this.create_at = create_at;
    }

    public int getId() {
        return id;
    }

    public OfferType getType() {
        return type;
    }

    public String getText() {
        return text;
    }

    public Map<String, String> getData() {
        return data;
    }

    public int getUser_id() {
        return user_id;
    }

    public String getCreate_at() {
        return create_at;
    }
}
