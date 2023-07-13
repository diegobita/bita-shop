import { db } from '@/database';
import { Order, Product, User } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next'



type Data = 
| {message: string;}
| {
    numberOfOrders: number;
    paidOrders: number;
    notPaidOrders: number;
    numberOfClients: number;
    numberOfProducts: number;
    productsWithNoInventory: number;
    lowInventory: number;

}


export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch(req.method){
        case 'GET':
            return await informationDashboard(req, res);
        default:
            return res.status(400).json({
                message: 'Bad request'
            })
        }
        
}

const informationDashboard = async (req: NextApiRequest, res: NextApiResponse<Data>) =>{
    

    await db.connect();
    const [
        numberOfOrders,
        paidOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoInventory,
        lowInventory,
    ] = await Promise.all([
        Order.count(),
        Order.find({isPaid: true}).count(),
        User.find({role: 'client'}).count(),
        Product.count(),
        Product.find({inStock: 0}).count(),
        Product.find({inStock: {$lte: 10}}).count(),
    ])

    await db.disconnect();
    return res.status(400).json({
        numberOfOrders,
        paidOrders,
        notPaidOrders: numberOfOrders - paidOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoInventory,
        lowInventory,
    })
}