import { db } from '@/database';
import { IUser } from '@/interfaces';
import { Order, Product, User } from '@/models';
import { isValidObjectId } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'



type Data = 
| {message: string;}
| IUser[]
| IUser


export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch(req.method){
        case 'GET':
            return await getUsers(req, res);
        case 'PUT':
            return await updateUser(req, res);
        default:
            return res.status(400).json({
                message: 'Bad request'
            })
        }
        
}

const getUsers = async (req: NextApiRequest, res: NextApiResponse<Data>) =>{
    await db.connect();
    const users = await User.find().select('-password').lean();

    await db.disconnect();

    return res.status(200).json(users);
}

const updateUser = async (req: NextApiRequest, res: NextApiResponse<Data>) =>{

    const {userId = '', newRole = ''} = req.body;

    if(!isValidObjectId(userId)){
        return res.status(400).json({ message: 'No existe usuario' })
    }

    const validRoles = ['admin', 'client'];

    if( !validRoles.includes(newRole)){
        return res.status(400).json({ message: 'Rol no permitido' })
    }

    await db.connect();
    const user = await User.findById(userId);
    if(!user){
        await db.disconnect();
        return res.status(400).json({ message: 'No existe usuario' })
    }
    
    user.role = newRole;
    await user.save();
    await db.disconnect();

    return res.status(200).json({message: 'Usuario actualizado'});
}