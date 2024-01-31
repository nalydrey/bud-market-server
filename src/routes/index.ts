import { Application } from "express"
import productRouter from "./products/product.route.js"
import groupRoute from "./products/group.route.js"
import characteristicsRoute from "./products/characteristics.route.js"
import { brandRouter } from "./brands/brand.route.js"


export class Routes {
   private baseURL = '/'
   constructor(private app: Application, apiName: string = 'api'){
    this.baseURL = this.baseURL + apiName 
   }

   init(){
    console.log(this.baseURL);
    
    this.app.use(`${this.baseURL}/products`, productRouter)
    this.app.use(`${this.baseURL}/brands`, brandRouter)
    this.app.use(`${this.baseURL}/group`, groupRoute)
    this.app.use(`${this.baseURL}/characteristics`, characteristicsRoute)
   }
}
