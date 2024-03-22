import { loginController } from "./login.controller";

import { 
    createUserController,
    listUsersController,
    updateUserInformationController, 
    retrieveUserController,
    softDeleteUserController
} from "./user.controller";

import {
    listStudentGroupsController,
    createStudentGroupController,
    retrieveStudentGroupController,
    updateStudentGroupController,
    softDeleteStudentGroupController
} from "./studentGroup.controller";

import {
    createStudentController,
    listStudentsController,
    retrieveStudentController
} from "./student.controller";

import {
    createInstitutionController,
    listIntitutionsController,
    updateInstitutionController,
    softDeleteInstitutionController
} from "./institution.controller";

import { 
    createAdministratorController,
    retrieveAdministratorController
} from "./administrator.controller";

import { createInstructorController } from "./instructor.controller";

export {
    loginController,

    createUserController,
    listUsersController,
    updateUserInformationController,
    retrieveUserController,
    softDeleteUserController,

    listStudentGroupsController,
    createStudentGroupController,
    retrieveStudentGroupController,
    updateStudentGroupController,
    softDeleteStudentGroupController,

    createStudentController,
    listStudentsController,
    retrieveStudentController,

    createInstitutionController,
    listIntitutionsController,
    updateInstitutionController,
    softDeleteInstitutionController,

    createAdministratorController,
    retrieveAdministratorController,

    createInstructorController
}