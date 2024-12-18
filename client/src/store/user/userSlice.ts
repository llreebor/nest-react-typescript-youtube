import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { IUser } from '../../types/types'

// Define a type for the slice state
interface IUserState {
	user: IUser | null
	isAuth: boolean
}

// Define the initial state using that type
const initialState: IUserState = {
	user: null,
	isAuth: false,
}

export const userSlice = createSlice({
	name: 'user',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		// Use the PayloadAction type to declare the contents of `action.payload`
		login: (state, action: PayloadAction<IUser>) => {
			state.user = action.payload
			state.isAuth = true
		},
		logout: (state) => {
			state.user = null
			state.isAuth = false
		},
	},
})

export const { login, logout } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user

export default userSlice.reducer
