import { IsDefined, IsEmail, IsPhoneNumber, IsString, Length } from "class-validator"

export class RegisterUserDto {
    @IsString()
    @IsDefined()
    @Length(3, 12, {message: "Ім'я повинно бути не коротше ніж $constraint1 та не довше ніж $constraint2 символів"})
    firstName: string

    @IsString()
    @IsDefined()
    @Length(3, 12, {message: "Прізвище повинно бути не коротше ніж $constraint1 та не довше ніж $constraint2 символів"})
    lastName: string

    @IsString()
    @IsDefined()
    @IsEmail({}, {message: "email повинен відповідати формату name@.sercice.com"})
    email: string

    @IsString()
    @IsDefined()
    @IsPhoneNumber('UA', {message: "телефон повинен відповідати формату +38-098-000-00-00"})
    phone: string

    @IsString()
    @IsDefined()
    @Length(5, 12, {message: "Пароль повиннен бути не коротше ніж $constraint1 та не довше ніж $constraint2 символів"})
    password: string
}