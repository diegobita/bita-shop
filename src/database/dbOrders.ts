import { isValidObjectId } from 'mongoose';
import {db} from '.';
import { IOrder } from '@/interfaces';
import { Order } from '@/models';

export const getOrderById = async(id: string): Promise<IOrder | null> => {

    if(!isValidObjectId(id)){
        return null;
    }

    await db.connect();
    const order = await Order.findById({id}).lean();
    await db.disconnect();

    if(!order)
        return null;

    return JSON.parse(JSON.stringify(order));
}
export const getOrderByIdAndUser = async(id: string, userId: string): Promise<IOrder | null> => {

    if(!isValidObjectId(id)){
        return null;
    }
    console.log({id})
    console.log({userId})
    await db.connect();
    const order = await Order.findById(id).lean();
    await db.disconnect();
    console.log({order})
    if(!order)
        return null;
    if((order.user?._id)?.toString() !== userId)
        return null;

    return JSON.parse(JSON.stringify(order));
}


export const getOrdersByUser = async(userId: string): Promise<IOrder[]> => {

    if(!isValidObjectId(userId)){
        return [];
    }
    await db.connect();
    const orders = await Order.find({user: userId}).lean();
    await db.disconnect();
    return JSON.parse(JSON.stringify(orders));
}

export const getAllOrders = async(): Promise<IOrder[]> => {

    await db.connect();
    const orders = await Order.find().lean();
    await db.disconnect();
    return JSON.parse(JSON.stringify(orders));
}