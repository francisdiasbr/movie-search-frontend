import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import BaseService from '../../api/service';
import { MovieDetailsState, MovieDetailsItem } from './types';

const initialState: MovieDetailsState = {
	data: null,
	error: null,
	status: 'idle',
};

export const fetchDetails = createAsyncThunk(
	'movies/details',
	async (tconst: string) => {
		try {
			const response = await BaseService.get(`listed-movies/details?tconst=${tconst}`);
			if (response && response.data) {
				return response.data;
			} else {
				throw new Error('Invalid response format');
			}
		} catch (error) {
			console.error('Error fetching details:', error);
			throw error;
		}
	}
);

const movieDetailsSlice = createSlice({
	name: 'moviesDetails',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchDetails.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchDetails.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.data = action.payload as MovieDetailsItem;
			})
			.addCase(fetchDetails.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message || 'Failed to fetch details';
			});
	},
});

export default movieDetailsSlice.reducer;
