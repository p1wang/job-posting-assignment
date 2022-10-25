import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";

// actions
export const getPosting = createAsyncThunk(
  "postings/getPosting",
  async ({ id }) => {
    try {
      const { data } = await api.getPosting(id);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

// export const getPostings = createAsyncThunk(
//   "postings/getPostings",
//   async () => {
//     try {
//       const { data } = await api.getPostings();
//       return data;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

export const getPostings = createAsyncThunk(
  "postings/getPostings",
  async ({ searchQuery }) => {
    searchQuery = searchQuery.page
      ? searchQuery
      : { ...searchQuery, page: "1" };
    try {
      const { data } = await api.getPostings(searchQuery);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const createPosting = createAsyncThunk(
  "postings/createPosting",
  async ({ newPosting }) => {
    try {
      const { data } = await api.createPosting(newPosting);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deletePosting = createAsyncThunk(
  "postings/deletePosting",
  async ({ id }) => {
    try {
      const { data } = await api.deletePosting(id);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updatePosting = createAsyncThunk(
  "postings/updatePosting",
  async ({ id, updatedPosting }) => {
    console.log(updatedPosting);
    try {
      const { data } = await api.updatePosting(id, updatedPosting);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const postingsSlice = createSlice({
  name: "postings",
  initialState: {
    totalPages: "",
    postings: [],
    currentPosting: null,
    isLoading: false,
  },
  // reducers: {
  //   setCurrentPosting: (state, action) => {
  //     state.currentPosting = action.payload;
  //   },
  // },

  extraReducers: {
    // getPosting
    [getPosting.pending]: (state) => {
      state.isLoading = true;
    },
    [getPosting.rejected]: (state) => {
      state.isLoading = false;
    },
    [getPosting.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.currentPosting = action.payload.results;
    },
    // getPostings
    [getPostings.pending]: (state) => {
      state.isLoading = true;
    },
    [getPostings.rejected]: (state) => {
      state.isLoading = false;
    },
    [getPostings.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.totalPages = action.payload.totalPages;
      state.postings = action.payload.results;
    },
    // createPosting
    [createPosting.pending]: (state) => {
      state.isLoading = true;
    },
    [createPosting.rejected]: (state) => {
      state.isLoading = false;
    },
    [createPosting.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.postings = [...state.postings, action.payload.results[0]];
    },
    // updatePosting
    [updatePosting.pending]: (state) => {
      state.isLoading = true;
    },
    [updatePosting.rejected]: (state) => {
      state.isLoading = false;
    },
    [updatePosting.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.postings = state.postings.map((posting) =>
        posting.job_id === action.payload.results[0].job_id
          ? action.payload.results[0]
          : posting
      );
    },

    // deletePosting
    [deletePosting.pending]: (state) => {
      state.isLoading = true;
    },
    [deletePosting.rejected]: (state) => {
      state.isLoading = false;
    },
    [deletePosting.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.postings = state.postings.filter(
        (posting) => posting.job_id != action.payload.results
      );
    },
  },
});

export const { setCurrentPosting } = postingsSlice.actions;

export default postingsSlice.reducer;
