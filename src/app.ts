import express from "express";

import "express-async-errors";
import "reflect-metadata";

import { handleError } from "./middlewares";
import { 
    loginRouter, 
    studentRouter,
    userRouter,
    studentGroupRouter
 } from "./routers";


const app = express();
app.use(express.json());
app.use("/user", userRouter);
app.use("/student", studentRouter);
app.use("/login", loginRouter);
app.use("/studentGroup", studentGroupRouter);

app.use(handleError);


export default app;