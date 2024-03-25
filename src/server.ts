import express from "express"
import cors from 'cors'
import {config} from 'dotenv'
import { Routes } from "./routes/index.js"
import { myDataSource } from "./data-source/data-source.init.js"
import { passportService } from "./middlewares/passport.js"

config()
const PORT = process.env.APP_PORT || 5000

// create and setup express app
const app = express()
const router = new Routes(app)
app.use(express.static('uploads'))


app.use(express.json())
app.use(cors())
router.init()
passportService.init()


myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

    
app.listen(PORT, () => {
    console.log(`Server is working on port ${PORT}`);
})