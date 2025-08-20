import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import artworkService from "./artworkService";

const initialState = {
  artwork: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getArtwork = createAsyncThunk(
  "artwork/get",
  async (type, thunkAPI) => {
    try {
      return await artworkService.getArtwork(type);
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const uploadArtwork = createAsyncThunk(
  "artwork/uploadArtwork",
  async (artworkData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await artworkService.uploadArtwork(artworkData, token);
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const saveArtworkOrder = createAsyncThunk(
  "artwork/saveOrder",
  async (orderData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      console.log(token);
      const response = artworkService.saveArtworkOrder(orderData, token);
      console.log("Thunk response:", response);
      return response;
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const artworkSlice = createSlice({
  name: "artwork",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadArtwork.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadArtwork.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.artwork.push(action.payload);
      })
      .addCase(uploadArtwork.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getArtwork.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getArtwork.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.artwork = action.payload;
      })
      .addCase(getArtwork.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(saveArtworkOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(saveArtworkOrder.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(saveArtworkOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = artworkSlice.actions;
export default artworkSlice.reducer;
