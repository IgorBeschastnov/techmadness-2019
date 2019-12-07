package com.avaskov.techmadness.ui.activities;

import android.app.Activity;
import android.os.Bundle;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.Nullable;

import com.avaskov.techmadness.R;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;

public class DialogActivity extends Activity {

    @BindView(R.id.message_text_et)
    EditText messageEditText;

    @BindView(R.id.send_iv)
    ImageView sendImageView;

    @BindView(R.id.dialog_detail_ll)
    LinearLayout linearLayout;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.fragment_dialog_detail);
        ButterKnife.bind(this);
    }

    @OnClick(R.id.send_iv)
    public void sendPressed() {
        if (messageEditText.getText().toString().isEmpty()) {
            return;
        }

        TextView newMessage = new TextView(this);
        LinearLayout.LayoutParams layoutParams = new LinearLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);

        layoutParams.topMargin = 16;
        layoutParams.gravity = Gravity.END;
        layoutParams.leftMargin = 16;
        layoutParams.rightMargin = 100;

        newMessage.setGravity(View.TEXT_ALIGNMENT_VIEW_END);
        newMessage.setText(String.format("  %s  ", messageEditText.getText().toString()));
        newMessage.setBackgroundResource(R.drawable.main_item_offer_shape);
        newMessage.setLayoutParams(layoutParams);

        linearLayout.addView(newMessage);
        messageEditText.setText("");
    }
}
