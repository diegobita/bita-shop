import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/database';
import {User} from "@/models";
import bcrypt from "bcryptjs";
import {jwt, validations} from "@/utils";

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
            return registerUser(req, res);
        default:
            res.status(400).json({message: 'Bad request'})
    }
}

const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const {email = '', password = '', name = ''} = req.body as {email: string, password: string, name: string};

    //if(validators.isValidPassword(password))
    if(password.length < 6){
        return res.status(400).json({message: 'La contraseña debe contener 6 caracteres o mas'})
    }
    if(name.length < 3){
        return res.status(400).json({message: 'El nombre debe contener 3 caracteres o mas'})
    }
    if(!validations.isValidEmail(email)){
        return res.status(400).json({message: 'El mail no tiene formato correspondiente'})
    }

    await db.connect();
    const user = await User.findOne({email});

    if(user){
        await db.disconnect();
        return res.status(400).json({message: 'Correo ya registrado'})
    }

    const newUser = new User({
        email: email.toLowerCase(),
        password: bcrypt.hashSync(password),
        name: name,
        role: 'client',
    })

    try{
        await newUser.save({validateBeforeSave: true})
        await db.disconnect();
    }catch(error){
        await db.disconnect();
        return res.status(500).json({message: 'revisar logs del servidor'})
    }
    const { _id, role} = newUser;

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
