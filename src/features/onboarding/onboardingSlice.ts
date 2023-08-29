import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

// Define a type for the slice state
interface onboardingState {
  value: boolean
}

// Define the initial state using that type
const initialState: onboardingState = {
  value: false,
}


export const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    onboardingIn: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = true
    },
    onboardingOut: state => {
      state.value = false
    },
  
  }
})

// Action creators are generated for each case reducer function
export const { onboardingIn, onboardingOut } = onboardingSlice.actions
// Other code such as selectors can use the imported `RootState` type
export const selectOnboarding = (state: RootState) => state.onboarding.value
export default onboardingSlice.reducer