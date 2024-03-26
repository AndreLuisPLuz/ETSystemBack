import express from "express";

import "express-async-errors";
import "reflect-metadata";

import cors from 'cors'
import 'dotenv/config';

import { handleError } from "./middlewares";
import { 
    loginRouter, 
    userRouter,
    studentGroupRouter,
    institutionRouter
 } from "./routers";


const app = express();
app.use(express.json());

if(process.env.NODE_ENV === "dev") {
    app.use(cors())
    console.log("Using cors")
}

app.use("/institution", institutionRouter);
app.use("/user", userRouter);
app.use("/login", loginRouter);
app.use("/studentGroup", studentGroupRouter);

app.use(handleError);

export default app;