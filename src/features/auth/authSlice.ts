import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

// Define a type for the slice state
interface signedInState {
  value: boolean
}

// Define the initial state using that type
const initialState: signedInState = {
  value: false,
}


export const authSlice = createSlice({
  name: 'signedIn',
  initialState,
  reducers: {
    signIn: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = true
    },
    signOut: state => {
      state.value = false
    },
  
  }
})

// Action creators are generated for each case reducer function
export const { signIn, signOut } = authSlice.actions
// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.auth.value
export default authSlice.reducer