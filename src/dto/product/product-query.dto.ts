import { IsNumber, Max, Min } from "class-validator"
import { QueryCharacteristicsDto } from "../characteristic/query-characteristics.dto.js"
import { Transform } from "class-transformer"

export class ProductQueryDto {
    @IsNumber()
    @Min(0)
    @Transform(({value}) => {if(typeof value === 'string') return +value})
    limit?: number
    @IsNumber()
    @Min(0)
    @Max(300)
    @Transform(({value}) => {if(typeof value === 'string') return +value})
    page?: number
    filter?: {
        like?: string 
        category?: {
            systemName?: string
            id?: number
        },
        brand?: {
            id?: number[]
        }
        compareForUsers?: {
            id: number
        } 
        price?: [number, number]
        characteristics?: QueryCharacteristicsDto[]
    }
}