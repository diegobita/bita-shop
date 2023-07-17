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

const saveFileFS = async(file: formidable.File[]) => {
    
    const data = fs.readFileSync(file[0].filepath);
    console.log(`./public/${file[0].originalFilename}`)
    fs.writeFileSync(`./public/${file[0].originalFilename}`, data);
    fs.unlinkSync(file[0].filepath);
    return;
}

const saveFile = async(file: formidable.File[]): Promise<string> => {
    const {filepath} = file[0];
    const data = await cloudinary.uploader.upload(filepath);
    return data.secure_url;
}

const parseFiles2 = async (req: NextApiRequest):Promise<string> => {
    return new Promise((resolve, reject) => {
        //const form = new formidable.IncomingForm();
        const form = formidable({});
        form.parse(req, async (err, fields, files) => {

            if (err){
                return reject(err)
            }
            try {
                const filePath = await saveFile(files.file as formidable.File[]);
                resolve(filePath);
            } catch (error) {
                reject(error);
            }
            
        })
    })
}
const parseFiles = async (req: NextApiRequest) => {
    
    const form = formidable({});
    const [fields, files] = await form.parse(req);

    console.log(files.file)
    const filePath = await saveFile(files.file as formidable.File[]);
    return filePath;
   
        
  
}

const uploadFile = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    try{
        const imageUrl = await parseFiles(req);
        return res.status(200).json({message: imageUrl as string})
    }catch(error){
        console.log(error);
        return res.status(400).json({message: "Error al subir la imagen"});
    }
    
}