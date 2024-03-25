import { IsDefined, IsNotEmpty, IsString, Length, ValidateIf } from "class-validator"

export class CreateCharacteristicsDto {
    @IsDefined()
    @IsString()
    @IsNotEmpty({
        message: "Назва характеристики обов'язкова"
    })
    @Length(3, 20, {
        message: 'Назва характеристики повинна бути довша ніж $constraint1 та коротша ніж $constraint2'
    })
    name: string

    @IsDefined()
    @IsString()
    @IsNotEmpty({
        message: "Значення характеристики обов'язкова"
    })
    @Length(1, 20, {
        message: 'Значення характеристики повинна бути довша ніж $constraint1 та коротша ніж $constraint2'
    })
    value: string

    @IsDefined()
    @IsString()
    @Length(1, 5, {
        message: 'Одиниця виміру характеристики повинна бути довша ніж $constraint1 та коротша ніж $constraint2'
    })
    @ValidateIf(o => !!o.unit)
    unit: string
}