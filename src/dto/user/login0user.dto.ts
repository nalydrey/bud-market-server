import { IsDefined, IsEmail, IsString, Length } from "class-validator"

export class LoginDto {
    @IsString()
    @IsDefined()
    @IsEmail({}, {message: "email повинен відповідати формату name@.sercice.com"})
    email: string

    @IsString()
    @IsDefined()
    @Length(5, 12, {message: "Пароль повиннен бути не коротше ніж $constraint1 та не довше ніж $constraint2 символів"})
    password: string
}