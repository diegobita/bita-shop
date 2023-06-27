import { PropsWithChildren, useReducer } from 'react';
import { UIContext, uiReducer } from './';

export interface UIState {
     sideMenuOpen: boolean;
}
const UI_INITIAL_STATE: UIState = {
    sideMenuOpen: false,

}

export const UIProvider = (props: PropsWithChildren) => {

    const {children} = props;
    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

    const toggleSideMenu = () =>{
        dispatch({type: 'UI_toggle_menu'})
    }

    return(
        <UIContext.Provider value={{
            ...state,
            
            //Methods
            toggleSideMenu,
            
        }}>
            {children}
        </UIContext.Provider>
    )
};