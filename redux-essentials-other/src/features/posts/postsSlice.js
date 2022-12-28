import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../../api/client'

const initialState = {
  posts: [],
  status: 'idle',
  error: null,
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts')
  return response.data
})

export const addPost = createAsyncThunk('posts/addPost', async (post) => {
  const response = await client.post('/fakeApi/posts', post)
  return response.data
})

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    editPost: {
      reducer(state, action) {
        const post = state.posts.find((p) => p.id === action.payload.id)
        if (post) {
          post.title = action.payload.title
          post.content = action.payload.content
        }
      },
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      const existingPost = state.posts.find((post) => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'

        const posts = action.payload.map((post) => {
            return {
                ...post,
                reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 }
            }
        });

        state.posts = state.posts.concat(posts)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addPost.fulfilled, (state, action) => {
        const post = {
          ...action.payload,
          reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
        }
        state.posts.push(post)
      })
  },
})

export const selectPosts = (state) => state.posts.posts
export const selectPost = (id) => (state) => {
  return state.posts.posts.find((post) => post.id === id)
}

export const selectPostsByUserId = (id) => (state) => {
  return state.posts.posts.filter((post) => post.user === id)
}

export const selectFetchPostsStatus = (state) => state.posts.status

export const selectFetchPostsError = (state) => state.posts.error
export const { editPost, reactionAdded } = postsSlice.actions

export default postsSlice.reducer
