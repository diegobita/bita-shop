import { createContext } from 'react';

export interface ContextProps {
     sideMenuOpen: boolean;

     //Methods
     toggleSideMenu: () => void;
}

export const UIContext = createContext({} as ContextProps);