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

import { createStudentController } from "./student.controller";

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

import { createDisciplineCategoryController } from "./disciplineCategory.controller";

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

    createInstitutionController,
    listIntitutionsController,
    updateInstitutionController,
    softDeleteInstitutionController,

    createAdministratorController,
    retrieveAdministratorController,

    createInstructorController,

    createDisciplineCategoryController
}