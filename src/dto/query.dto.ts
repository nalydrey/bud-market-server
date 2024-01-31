export class QueryDto {
    category?: string
    type?: string 
    filter?: IFilter[]
}

export interface IFilter {
    name: string,
    value: string,
    unit: string
}