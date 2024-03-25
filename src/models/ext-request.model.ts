import { Request } from "express";
import { ObjectLiteral } from "typeorm";

export interface ExtRequest extends Request {
    entity?: ObjectLiteral
}