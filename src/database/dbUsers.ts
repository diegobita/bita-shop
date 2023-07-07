import bcrypt from 'bcryptjs';
import { User } from "@/models";
import { db } from ".";

export const checkUserEmailPassword = async (email: string, password: string) => {
    await db.connect();
    const user = await User.findOne({email});
    await db.disconnect();

    if(!user){
        return null;
    }
    if(!bcrypt.compareSync(password, user.password!)){
        return null;
    }

    const {role, name, _id} = user;

    return {
        id: _id,
        email: email.toLocaleLowerCase(),
        role,
        name,
    }
}

export const oAuthToDbUser = async (oAuthEmail: string, oAuthName: string) => {
    await db.connect();
    const user = await User.findOne({email: oAuthEmail});
    
    if(user){
        console.info("El usuario oauth existe")
        await db.disconnect();
        const {role, name, email, _id} = user;
        return {
            _id,
            email,
            role,
            name,
        }
    }
    console.info("No existe usuario oauth, se crea uno")
    const newUser = new User({
        email: oAuthEmail,
        name: oAuthName,
        password: '@',
        role: 'client'
    })
    await newUser.save();
    await db.disconnect();

    const {role, name, email, _id} = newUser;
    return {
        _id,
        email,
        role,
        name,
    }
}