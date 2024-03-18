import { loginController } from "./login.controller";

import { 
    createUserController,
    listUsersController,
    updateUserInformationController, 
    retrieveUserController,
    softDeleteUserController
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

import {
    createInstitutionController,
    listIntitutionsController,
    retrieveInstitutionController
} from "./institution.controller";

import { 
    createAdministratorController,
    retrieveAdministratorController
} from "./administrator.controller";

export {
    loginController,

    createUserController,
    listUsersController,
    updateUserInformationController,
    retrieveUserController,
    softDeleteUserController,

    createStudentGroupController,
    listStudentGroupsController,
    retrieveStudentGroupController,

    createStudentController,
    listStudentsController,
    retrieveStudentController,

    createInstitutionController,
    listIntitutionsController,
    retrieveInstitutionController,

    createAdministratorController,
    retrieveAdministratorController
}