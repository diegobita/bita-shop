import {NextApiRequest, NextApiResponse} from "next";
import formidable from 'formidable'
import fs from 'fs';
import {v2 as cloudinary} from 'cloudinary';

cloudinary.config(process.env.CLOUDINARY_URL || '');

type Data =
| {message: string;}

export const config = {
    api:{
        bodyParser: false,
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch(req.method){
        case 'POST':
            return await uploadFile(req, res);
        default:
            return res.status(400).json({
                message: 'Bad request'
            })
    }

}

const saveFileFS = async(file: formidable.File) => {
    console.log({file})
    console.log(file[0].filepath)
    console.log(file[0].originalFilename)
    const data = fs.readFileSync(file[0].filepath);
    console.log(`./public/${file[0].originalFilename}`)
    fs.writeFileSync(`./public/${file[0].originalFilename}`, data);
    fs.unlinkSync(file[0].filepath);
    return;
}

const saveFile = async(file: formidable.File): Promise<string> => {
    const data = await cloudinary.uploader.upload(file[0].filepath);
    return data.secure_url;
}

const parseFiles = async (req: NextApiRequest):Promise<string> => {
    return new Promise((resolve, reject) => {
        //const form = new formidable.IncomingForm();
        const form = formidable({});
        form.parse(req, async (err, fields, files) => {
            console.log({err, fields, files})

            if (err){
                return reject(err)
            }
            const filePath = await saveFile(files.file as formidable.File);
            resolve(filePath);
        })
    })
}

const uploadFile = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const imageUrl = await parseFiles(req);
    return res.status(200).json({message: imageUrl})
}