import {IsNumber, IsString, Length} from 'class-validator'

export class CreateBrandDto {

    @IsString({
        message: "Назва бренду повинна бути строкою"
    })
    @Length(2, 20, {message({constraints}) {
        return `Назва бренду повинна бути більше ${constraints[0]} та менше ${constraints[1]}`
    },})
    name: string
}