import { Application } from "express"
import {productRouter} from "./product.route.js"
import { brandRouter } from "./brand.route.js"
import { labelRouter } from "./label.route.js"
import { categoryRouter } from "./category.route.js"
import { photoRouter } from "./photo.route.js"
import { characteristicRouter } from "./characteristic.route.js"
import { orderRouter } from "./order.route.js"
import { userRouter } from "./user.route.js"
import { reviewRouter } from "./review.route.js"
import { basketRouter } from "./basket.route.js"


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
      this.app.use(`${this.baseURL}/characteristics`, characteristicRouter)
      this.app.use(`${this.baseURL}/order`, orderRouter)
      this.app.use(`${this.baseURL}/users`, userRouter)
      this.app.use(`${this.baseURL}/reviews`, reviewRouter)
      this.app.use(`${this.baseURL}/basket`, basketRouter)
   }
}
