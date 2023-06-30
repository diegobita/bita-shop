import { PropsWithChildren, useReducer, useEffect, useState } from 'react';
import { AuthContext, authReducer } from './';
import { IUser } from '@/interfaces';
import { shopApi } from '@/api';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useRouter } from 'next/router';

export interface AuthState {
    isLoggedIn: boolean;
    user?: IUser;
}
const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined,
}

export const AuthProvider = (props: PropsWithChildren) => {

    const {children} = props;
    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
    const router = useRouter();

    useEffect(()=>{
        if(Cookies.get('token'))
            checkToken();
    }, [])

    const checkToken = async() => {
        try {
            const {data} = await shopApi.get("/user/validate-token");
            const {token, user} = data;
            Cookies.set('token', token);
            dispatch({type:'Login', payload: user});
        } catch (error) {
            Cookies.remove('token');
            dispatch({type:'Logout'});
        }
    }

       
    const loginUser = async (email: string, password: string):Promise<boolean> => {
        try {
            const {data} = await shopApi.post("/user/login", {email, password})
            const {token, user} = data;
            Cookies.set('token', token);
            dispatch({type:'Login', payload: user});
            return true;
        } catch (error) {
            return false;
        }
    }

    const registerUser = async (name: string, email: string, password: string): Promise<{hasError: boolean, message?: string}> => {
        try {
            const {data} = await shopApi.post("/user/register", {name, email, password})
            const {token, user} = data;
            Cookies.set('token', token);
            dispatch({type:'Login', payload: user});
            return {
                hasError: false,
            }
        } catch (error) {
            if(axios.isAxiosError(error)){
                return {
                    hasError: true,
                    message: error.response?.data.message,
                }
            }
            return {
                hasError: true,
                message: "No se pudo crear el usuario, intente nuevamente",
            }
        }
    }
    const logout = () =>{
        Cookies.remove('token');
        Cookies.remove('cart')
        Cookies.remove('lastName');
        Cookies.remove('firstName');
        Cookies.remove('email');
        Cookies.remove('address');
        Cookies.remove('address2' || '');
        Cookies.remove('zip');
        Cookies.remove('departament');
        Cookies.remove('city');
        Cookies.remove('country');
        Cookies.remove('phone');
        dispatch({type:'Logout'});
        router.reload();
    }
    
    return(
        <AuthContext.Provider value={{
            ...state,
            
            //Methods
            loginUser,
            registerUser,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    )
};