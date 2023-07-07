import type { NextApiRequest, NextApiResponse } from 'next'
import { db, SHOP_CONSTANTS  } from '@/database';


type Data = 
| {message: string;}


export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    
    switch(req.method){
        case 'POST':
            return createOrder(req, res);
        default:
            return res.status(400).json({
                message: 'Bad request'
            })
        }
        
}

const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) =>{
    return res.status(201).json({message: "Orden creada"});
}
