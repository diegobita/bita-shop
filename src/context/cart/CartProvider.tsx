import { PropsWithChildren, useReducer, useEffect, useState } from 'react';
import { CartContext, cartReducer } from './';
import {IBillingAddress, ICartProduct, IOrder, IShippingAddress} from '@/interfaces';
import Cookie from 'js-cookie';
import { shopApi } from '@/api';
import axios from 'axios';

export interface CartState {
    isLoaded: boolean;
    cart: ICartProduct[];
    numberOfItems: number;
    subtotal: number;
    tax: number;
    total: number;
    shippingAddress?: IShippingAddress,
    billingAddress?: IBillingAddress,
}

const CART_INITIAL_STATE: CartState = {
    isLoaded: false,
    cart: [],
    numberOfItems: 0,
    subtotal: 0,
    tax: 0,
    total: 0,
    shippingAddress: undefined,
    billingAddress: undefined,
}

export const CartProvider = (props: PropsWithChildren) => {

    const {children} = props;
    const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);
    const [isMounted, setIsMounted] = useState(false);


    useEffect(() => {
        if (!isMounted) {
            try{
                const cookieProducts = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : []
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
        if(Cookie.get('firstName')){
            const shippingAddress = {
                firstName: Cookie.get('firstName') || '',
                lastName: Cookie.get('lastName') || '',
                email: Cookie.get('email') || '',
                address: Cookie.get('address') || '',
                address2: Cookie.get('address2') || '',
                zip: Cookie.get('zip') || '',
                departament: Cookie.get('departament') || '',
                city: Cookie.get('city') || '',
                country: Cookie.get('country') || '',
                phone: Cookie.get('phone') || '', 
            }
            dispatch({type:'Load_Address_shipping_from_cookies', payload: shippingAddress});
        }
    }, [])

    useEffect(() => {
        const numberOfItems = state.cart.reduce((prev, currentProduct) => currentProduct.quantity + prev,0);
        const subtotal = state.cart.reduce((prev, currentProduct) => (currentProduct.quantity * currentProduct.price)+ prev,0);;
        const tax = subtotal * Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
        const total = subtotal + tax;

        const orderSumary = {
            numberOfItems,
            subtotal,
            tax,
            total,
        }
        dispatch({type:'Update_order_summary', payload: orderSumary})
    },[state.cart])
  
    const addProductToCart = (product: ICartProduct) =>{

        const existProductInCart = state.cart.some(prod => prod._id === product._id && product.size === prod.size);
        if(!existProductInCart){
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

    const updateAddress = (address: IShippingAddress) =>{
        Cookie.set('lastName', address.lastName);
        Cookie.set('firstName', address.firstName);
        Cookie.set('email', address.email);
        Cookie.set('address', address.address);
        Cookie.set('address2', address.address2 || '');
        Cookie.set('zip', address.zip);
        Cookie.set('departament', address.departament);
        Cookie.set('city', address.city);
        Cookie.set('country', address.country);
        Cookie.set('phone', address.phone);
        dispatch({type:'Update_Address_shipping', payload: address})
    }

    const createOrder = async (): Promise<{hasError: boolean; message: string;}> => {
        if(!state.shippingAddress){
            throw new Error('No hay dirección de entrega')
        }

        const body: IOrder = {
            orderItems: state.cart.map( p => ({
                ...p,
                size: p.size!
            })),
            shippingAddress: state.shippingAddress,
            billingAddress: state.shippingAddress,
            numberOfItems: state.numberOfItems,
            subtotal: state.subtotal,
            tax: state.tax,
            total: state.total,
            isPaid: false,
        }
        try{
            const {data} = await shopApi.post<IOrder>('/orders', body);
            console.log({data})
            dispatch({type: 'Cart_Order_Complete'});
            return {
                hasError: false,
                message: data._id!
            }
        }catch(error){
            console.log(error);
            if(axios.isAxiosError(error)){
                return {
                    hasError: true,
                    message: error.response?.data.message
                }
            }
            return {
                hasError: true,
                message: "Error interno en creación de la orden, hable con su administrador"
            }
            
        }
    }
    
    
    return(
        <CartContext.Provider value={{
            ...state,
            
            //Methods
            addProductToCart,
            changeQuantityProductInCart,
            removeProductCart,
            updateAddress,

            createOrder,
        }}>
            {children}
        </CartContext.Provider>
    )
};