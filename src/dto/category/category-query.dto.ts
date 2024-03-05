export class CategoryQueryDto {
    limit?: number
    page?: number
    filter?: {
        productIds?: number[]
        systemName?: string
    }
}