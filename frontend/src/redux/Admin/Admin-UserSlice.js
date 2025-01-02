import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  users: [],
  loading: false,
  error: null,
};

// Async Thunks
export const fetchUsers = createAsyncThunk(
  "admin/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/admin/users");
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch users."
      );
    }
  }
);

export const editUser = createAsyncThunk(
  "admin/editUser",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/admin/users/${id}`, updates);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to edit user."
      );
    }
  }
);

export const toggleBlockUser = createAsyncThunk(
  "admin/toggleBlockUser",
  async ({ id, isBlocked }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(`/api/admin/users/${id}/block`, {
        isBlocked,
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update block status."
      );
    }
  }
);

export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/admin/users/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete user."
      );
    }
  }
);

// Slice
const adminUsersSlice = createSlice({
  name: "adminUsers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (user) => user._id === action.payload._id
        );
        if (index !== -1) state.users[index] = action.payload;
      })
      .addCase(toggleBlockUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (user) => user._id === action.payload._id
        );
        if (index !== -1) state.users[index] = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
      });
  },
});

export default adminUsersSlice.reducer;
