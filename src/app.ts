import express from "express";

import "express-async-errors";
import "reflect-metadata";

import { handleError } from "./middlewares";
import userRouter from "./routers/user.routes";
import { loginRouter } from "./routers";


const app = express();
app.use(express.json());
app.use("/users", userRouter);
app.use("/login", loginRouter);

app.use(handleError);


export default app;