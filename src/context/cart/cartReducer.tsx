import {ICartProduct, IShippingAddress} from "@/interfaces";
import { CartState } from ".";

interface IOrderSumary {
    numberOfItems: number;
    subtotal: number;
    tax: number;
    total: number;
}


type CartActionType = 
|{type: 'LoadCart_from_Cookies_Or_Storage', payload: ICartProduct[]}
|{type: 'Update_products_in_cart', payload: ICartProduct[]}
|{type: 'Change_quantity_product_in_cart', payload: ICartProduct}
|{type: 'Remove_product_cart', payload: ICartProduct}
|{type: 'Update_order_summary', payload: IOrderSumary}
|{type: 'Load_Address_shipping_from_cookies', payload: IShippingAddress;}
|{type: 'Update_Address_shipping', payload: IShippingAddress}

export const cartReducer = (state: CartState, action: CartActionType): CartState => {

    switch(action.type){
        case 'LoadCart_from_Cookies_Or_Storage':
            return {
                ...state,
                isLoaded: true,
                cart: [...action.payload]
                
            }
        case 'Update_products_in_cart':
            return {
                ...state,
                cart: [...action.payload],
            }
        case 'Change_quantity_product_in_cart':
            return {
                ...state,
                cart: state.cart.map(prod =>{
                        if(prod._id !== action.payload._id) return prod;
                        if(prod.size !== action.payload.size) return prod;
        
                        return action.payload;
                    })
            }
        case 'Remove_product_cart':
            return {
                ...state,
                cart: state.cart.filter(prod =>{
                        return !(prod._id === action.payload._id && prod.size === action.payload.size) 
                    })
            }
        case 'Update_order_summary':
            return {
                ...state,
                ...action.payload
            }
        case 'Load_Address_shipping_from_cookies':
        case 'Update_Address_shipping' :
            return {
                ...state,
                shippingAddress: action.payload,
            }
        default:
            return state;
    }

}