import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//create user
export const createUser = createAsyncThunk(
  "createUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://65438e2701b5e279de209187.mockapi.io/crud",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
//read users
export const showUser = createAsyncThunk(
  "showUser",
  async (args, { rejectWithValue }) => {
    const response = await fetch(
      "https://65438e2701b5e279de209187.mockapi.io/crud"
    );

    try {
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
//delete user
export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (id, { rejectWithValue }) => {
    const response = await fetch(
      `https://65438e2701b5e279de209187.mockapi.io/crud/${id}`,
      { method: "DELETE" }
    );

    try {
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
//update user
export const updatedUserData = createAsyncThunk(
  "updatedUserData",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://65438e2701b5e279de209187.mockapi.io/crud/${data.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const result = await response.json();
      console.log("updated data", result);
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const userDetail = createSlice({
  name: "details",
  initialState: {
    users: [],
    loading: false,
    error: null,
    searchData: "",
    radioValue: "All",
  },
  reducers: {
    searchTaskDetails: (state, action) => {
      state.searchData = action.payload;
    },
    searchRadioValue: (state, action) => {
      state.radioValue = action.payload.toString();
    },
  },
  extraReducers: {
    [createUser.pending]: (state) => {
      state.loading = true;
    },
    [createUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users.push(action.payload);
    },
    [createUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [showUser.pending]: (state) => {
      state.loading = true;
    },
    [showUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    [showUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [deleteUser.pending]: (state) => {
      state.loading = true;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.loading = false;
      const { id } = action.payload;
      if (id) {
        state.users = state.users.filter((ele) => ele.id !== id);
      }
    },
    [deleteUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [updatedUserData.pending]: (state) => {
      state.loading = true;
    },
    [updatedUserData.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = state.users.map((ele) =>
        ele.id === action.payload.id ? action.payload : ele
      );
    },
    [updatedUserData.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});
export default userDetail.reducer;
export const { searchTaskDetails, searchRadioValue } = userDetail.actions;
