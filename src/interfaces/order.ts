import {ISize, IUser} from ".";

export interface IOrder {
    _id?: string;
    user?: IUser;
    orderItems: IOrderItems[];
    shippingAddress: IShippingAddress;
    billingAddress: IBillingAddress;
    paymentResult?: string;
    numberOfItems: number;
    subtotal: number;
    tax: number;
    total: number;
    isPaid: boolean;
    paidAt?: string;
    transactionId?: string,
    createdAt?: string,
    updatedAt?: string,
}

export interface IOrderItems {
    _id: string;
    title: string;
    size: ISize;
    quantity: number;
    slug: string;
    image: string;
    price: number;
    gender: string;
}

export interface IShippingAddress {
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
export interface IBillingAddress {
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