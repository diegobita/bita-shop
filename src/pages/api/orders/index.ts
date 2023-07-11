import type { NextApiRequest, NextApiResponse } from 'next'
import { db} from '@/database';
import {IOrder} from "@/interfaces";
import {getSession} from "next-auth/react";
import { getServerSession } from "next-auth/next"
import {Order, Product} from "@/models";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {getToken, JWT} from "next-auth/jwt";


type Data = 
| {message: string;}
| IOrder;


export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch(req.method){
        case 'POST':
            return await createOrder(req, res);
        default:
            return res.status(400).json({
                message: 'Bad request'
            })
        }
        
}

const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) =>{
    const { orderItems, total } = req.body as IOrder;
    const session = await getSession({req});
    const token = await getToken({req}) as any;

    console.log({session})
    console.log({token})

    if(!token){
        return res.status(401).json({message: 'Usuario no autenticado'})
    }
    const productsIds = orderItems.map(p => {return p._id})
    await db.connect();
    const dbProducts = await Product.find({_id: {$in: productsIds}});

    try{
        const subtotal = orderItems.reduce((prev, current) => {
            const currentPrice = dbProducts.find(prod => prod.id === current._id)!.price;
            if(!currentPrice){
                throw new Error('Verifique el carrito de nuevo, producto no existe');
            }

            return (current.price * current.quantity) + prev;
        }, 0);
        const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE);
        const backendTotal = subtotal * (taxRate + 1);

        if(total !== backendTotal){
            throw new Error('El total de los productos no coincide');
        }

        const userId = token.user.id;
        const newOrder = new Order({...req.body, isPaid:false, user: userId})
        newOrder.total = Math.round(newOrder.total * 100) / 100;
        await newOrder.save({validateBeforeSave: true}) ;
        await db.disconnect();
        return res.status(201).json(newOrder);

    }catch(error : any){
        await db.disconnect();
        res.status(400).json({
            message: error.message || 'Revise logs del servidor'
        })
    }


}
