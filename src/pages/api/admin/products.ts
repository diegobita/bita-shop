import { db } from '@/database';
import { IProduct } from '@/interfaces';
import { Product } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next'



type Data = 
| {message: string;}
| IProduct[]
| IProduct


export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch(req.method){
        case 'POST':
            return res.status(400).json({
                message: 'Bad request'
            });
        case 'GET':
            return await getProducts(req, res);
        case 'PUT':
            return res.status(400).json({
                message: 'Bad request'
            });
        default:
            return res.status(400).json({
                message: 'Bad request'
            })
        }
        
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) =>{

    await db.connect();
    const products = await Product.find()
        .sort({title: 'asc'})
        .lean();

    await db.disconnect();

    return res.status(200).json(products);
}
