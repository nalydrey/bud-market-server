import { Transform } from "class-transformer"
import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator"

export class CreateCategoryDto {
    
    @IsString()
    @Length(3, 20, {message({constraints}) {
        return `Назва категорії повинна бути більше ${constraints[0]} та менше ${constraints[1]}`
    },})
    @IsNotEmpty({
        message: "Категорія обов'язково повинна мати назву"
    })
    @Transform(({value}) => value.toLowerCase())
    name: string

    @IsNumber()
    @Transform(({value}) => value ? +value : null)
    parentId?: number | null
}