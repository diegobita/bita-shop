import { UIState } from ".";



type UIActionType = 
|{type: 'UI_toggle_menu'}

export const uiReducer = (state: UIState, action: UIActionType): UIState => {

    switch(action.type){
        case 'UI_toggle_menu':
            return {
                ...state,
                sideMenuOpen: !state.sideMenuOpen,
            }
        default:
            return state;
    }

}