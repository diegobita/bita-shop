import { ICartProduct } from "@/interfaces";
import { CartState } from ".";



type CartActionType = 
|{type: 'LoadCart_from_Cookies_Or_Storage', payload: ICartProduct[]}
|{type: 'Add_product_to_cart', payload: ICartProduct}

export const cartReducer = (state: CartState, action: CartActionType): CartState => {

    switch(action.type){
        case 'LoadCart_from_Cookies_Or_Storage':
            return {
                ...state,
                
            }
        case 'Add_product_to_cart':
            return {
                ...state,
                
            }
        default:
            return state;
    }

}