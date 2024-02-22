export class CategoryQueryDto {
    limit?: number
    page?: number
    filter?: {
        systemName: string
    }
}