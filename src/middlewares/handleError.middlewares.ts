import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { ZodError } from "zod";
import "express-async-errors"

export const handleError = (err:Error, req:Request, res:Response, next:NextFunction) => {

    if(err instanceof AppError) {
        res.status(err.statusCode).json({ message: err.message })
    }

    if(err instanceof ZodError) {
        const errors = err.flatten().fieldErrors
        const resMessage = Object.keys(errors).length > 0 ? errors : { message: "Invalid request" }
        res.status(400).json(resMessage)
    }

    console.log(err)
    return res.status(500).json({ message: "Internal Server Error" })
}