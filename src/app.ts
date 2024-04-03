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
    institutionRouter,
    disciplineCategoryRouter,
    disciplineRouter,
    appliedDisciplineRouter,
    competenceGroupRouter
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
app.use("/disciplineCategory", disciplineCategoryRouter);
app.use("/discipline", disciplineRouter);
app.use("/appliedDiscipline", appliedDisciplineRouter);
app.use("/competenceGroup", competenceGroupRouter);

app.use(handleError);

export default app;