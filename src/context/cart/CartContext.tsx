import { IBillingAddress, ICartProduct, IShippingAddress } from '@/interfaces';
import { createContext } from 'react';


interface ContextProps {
     isLoaded: boolean;
     cart: ICartProduct[];
     numberOfItems: number;
     subtotal: number;
     tax: number;
     total: number;

     shippingAddress?: IShippingAddress;
     billingAddress?: IBillingAddress;

     //Methods
     addProductToCart: (product: ICartProduct) => void,
     changeQuantityProductInCart: (product: ICartProduct) => void,
     removeProductCart: (product: ICartProduct) => void,
     updateAddress: (address: IShippingAddress) => void,
     createOrder: () => Promise<void>;
}

export const CartContext = createContext({} as ContextProps);