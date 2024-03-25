import { Transform } from "class-transformer";
import { IsNumber } from "class-validator";

export class DeleteBrandDto {
    @IsNumber()
    @Transform(({ value }) => +value)
    id: number
}