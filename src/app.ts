import express from "express";

import "express-async-errors";
import "reflect-metadata";

import { handleError } from "./middlewares";
import { authenticateToken } from "./middlewares";
import { 
    loginRouter, 
    studentRouter,
    userRouter,
    studentGroupRouter,
    institutionRouter,
    administratorRouter
 } from "./routers";


const app = express();
app.use(express.json());
app.use("/institution", institutionRouter);
app.use("/user", userRouter);
app.use("/student", authenticateToken, studentRouter);
app.use("/login", loginRouter);
app.use("/studentGroup", authenticateToken, studentGroupRouter);
app.use("/admin", administratorRouter);

app.use(handleError);


export default app;