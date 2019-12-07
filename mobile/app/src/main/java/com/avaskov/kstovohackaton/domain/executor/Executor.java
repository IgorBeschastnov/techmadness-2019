package com.avaskov.kstovohackaton.domain.executor;

import com.avaskov.kstovohackaton.domain.interactors.base.AbstractInteractor;

public interface Executor {

    void execute(final AbstractInteractor interactor);
}