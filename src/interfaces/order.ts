import { IUser } from ".";

export interface IOrder {
    _id?: string;
    user?: IUser;
    orderItem: IOrderItems[];
    shippingAddress: ShippingAddress;
    billingAddress: BillingAddress;
    paymentResult?: string;
    numberOfItems: number;
    subtotal: number;
    tax: number;
    total: number;
    isPaid: boolean;
    paidAt?: string;
}

export interface IOrderItems {
    _id: string;
    title: string;
    size: string;
    quantity: number;
    slug: string;
    image: string;
    price: number;
}

export interface ShippingAddress {
    firstName: string;
    lastName: string;
    email:string;
    address: string;
    address2?: string;
    zip: string;
    departament: string;
    city: string,
    country: string;
    phone: string;
}
export interface BillingAddress {
    firstName: string;
    lastName: string;
    email:string;
    address: string;
    address2?: string;
    zip: string;
    departament: string;
    city: string,
    country: string;
    phone: string;
}