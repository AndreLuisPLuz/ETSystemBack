enum RequirementTypes {
    OWN_USER = "ownUser",
    STUDENT = "student",
    INSTRUCTOR = "instructor",
    ADMIN = "admin",
    MASTER = "master",
    IS_BOSCH = "isBosch",
    ADMIN_AND_BOSCH = "adminAndBosch",
    ADMIN_NOT_BOSCH = "adminNotBosch",
    INSTRUCTOR_AND_BOSCH = "instructorAndBosch",
    INSTRUCTOR_NOT_BOSCH = "instructorNotBosch"
}

interface IReqRequirements {
    [property: string]: boolean;
}

export {
    RequirementTypes,
    IReqRequirements
};