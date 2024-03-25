import { NextFunction, Response } from "express";
import { ValidationError, validateOrReject } from "class-validator";
import { plainToClass } from "class-transformer";
import { ExtRequest } from "../models/ext-request.model.js";
import { fileService } from "../services/file.service.js";

const getFirstConstraints = (err: ValidationError): string[] => {
  const messageArray: string[] = []

  if(!err.constraints){
    err.children?.forEach(child => {
      messageArray.push(...getFirstConstraints(child))
    })
  }
  else{
    Object.values(err.constraints).forEach(message => messageArray.push(message)) 
  }
  return messageArray
}

export function validateAndTransform(
  ValidateClass: new () => object,
  from: "body" | "params" | "query" = "body"
) {
  return async (req: ExtRequest, res: Response, next: NextFunction) => {
    try {
  
      const instance = plainToClass(ValidateClass, req[from]);

      console.log(instance);
      await validateOrReject(instance, { whitelist: true, skipMissingProperties: true, validationError: {target: false, value: false,}});
      req.body = {...req.body, ...instance}
      next();
    } catch (err) {

      console.log(err);
      
      if(req.file){
        fileService.delete(req.file.filename)
      }
      if(req.files){
        if(Array.isArray(req.files)){
          req.files.forEach(file => fileService.delete(file.filename))
        }
      }


      if(Array.isArray(err)){
          const firstError = err[0]
          if(firstError instanceof ValidationError){
            const set = new Set(getFirstConstraints(firstError))
            res.status(406).json({
              message: Array.from(set).join(', ')
            })
          }
          return
      }

      res.status(500).json({
        message: 'Невідома помилка при валідації'
      })
      
    }
  };
}

