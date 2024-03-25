import { IsHexColor, IsNotEmpty, IsString, Length } from "class-validator"

export class CreateLabelDto {
    @IsNotEmpty({
        message: "Назва лейби обов'язкове"
    })
    @IsString()
    @Length(3, 12, {message({constraints}) {
        return `Назва лейби повинна бути більше ${constraints[0]} та менше ${constraints[1]}`
    },})
    name: string

    @IsString()
    @IsNotEmpty({
        message: "Колір лейби обов'язковий"
    })
    @IsHexColor({
        message: 'Колір повинен мати шістнідцятирозрядний вигляд типу #F13421A'
    })
    color: string
}