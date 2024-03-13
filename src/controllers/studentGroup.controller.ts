import { Request, Response } from "express";
import { 
    createStudentGroupService, 
    listStudentGroupsService, 
    retrieveStudentGroupService 
} from "../services";
import { StudentGroup } from "../entities";

const createStudentGroupController = async(req: Request, res: Response): Promise<Response> => {
    const studentGroup: StudentGroup = await createStudentGroupService(req.body);
    return res.status(201).json(studentGroup);
}

const listStudentGroupsController = async(req: Request, res: Response): Promise<Response> => {
    const studentGroups: StudentGroup[] = await listStudentGroupsService();
    return res.status(200).json(studentGroups);
}

const retrieveStudentGroupController = async(req: Request, res: Response): Promise<Response> => {
    const studentGroup: StudentGroup = await retrieveStudentGroupService(req.params.id);
    return res.status(200).json(studentGroup);
}

export {
    createStudentGroupController,
    listStudentGroupsController,
    retrieveStudentGroupController
}