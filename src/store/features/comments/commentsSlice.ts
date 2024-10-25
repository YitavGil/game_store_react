import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { CommentsState, Comment } from '../../../types/store.types';

const initialState: CommentsState = {
  byGameId: {},
  loading: false,
  error: null,
};

export const addComment = createAsyncThunk(
  'comments/addComment',
  async (comment: Omit<Comment, 'id' | 'createdAt'>) => {
    // Simulating API call
    return {
      ...comment,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
  }
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (
      state,
      action: PayloadAction<{ gameId: number; comments: Comment[] }>
    ) => {
      state.byGameId[action.payload.gameId] = action.payload.comments;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const comment = action.payload;
        if (!state.byGameId[comment.gameId]) {
          state.byGameId[comment.gameId] = [];
        }
        state.byGameId[comment.gameId].push(comment);
        state.loading = false;
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add comment';
      });
  },
});

export const { setComments } = commentsSlice.actions;
export default commentsSlice.reducer;