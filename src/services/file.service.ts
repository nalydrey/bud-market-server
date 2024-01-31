import path from 'path'
import fs from 'fs'

export class FileService {

    async delete (fileName: string) {
        const filePath = path.join(process.cwd(), 'uploads', fileName)
        console.log(filePath);
        const deletePromise = new Promise((res, rej) => {
            fs.unlink(filePath, (err) => {
            if (err) rej()
            res(true)
        })
        }) 
        return await deletePromise
    }
}

export const fileService = new FileService()