
import { IUser } from "@/interfaces";
import { AuthState } from ".";


type AuthActionType = 
|{type: 'Login', payload: IUser}
|{type: 'Logout'}


export const authReducer = (state: AuthState, action: AuthActionType): AuthState => {

    switch(action.type){
        case 'Login':
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload,
                
            }
        case 'Logout':
            return {
                ...state,
                isLoggedIn: false,
                user: undefined,
                
            }
        default:
            return state;
    }

}