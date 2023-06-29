import { ICartProduct } from '@/interfaces';
import { createContext } from 'react';

interface ContextProps {
     cart: ICartProduct[];
     numberOfItmes: number;
     subtotal: number;
     tax: number;
     total: number;

     //Methods
     addProductToCart: (product: ICartProduct) => void,
     changeQuantityProductInCart: (product: ICartProduct) => void,
     removeProductCart: (product: ICartProduct) => void
}

export const CartContext = createContext({} as ContextProps);