import express from "express"

import "express-async-errors"
import "reflect-metadata"

import { handleError } from "./middlewares"


const app = express()
app.use(express.json())

app.use(handleError)


export default app