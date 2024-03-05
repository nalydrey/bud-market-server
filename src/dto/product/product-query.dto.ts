import { QueryCharacteristicsDto } from "../characteristic/query-characteristics.dto.js"

export class ProductQueryDto {
    limit?: number
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