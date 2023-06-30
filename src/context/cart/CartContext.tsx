import { ICartProduct } from '@/interfaces';
import { createContext } from 'react';
import { BillingAddress, ShippingAddress } from './';

interface ContextProps {
     isLoaded: boolean;
     cart: ICartProduct[];
     numberOfItmes: number;
     subtotal: number;
     tax: number;
     total: number;

     shippingAddress?: ShippingAddress;
     billingAddress?: BillingAddress;

     //Methods
     addProductToCart: (product: ICartProduct) => void,
     changeQuantityProductInCart: (product: ICartProduct) => void,
     removeProductCart: (product: ICartProduct) => void,
     updateAddress: (address: ShippingAddress) => void
}

export const CartContext = createContext({} as ContextProps);