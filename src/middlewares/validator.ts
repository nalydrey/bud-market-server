import { NextFunction, Request, Response } from "express";
import { validateOrReject } from "class-validator";
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
      res.status(400).json(err);
    }
  };
}

validateAndTransform(CreateProductDto);
