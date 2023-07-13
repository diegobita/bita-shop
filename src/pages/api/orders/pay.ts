import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { IPaypal } from '../../../interfaces';
import {Order} from "@/models";
import { db } from '../../../database';

type Data = 
| {message: string;}


export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    console.log("coso")
    switch(req.method){
        case 'POST':
            return await payOrder(req, res);
        default:
            return res.status(400).json({
                message: 'Bad request'
            })
        }
        
}

const getPaypalBearerToken = async (): Promise<string|null> => {
    const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
    const PAYPAL_SECRET = process.env.PAYPAL_SECRET

    try {
        const base64Token = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`, 'utf-8').toString('base64');
        const body = new URLSearchParams('grant_type=client_credentials');
        const headers ={
            headers: {
                'Authorization': `Basic ${base64Token}`,
                'Content-Type' : "application/x-www-form.urlencoded",
            }
        }
        const { data } = await axios.post(process.env.PAYPAL_OAUTH_URL || '', body, headers);

        return data.access_token;
        
    } catch (error) {
        console.log("ERROR")
        if(axios.isAxiosError(error)){
            console.log(error.response?.data);
        }
        else{
            console.log(error)
        }
        return null;
    }

}

const payOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    //TODO: agregar validacion de session e id de mongo
    //TODO: se podria agregar enviar un mail con la confirmación
    const { transactionId = '', orderId = '' } = req.body;

    const paypalBearerToken = await getPaypalBearerToken();

    if(!paypalBearerToken){
        return res.status(400).json({message: "Token no generado"})
    }
    const headers ={
        headers: {
            'Authorization': `Bearer ${paypalBearerToken}`,
        }
    }


    const { data } = await axios.get<IPaypal.PaypalOrderStatusResponse>(`${process.env.PAYPAL_ORDERS_URL}/${transactionId}`, headers)

    if(data.status !== 'COMPLETED'){
        return res.status(400).json({message: "Orden no reconocida"})
    }
    await db.connect();
    const dbOrder = await Order.findById(orderId);


    if(!dbOrder){
        await db.disconnect();
        return res.status(400).json({message: "Orden no existente"})
    }

    if(dbOrder.total !== Number(data.purchase_units[0].amount.value)){
        await db.disconnect();
        return res.status(400).json({message: "Los montos de PayPal y la orden no coinciden"})
    }
    dbOrder.transactionId = transactionId;
    dbOrder.isPaid = true;
    await dbOrder.save();
    await db.disconnect();

    return res.status(200).json({message: paypalBearerToken})
}

