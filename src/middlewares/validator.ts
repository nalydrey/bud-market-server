import { NextFunction, Request, Response } from "express";
import { ValidationError, validateOrReject } from "class-validator";
import { plainToClass } from "class-transformer";
import { CreateProductDto } from "../dto/product/create-product.dto.js";

export function validateAndTransform(
  ValidateClass: new () => object,
  from: "body" | "params" | "query" = "body"
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    
    try {
      const instance = plainToClass(ValidateClass, req[from]);
      await validateOrReject(instance, { whitelist: true });
      req[from] = {...instance}
      next();
    } catch (err) {

      if(Array.isArray(err)){
          const errorMessageArr: string[] = []
          const firstError = err[0]
          if(firstError instanceof ValidationError){
            firstError.constraints && Object.values(firstError.constraints).forEach(message => errorMessageArr.push(message))
            res.status(406).json({
              message: errorMessageArr.join(', ')
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

// validateAndTransform(CreateProductDto);
