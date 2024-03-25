import { IsIn, IsString } from "class-validator";

export class EditOrderDto {
    @IsString()
    @IsIn(['new', 'completed', 'inProgress', 'refused', 'waited'])
    status: string
}