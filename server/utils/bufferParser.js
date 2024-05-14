import DataUriParser from 'datauri/parser.js'
import path from 'path';
 

export const getURI=(file)=>{
    const parser = new DataUriParser();
    return parser.format(path.extname(file.originalname).toString(),file.buffer);
}