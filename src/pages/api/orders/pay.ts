import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

type Data = 
| {message: string;}


export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

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
    
    const paypalBearerToken = await getPaypalBearerToken();

    if(!paypalBearerToken){
        return res.status(400).json({message: "Token no generado"})
    }

    return res.status(200).json({message: paypalBearerToken})
}

