import { loginController } from "./login.controller";
import { 
    createUserController, 
    updateUserInformationController, 
    retrieveUserController 
} from "./user.controller";
import {
    createStudentGroupController,
    listStudentGroupsController,
    retrieveStudentGroupController
} from "./studentGroup.controller";
import {
    createStudentController,
    listStudentsController,
    retrieveStudentController
} from "./student.controller";

export {
    loginController,

    createUserController,
    updateUserInformationController,
    retrieveUserController,

    createStudentGroupController,
    listStudentGroupsController,
    retrieveStudentGroupController,

    createStudentController,
    listStudentsController,
    retrieveStudentController
}