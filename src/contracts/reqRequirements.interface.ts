enum RequirementTypes {
    OWN_USER = "ownUser",
    INSTRUCTOR = "instructor",
    ADMIN = "admin",
    MASTER = "master",
    IS_BOSCH = "isBosch",
    ADMIN_AND_BOSCH = "adminAndBosch",
    ADMIN_NOT_BOSCH = "adminNotBosch",
}

interface IReqRequirements {
    [property: string]: boolean;
}

export {
    RequirementTypes,
    IReqRequirements
};