import type { NextApiRequest, NextApiResponse } from 'next'
import { db, SHOP_CONSTANTS  } from '@/database';
import { Product } from '@/models';
import { IProduct } from '@/interfaces';


type Data = 
| {message: string;}
| IProduct


export default function handler (req: NextApiRequest, res: NextApiResponse<Data>){

      switch(req.method){
        case 'GET':
            return getProductBySlug(req, res);
        default:
            return res.status(400).json({message: 'Endpoint no existe'})
    }
}


const getProductBySlug = async (req: NextApiRequest, res: NextApiResponse<Data>) =>{
    const {slug} = req.query;
    
    try{
        await db.connect();
        const productBySlug = await Product.findOne({slug}).lean();
        await db.disconnect();
        if(!productBySlug)
            return res.status(400).json({message: "Producto no encontrado"})
            
        //TODO: sacar esta funcion cuando no tengamos imagenes en el file system

        productBySlug.images = productBySlug.images.map ( image => {
            return image.includes('http') ? image : `${process.env.HOST_NAME}/products/${image}`;
        })    
        
            return res.status(200).json(productBySlug)

    }catch(error: any){
        await db.disconnect();
        return res.status(400).json({message: error.errors.status.message});
    }  
}