import { createSlice } from '@reduxjs/toolkit'

const username = JSON.parse(localStorage.getItem("username"))

const initialState = {
  isLoggedIn: false,
  username: username?username:"",
  user: {
    username: "",
    email:"",
    bio: "",
    phone: "",
    imageUrl:""
  },
  userId:""
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_LOGIN(state, action) { 
      state.isLoggedIn = action.payload
    },
    SET_USERNAME(state, action) { 
      localStorage.setItem("username",JSON.stringify(action.payload))
      state.username = action.payload
    },
    SET_USER(state, action) { 
      const { name,bio,imageUrl,emailAddress,phone} = action.payload
      state.user.username = name
      state.user.bio = bio
      state.user.imageUrl = imageUrl
      state.user.email = emailAddress
      state.user.phone = phone
    },

  }
});

export const { SET_LOGIN, SET_USER, SET_USERNAME } = authSlice.actions

//useSelector handler
export const selectIsLoggedIn = (state)=>state.auth.isLoggedIn
export const selectUsername = (state)=>state.auth.username
export const selectUser = (state) => state.auth.user

export default authSlice.reducer