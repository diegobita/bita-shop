import { db } from '@/database';
import { IProduct } from '@/interfaces';
import { Product } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next'
import {isValidObjectId} from "mongoose";



type Data = 
| {message: string;}
| IProduct[]
| IProduct


export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch(req.method){
        case 'POST': await createProduct(req, res);
        case 'GET':
            return await getProducts(req, res);
        case 'PUT':
            return await updateProduct(req, res);
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
const updateProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const {_id = '', images = []} = req.body as IProduct;
    if (!isValidObjectId(_id)) {
        return res.status(400).json({message: "El id del producto no es válido"});
    }
    if (images.length < 2) {
        return res.status(400).json({message: "Es necesario al menos dos imágenes"});
    }

    try {
        await db.connect();
        const product = await Product.findById(_id)
        if (!product) {
            await db.disconnect();
            return res.status(400).json({message: "No existe producto"});
        }

        await product.updateOne(req.body);
        await db.disconnect();
        return res.status(200).json(product);
    } catch (error) {
        console.log(error)
        await db.disconnect();
        return res.status(400).json({message: "Error interno"});
    }
}
const createProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) =>{

    const { images = []} = req.body as IProduct;

    if(images.length < 2){
        return res.status(400).json({message: "Es necesario al menos dos imágenes"});
    }

    try{
        await db.connect();

        const productDB = await Product.findOne({slug: req.body.slug})

        if(productDB){
            await db.disconnect();
            return res.status(400).json({message: "El slug ya existe"});
        }
        const product = new Product(req.body);

        await product.save();
        await db.disconnect();
        return res.status(200).json(product);
    }catch(error){
        console.log(error)
        await db.disconnect();
        return res.status(400).json({message: "Error interno"});
    }
}
