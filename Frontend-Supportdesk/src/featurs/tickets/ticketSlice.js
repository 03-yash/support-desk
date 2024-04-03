import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ticketServie from "./ticketService";

const initialState = {
  tickets: [],
  ticket: {},
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
};

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    reset: (state) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.ticket = action.payload;
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAlltickets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAlltickets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tickets = action.payload;
      })
      .addCase(getAlltickets.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.ticket = action.payload;
      })
      .addCase(getTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(closeTicketFunc.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(closeTicketFunc.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.ticket = action.payload;
      })
      .addCase(closeTicketFunc.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default ticketSlice.reducer;

export const createTicket = createAsyncThunk(
  "Create/Ticket",
  async (formData, thunkApi) => {
    try {
      let token = thunkApi.getState().auth.user.token;
      return await ticketServie.addTicket(formData, token);
    } catch (error) {
      const message = error.message.data.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const getAlltickets = createAsyncThunk(
  "All/Tickets",
  async (_, thunkApi, token) => {
    try {
      let token = thunkApi.getState().auth.user.token;
      return await ticketServie.allTickets(token);
    } catch (error) {
      const message = error.message.data.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);
export const getTicket = createAsyncThunk("Fetch/Ticket", async (id, thunkApi) => {
  try {
    let token = thunkApi.getState().auth.user.token;
    return await ticketServie.singleTicket(id, token);
  } catch (error) {
    const message = error.message.data.message;
    return thunkApi.rejectWithValue(message);
  }
});

export const closeTicketFunc = createAsyncThunk("Close/Ticket", async(id, thunkApi)=>{
    try {
        let token = thunkApi.getState().auth.user.token;
        return await ticketServie.closeTicket(id, token);
      } catch (error) {
        const message = error.message.data.message;
        return thunkApi.rejectWithValue(message);
      }
})
