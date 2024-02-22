import { Application } from "express"
import {productRouter} from "./product.route.js"
import { brandRouter } from "./brand.route.js"
import { labelRouter } from "./label.route.js"
import { categoryRouter } from "./category.route.js"
import { photoRouter } from "./photo.route.js"


export class Routes {
   private baseURL = '/'
   constructor(private app: Application, apiName: string = 'api'){
    this.baseURL = this.baseURL + apiName 
   }

   init(){
      this.app.use(`${this.baseURL}/products`, productRouter)
      this.app.use(`${this.baseURL}/brands`, brandRouter)
      this.app.use(`${this.baseURL}/labels`, labelRouter)
      this.app.use(`${this.baseURL}/categories`, categoryRouter)
      this.app.use(`${this.baseURL}/photos`, photoRouter)
   }
}
