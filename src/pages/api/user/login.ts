import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/database';
import {User} from "@/models";
import bcrypt from "bcryptjs";
import {jwt} from "@/utils";

type Data =
    |{ message: string; }
    |{ token: string,
        user:{
                email:string,
                role: string,
                name: string,
            }}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch(req.method){
        case 'POST':
            return loginUser(req, res);
        default:
            res.status(400).json({message: 'Bad request'})
    }
    res.status(200).json({ message: 'Proceso ejecutado correctamente'})
}

const loginUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const {email = '', password = ''} = req.body as {email: string, password: string};

    await db.connect();
    const user = await User.findOne({email});
    await db.disconnect();

    if(!user){
        return res.status(400).json({message: 'Correo o contraseña incorrecto - EMAIL'})
    }
    const {role, name, _id} = user;
    if(!bcrypt.compareSync(password, user.password!)){
        return res.status(400).json({message: 'Correo o contraseña incorrecto - PASSWORD'})
    }
    const token = jwt.signToken(_id, email)
    return res.status(200).json({
        token: token,
        user: {
            email: email,
            role: role,
            name: name,
        }
    })
}
