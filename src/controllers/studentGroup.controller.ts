import { Request, Response } from "express";
import { 
    createStudentGroupService,
    listStudentGroupsService,
    retrieveStudentGroupService,
    updateStudentGroupService,
    softDeleteStudentGroupService
} from "../services";
import {
    StudentGroupDTO,
    StudentGroupSingleDTO,
    Paginator
} from "../classes";

const listStudentGroupsController = async(req: Request, res: Response): Promise<Response> => {
    const studentGroups = await listStudentGroupsService(
        String(req.query.wperiod),
        Number(req.query.year)
    );
    const paginatedStudentGroups = new Paginator(
        studentGroups, 
        Number(req.query.page), 
        Number(req.query.limit)
    );
    return res.status(200).json(paginatedStudentGroups);
};

const createStudentGroupController = async(req: Request, res: Response): Promise<Response> => {
    const studentGroup = await createStudentGroupService(req.body);
    return res.status(201).json(studentGroup);
};

const retrieveStudentGroupController = async(req: Request, res: Response): Promise<Response> => {
    const studentGroup = await retrieveStudentGroupService(req.params.idStudentGroup);
    return res.status(200).json(studentGroup);
};

const updateStudentGroupController = async(req: Request, res: Response): Promise<Response> => {
    const studentGroup = await updateStudentGroupService(
        req.params.idStudentGroup,
        req.body
    );
    return res.status(200).json(studentGroup);
};

const softDeleteStudentGroupController = async(req: Request, res: Response): Promise<Response> => {
    await softDeleteStudentGroupService(req.params.idStudentGroup);
    return res.status(204).json();
};

export {
    listStudentGroupsController,
    createStudentGroupController,
    retrieveStudentGroupController,
    updateStudentGroupController,
    softDeleteStudentGroupController
};