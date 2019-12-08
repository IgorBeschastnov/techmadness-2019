package com.avaskov.techmadness.domain.repository.interfaces;

import com.avaskov.techmadness.domain.models.Transaction;

public interface TransactionRepository {
    boolean sendTransaction(Transaction transaction);
}
