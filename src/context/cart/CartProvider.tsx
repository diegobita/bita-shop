import { PropsWithChildren, useReducer, useEffect, useState } from 'react';
import { CartContext, cartReducer } from './';
import { ICartProduct } from '@/interfaces';
import Cookie from 'js-cookie';

export interface CartState {
    cart: ICartProduct[];
    numberOfItmes: number;
    subtotal: number;
    tax: number;
    total: number;
}
const CART_INITIAL_STATE: CartState = {
   cart: [],
   numberOfItmes: 0,
    subtotal: 0,
    tax: 0,
    total: 0,
}

export const CartProvider = (props: PropsWithChildren) => {

    const {children} = props;
    const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);
    const [isMounted, setIsMounted] = useState(false);


    useEffect(() => {
        if (!isMounted) {
            try{
                const cookieProducts = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : []
                console.log({cookieProducts})
                dispatch({type: 'LoadCart_from_Cookies_Or_Storage', payload: cookieProducts});
                setIsMounted(true);
            }catch(error){
                console.log("ERROR EN COOKIEs")
                dispatch({type: 'LoadCart_from_Cookies_Or_Storage', payload:[]});
            }
        }
    },[isMounted])

    useEffect(() => {
        if(isMounted)
            Cookie.set('cart', JSON.stringify(state.cart))
    },[state.cart, isMounted])

    useEffect(() => {
        const numberOfItmes = state.cart.reduce((prev, currentProduct) => currentProduct.quantity + prev,0);
        const subtotal = state.cart.reduce((prev, currentProduct) => (currentProduct.quantity * currentProduct.price)+ prev,0);;
        const tax = subtotal * Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
        const total = subtotal + tax;

        const orderSumary = {
            numberOfItmes,
            subtotal,
            tax,
            total,
        }
        dispatch({type:'Update_order_summary', payload: orderSumary})
    },[state.cart])
  
    const addProductToCart = (product: ICartProduct) =>{

        const existProductInCart = state.cart.some(prod => prod._id === product._id && product.size === prod.size);
        if(!existProductInCart){
            console.log([...state.cart, product])
            return dispatch({type: 'Update_products_in_cart', payload: [...state.cart, product]})
        }
        else{
            const updateProducts = state.cart.map(prod =>{
                if(prod._id !== product._id) return prod;
                if(prod.size !== product.size) return prod;

                prod.quantity += product.quantity;
                return prod;
            })
            console.log({updateProducts})
            return dispatch({type: 'Update_products_in_cart', payload: updateProducts})
        }

    }
    const changeQuantityProductInCart = (product: ICartProduct) =>{
        dispatch({type: 'Change_quantity_product_in_cart', payload: product})
    }
        
    const removeProductCart = (product: ICartProduct) =>{
        dispatch({type: 'Remove_product_cart', payload: product})
    }
    
    
    return(
        <CartContext.Provider value={{
            ...state,
            
            //Methods
            addProductToCart,
            changeQuantityProductInCart,
            removeProductCart,
        }}>
            {children}
        </CartContext.Provider>
    )
};