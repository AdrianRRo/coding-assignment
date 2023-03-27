import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { produce } from 'immer';

export const fetchMovies = createAsyncThunk('fetch-movies', async ({ apiUrl, query, page }) => {
    // TODO refactor
    const response = await fetch(`${apiUrl}${query ? `&query=${query}` : ''}${page ? `&page=${page}` : ''}`)
    return response.json()
})

const moviesSlice = createSlice({
    name: 'movies',
    initialState: { 
        movies: [],
        fetchStatus: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            state.movies = produce(state.movies, draftState => {
                if (!action.payload?.page || action.payload?.page === 1) {
                  draftState = action.payload;
                } else {
                  draftState.results.push(...action.payload.results);
                  draftState.page = action.payload.page;
                  draftState.total_pages = action.payload.total_pages;
                  draftState.total_results = action.payload.total_results;
                }
                return draftState;
              });
              state.fetchStatus = 'success';            state.fetchStatus = 'success'
        }).addCase(fetchMovies.pending, (state) => {
            state.fetchStatus = 'loading'
        }).addCase(fetchMovies.rejected, (state) => {
            state.fetchStatus = 'error'
        })
    }
})

export default moviesSlice
