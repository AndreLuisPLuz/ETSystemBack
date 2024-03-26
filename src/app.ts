import express from "express";

import "express-async-errors";
import "reflect-metadata";

import { handleError } from "./middlewares";
import { 
    loginRouter, 
    userRouter,
    studentGroupRouter,
    institutionRouter,
    disciplineCategoryRouter
 } from "./routers";


const app = express();
app.use(express.json());
app.use("/institution", institutionRouter);
app.use("/user", userRouter);
app.use("/login", loginRouter);
app.use("/studentGroup", studentGroupRouter);
app.use("/disciplineCategory", disciplineCategoryRouter);

app.use(handleError);

export default app;