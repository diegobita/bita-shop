import type { NextApiRequest, NextApiResponse } from 'next'
import { db, SHOP_CONSTANTS  } from '@/database';
import { Product } from '@/models';
import { IProduct } from '@/interfaces';


type Data = 
| {message: string;}
| IProduct[]


export default function handler (req: NextApiRequest, res: NextApiResponse<Data>){

      switch(req.method){
        case 'GET':
            return getProductsSearch(req, res);
        default:
            return res.status(400).json({message: 'Endpoint no existe'})
    }
}
const getProductsSearch = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    let {q = ''} = req.query;

    if(q.length === 0)
        return res.status(400).json({message: 'Debe especificar el filtro de busqueda'})
    
    q = q.toString().toLowerCase();
    await db.connect();
    const products = await Product.find({
        $text: {$search: q}
    }).select('title images inStock price slug -_id').lean();
    await db.disconnect();
    return res.status(200).json(products)
}

