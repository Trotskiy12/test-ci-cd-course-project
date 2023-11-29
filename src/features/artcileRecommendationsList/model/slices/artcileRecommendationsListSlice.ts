import { createSlice } from '@reduxjs/toolkit';

import { ArtcileRecommendationsListSchema } from '../types/artcileRecommendationsListSchema';

const initialState: ArtcileRecommendationsListSchema = {

};

export const artcileRecommendationsListSlice = createSlice({
    name: 'artcileRecommendationsList',
    initialState,
    reducers: {
        // template: (state, action: PayloadAction<string>) => {

        // },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(, (state) => {
    //             state.error = undefined;
    //             state.isLoading = true;
    //         })
    //         .addCase(, (state) => {
    //             state.isLoading = false;
    //         })
    //         .addCase(, (state, action) => {
    //             state.isLoading = false;
    //             state.error = action.payload;
    //         });
    // },
});

export const { actions: artcileRecommendationsListActions } = artcileRecommendationsListSlice;
export const { reducer: artcileRecommendationsListReducer } = artcileRecommendationsListSlice;
