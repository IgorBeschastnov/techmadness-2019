package com.avaskov.kstovohackaton.presentation.presenters.base;

import com.avaskov.kstovohackaton.domain.executor.Executor;
import com.avaskov.kstovohackaton.domain.executor.MainThread;
import com.avaskov.kstovohackaton.domain.executor.impl.ThreadExecutor;
import com.avaskov.kstovohackaton.threading.MainThreadImpl;
import com.avaskov.kstovohackaton.ui.BaseView;

public abstract class AbstractPresenter<T extends BaseView> implements BasePresenter {

    private boolean mProgressbarEnabled = true;

    protected T mView;

    private Executor mExecutor;
    private MainThread mMainThread;

    public AbstractPresenter(T aView) {
        mExecutor = ThreadExecutor.getInstance();
        mMainThread = MainThreadImpl.getInstance();
        mView = aView;
    }

    @Override
    public void create() {

    }

    @Override
    public void start() {

    }

    @Override
    public void resume() {

    }

    @Override
    public void pause() {

    }

    @Override
    public void stop() {

    }

    @Override
    public void destroy() {

    }

    @Override
    public void setProgressBarEnabled(boolean aValue) {
        mProgressbarEnabled = aValue;
    }
}
