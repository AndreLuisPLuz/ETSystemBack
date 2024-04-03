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

import {
    createDisciplineCategoryController,
    listDisciplineCategoriesController,
    updateDisciplineCategoryController,
    softDeleteDisciplineCategoryController
} from "./disciplineCategory.controller";

import {
    listDisciplinesController,
    createDisciplineController,
    updateDisciplineController,
    softDeleteDisciplineController
} from "./discipline.controller";

import {
    createAppliedDisciplineController,
    listAppliedDisciplinesController,
    updateAppliedDisciplineController,
    softDeleteAppliedDisciplineController
} from "./appliedDiscipline.controller";

import { createCompetenceGroupController } from "./competenceGroup.controller";

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

    createDisciplineCategoryController,
    listDisciplineCategoriesController,
    updateDisciplineCategoryController,
    softDeleteDisciplineCategoryController,

    listDisciplinesController,
    createDisciplineController,
    updateDisciplineController,
    softDeleteDisciplineController,

    createAppliedDisciplineController,
    listAppliedDisciplinesController,
    updateAppliedDisciplineController,
    softDeleteAppliedDisciplineController,

    createCompetenceGroupController
}