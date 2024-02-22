export class ProductQueryDto {
    limit?: number
    page?: number
    filter?: {
        category?: {
            systemName?: string
            id?: number
        },
        brand?: {
            id?: number[]
        }
        price?: [number, number]
    }
}