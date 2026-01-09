import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  plan: 'free', // 'free', 'pro', 'enterprise'
  analysesRemaining: 10,
  maxAnalysesPerMonth: 10,
  features: {
    free: {
      maxAnalyses: 10,
      features: ['Basic facial analysis', 'Standard recommendations'],
    },
    pro: {
      maxAnalyses: 100,
      features: ['Basic facial analysis', 'Standard recommendations', 'Advanced insights', 'Priority support'],
    },
    enterprise: {
      maxAnalyses: 'Unlimited',
      features: ['All Pro features', 'Custom API', 'Dedicated support', 'Team collaboration'],
    },
  },
};

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    upgradePlan: (state, action) => {
      const newPlan = action.payload;
      state.plan = newPlan;
      const maxAnalyses = state.features[newPlan].maxAnalyses;
      state.maxAnalysesPerMonth = maxAnalyses === 'Unlimited' ? 999999 : maxAnalyses;
      state.analysesRemaining = state.maxAnalysesPerMonth;
    },
    downgradeToFree: (state) => {
      state.plan = 'free';
      state.maxAnalysesPerMonth = 10;
      state.analysesRemaining = 10;
    },
    decrementAnalyses: (state) => {
      if (state.analysesRemaining > 0) {
        state.analysesRemaining--;
      }
    },
    resetMonthlyLimit: (state) => {
      state.analysesRemaining = state.maxAnalysesPerMonth;
    },
  },
});

export default subscriptionSlice.reducer;
export const { upgradePlan, downgradeToFree, decrementAnalyses, resetMonthlyLimit } = subscriptionSlice.actions;
