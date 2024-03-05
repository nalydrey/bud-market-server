import { EntityTarget, FindOptionsWhere, ObjectLiteral } from "typeorm";
import { myDataSource } from "../data-source/data-source.init.js";
import { NextFunction, Request, Response } from "express";

type SourceType = 'body' | 'query' | 'params'

interface AlreadyExistOptions {
    dir?: boolean
    from?: 'body' | 'query' | 'params'
    dtoField?: string
}

 export const alreadyExist = <T extends ObjectLiteral>(entity: EntityTarget<T>, field: keyof T, options?: AlreadyExistOptions) => {
    let direction = false
    let source: SourceType = 'body'
    let distField = field as string
    if(options){
        const { dir, from, dtoField } = options
        if(dir) direction = dir
        if(from) source = from
        if(dtoField) distField = dtoField
    }

    const repo = myDataSource.getRepository(entity)
    return async (req: Request, res: Response, next: NextFunction) => {
        try{
            const where = {[field]: req[source][distField]} as FindOptionsWhere<T>
            const instance = await repo.findOneBy(where)
            if(direction ? !instance : instance) throw new Error()
            next()
        }
        catch(err){
            res.status(409).json({
                message: direction ? 'Taкого екземпляра не існує' : 'Такий ексемпляр вже існує'
            })
        }
    }
}